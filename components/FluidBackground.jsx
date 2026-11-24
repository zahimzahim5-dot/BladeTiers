"use client";

import { useEffect, useRef } from "react";
import fluidSimulation from "@/lib/fluidSimulation";

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroy;
    try {
      destroy = fluidSimulation(canvas);
    } catch (error) {
      // If this browser/GPU can't run WebGL, the picture stays on its own.
      console.warn("Fluid background could not start:", error);
    }

    return () => {
      if (destroy) destroy();
    };
  }, []);

  // "mix-blend-screen" makes the dark parts of the canvas see-through,
  // so only the bright ink shows on top of the picture.
  // Change opacity-80 to make the ink stronger or weaker (opacity-50 ... opacity-100).
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full opacity-80 mix-blend-screen"
    />
  );
}