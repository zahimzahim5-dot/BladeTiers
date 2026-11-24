// Draws each player's 3D bust ONE AT A TIME with a single hidden viewer,
// then returns it as a normal picture. Results are remembered (cached).

const SIZE = 256; // picture size in pixels

// ---- Settings you can tune (same meaning as in PlayerBody3D) ----
const HEAD_PITCH = -0.1; // negative = looks up
const HEAD_YAW = -0.15; // head turn
const BODY_TURN = 0.55; // body turn
const ZOOM = 1.7; // bigger = closer
const MOVE_DOWN = 9; // bigger = head appears higher
// -----------------------------------------------------------------

const cache = new Map();
let viewerPromise = null;
let queue = Promise.resolve();

function getViewer() {
  if (!viewerPromise) {
    viewerPromise = (async () => {
      const { SkinViewer } = await import("skinview3d");
      const canvas = document.createElement("canvas");
      const viewer = new SkinViewer({
        canvas,
        width: SIZE,
        height: SIZE,
        preserveDrawingBuffer: true,
      });

      viewer.controls.enableRotate = false;
      viewer.controls.enableZoom = false;
      viewer.controls.enablePan = false;
      viewer.autoRotate = false;
      viewer.animation = null;
      viewer.zoom = ZOOM;

      viewer.playerObject.rotation.y = BODY_TURN;
      viewer.playerObject.position.y = -MOVE_DOWN;
      viewer.playerObject.skin.head.rotation.x = HEAD_PITCH;
      viewer.playerObject.skin.head.rotation.y = HEAD_YAW;

      return viewer;
    })();
  }
  return viewerPromise;
}

// Returns a promise with the picture (a data URL) for one username.
export function getBust(username) {
  if (cache.has(username)) return cache.get(username);

  const job = queue.then(async () => {
    const viewer = await getViewer();
    await viewer.loadSkin(
      `https://mc-heads.net/skin/${encodeURIComponent(username)}`
    );
    viewer.render();
    return viewer.canvas.toDataURL("image/png");
  });

  // Keep the queue moving even if one player fails
  queue = job.catch(() => {});
  // Forget failures so a later visit can try again
  job.catch(() => cache.delete(username));

  cache.set(username, job);
  return job;
}