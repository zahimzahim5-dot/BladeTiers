// A full-screen background picture with a dark layer on top.
// The picture file lives in public/images.

// ---- Settings you can tune ----
const IMAGE = "/images/background.webp"; // change the name if your file is different
const DARKNESS = 0.3; // 0 = no dark layer, 1 = fully black. Try 0.2 to 0.6
// --------------------------------

export default function BackgroundImage() {
  return (
    <>
      {/* The picture (the very back layer) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-30 bg-[#04050c] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${IMAGE})` }}
      />

      {/* Dark layer so text stays readable. Darker in the middle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(115% 95% at 50% 46%, rgba(4,5,12,${Math.min(
            1,
            DARKNESS + 0.15
          )}) 0%, rgba(4,5,12,${DARKNESS}) 55%, rgba(4,5,12,${Math.max(
            0,
            DARKNESS - 0.2
          )}) 100%)`,
        }}
      />
    </>
  );
}