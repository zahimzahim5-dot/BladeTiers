"use client";

import { useState } from "react";

// How much of the body to show from the top (0.6 = top 60%)
const VISIBLE = 0.6;

// How far to move the head up (0.08 = 8% of the image height)
const LIFT = 0.08;

export default function PlayerBody({ username, height = 140 }) {
  // "failed" remembers whether the image could not be loaded
  const [failed, setFailed] = useState(false);

  // The box is shorter than the full image, so the legs are cut off
  const boxHeight = Math.round(height * VISIBLE);

  if (failed) {
    return (
      <div
        style={{ width: height * 0.5, height: boxHeight }}
        className="flex items-center justify-center rounded-xl bg-white/10 text-3xl font-bold text-white/70"
      >
        {[...username][0]}
      </div>
    );
  }

  // The mask fades the bottom of the box from solid to see-through
  const fade = "linear-gradient(to bottom, black 55%, transparent 100%)";

  return (
    <div
      style={{
        height: boxHeight,
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
      className="overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://mc-heads.net/body/${encodeURIComponent(username)}/300`}
        alt={`${username} Minecraft skin`}
        style={{
            height,
            width: "auto",
            marginTop: -Math.round(height * LIFT),
        }}
        onError={() => setFailed(true)}
        className="object-contain"
      />
    </div>
  );
}