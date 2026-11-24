"use client";

import { useState } from "react";

export default function PlayerAvatar({
  username,
  size = 48,
  rounded = "rounded-xl",
}) {
  // "failed" remembers whether the image could not be loaded
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center bg-white/10 text-lg font-bold text-white/70 ${rounded}`}
      >
        {[...username][0]}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://mc-heads.net/avatar/${encodeURIComponent(username)}/${size * 2}`}
      alt={`${username} Minecraft avatar`}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={rounded}
    />
  );
}