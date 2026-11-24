"use client";

import { useEffect, useRef, useState } from "react";
import PlayerBody from "@/components/PlayerBody";

// ---- Settings you can tune ----
const HEAD_PITCH = -0.1; // head tilt. Negative = looks up, positive = looks down
const HEAD_YAW = -0.15; // head turn left/right (radians)
const BODY_TURN = 0.55; // how much the body turns (3/4 view)
const ZOOM = 1.7; // bigger = closer to the player
const MOVE_DOWN = 9; // bigger = the head appears higher in the picture
// --------------------------------

export default function PlayerBody3D({
  username,
  height = 160,
  fadeBottom = true,
}) {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  const size = Math.round(height * 0.95); // the canvas is a square

  useEffect(() => {
    let viewer;
    let cancelled = false;

    async function start() {
      try {
        // Loaded only in the browser, because it needs WebGL
        const { SkinViewer } = await import("skinview3d");
        if (cancelled || !canvasRef.current) return;

        viewer = new SkinViewer({
          canvas: canvasRef.current,
          width: size,
          height: size,
        });

        // No mouse control, no spinning, no walking animation
        viewer.controls.enableRotate = false;
        viewer.controls.enableZoom = false;
        viewer.controls.enablePan = false;
        viewer.autoRotate = false;
        viewer.animation = null;
        viewer.zoom = ZOOM;

        // Pose: turn the body, then tilt and turn the head
        viewer.playerObject.rotation.y = BODY_TURN;
        viewer.playerObject.position.y = -MOVE_DOWN;
        viewer.playerObject.skin.head.rotation.x = HEAD_PITCH;
        viewer.playerObject.skin.head.rotation.y = HEAD_YAW;

        await viewer.loadSkin(
          `https://mc-heads.net/skin/${encodeURIComponent(username)}`
        );
      } catch (error) {
        // If anything fails, we show the flat picture instead
        if (!cancelled) setFailed(true);
      }
    }

    start();

    return () => {
      cancelled = true;
      if (viewer) viewer.dispose();
    };
  }, [username, size]);

  if (failed) {
    return <PlayerBody username={username} height={height} />;
  }

    // The mask fades the bottom of the picture away (can be turned off)
  const fade = fadeBottom
    ? "linear-gradient(to bottom, black 55%, transparent 100%)"
    : undefined;

  return (
    <canvas
      ref={canvasRef}
      aria-label={`${username} Minecraft skin`}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
      className="pointer-events-none"
    />
  );
}