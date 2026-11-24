"use client";

import { useEffect, useState } from "react";
import PlayerBody from "@/components/PlayerBody";

export default function PlayerBust({ username, size = 88 }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("@/lib/bustRenderer")
      .then(({ getBust }) => getBust(username))
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  // If the 3D picture could not be made, show the flat picture instead
  if (failed) {
    return <PlayerBody username={username} height={Math.round(size * 1.6)} />;
  }

  // While it is being drawn, keep the space empty so nothing jumps
  if (!src) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${username} Minecraft skin`}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}