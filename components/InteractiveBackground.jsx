"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  // A ref gives us direct access to the <canvas> element below
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // If the visitor asked their computer for less motion, we draw a still grid
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SPACING = 32; // distance between dots (pixels)
    const RADIUS = 180; // how far the cursor effect reaches (pixels)

    let width = 0;
    let height = 0;
    let frameId = 0;
    let hasPointer = false; // becomes true after the first mouse/touch move

    const mouse = { x: -1000, y: -1000 }; // where the cursor really is
    const glow = { x: -1000, y: -1000 }; // the glow follows slowly (smooth)

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Soft glow that follows the cursor
      if (hasPointer) {
        const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, 320);
        g.addColorStop(0, "rgba(99, 102, 241, 0.18)");
        g.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      // The dot grid
      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const dx = x - glow.x;
          const dy = y - glow.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let px = x;
          let py = y;
          let alpha = 0.12;
          let size = 1;

          // Dots near the cursor glow brighter, grow, and get pushed away
          if (dist < RADIUS) {
            const power = 1 - dist / RADIUS; // 1 = at the cursor, 0 = far away
            px += (dx / (dist || 1)) * power * 12;
            py += (dy / (dist || 1)) * power * 12;
            alpha = 0.12 + power * 0.7;
            size = 1 + power * 1.6;
          }

          ctx.fillStyle = `rgba(165, 180, 252, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function loop() {
      // Move the glow 12% of the way to the cursor each frame (smooth follow)
      glow.x += (mouse.x - glow.x) * 0.12;
      glow.y += (mouse.y - glow.y) * 0.12;
      draw();
      frameId = requestAnimationFrame(loop);
    }

    function handleMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      if (!hasPointer) {
        // First move: jump the glow to the cursor so it doesn't fly in
        hasPointer = true;
        glow.x = mouse.x;
        glow.y = mouse.y;
      }
    }

    function handleLeave() {
      // Cursor left the window: send the effect far away
      mouse.x = -1000;
      mouse.y = -1000;
    }

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      window.addEventListener("pointermove", handleMove);
      document.documentElement.addEventListener("pointerleave", handleLeave);
      frameId = requestAnimationFrame(loop);
    }

    // Cleanup: runs if the component is removed
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}