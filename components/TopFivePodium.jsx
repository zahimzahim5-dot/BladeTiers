"use client";

import { motion } from "motion/react";
import { Crown } from "lucide-react";
import { getRankedPlayers } from "@/data/players";
import PlayerBody3D from "@/components/PlayerBody3D";

// Look of each rank. "order" controls the position on desktop:
// 4, 2, 1, 3, 5 from left to right, so rank 1 sits in the centre.
// On mobile they simply stack in rank order 1 to 5.
// "size" is the height of the 3D body in pixels.
const rankStyles = {
  1: {
    order: "order-1 md:order-3",
    ring: "border-amber-300/40 shadow-[0_0_50px_rgba(251,191,36,0.18)]",
    badge: "bg-amber-300 text-black",
    size: 190,
    pad: "py-8 md:py-10",
  },
  2: {
    order: "order-2 md:order-2",
    ring: "border-slate-300/30 shadow-[0_0_35px_rgba(203,213,225,0.10)]",
    badge: "bg-slate-300 text-black",
    size: 155,
    pad: "py-6 md:py-8",
  },
  3: {
    order: "order-3 md:order-4",
    ring: "border-orange-400/30 shadow-[0_0_35px_rgba(251,146,60,0.10)]",
    badge: "bg-orange-400 text-black",
    size: 155,
    pad: "py-6 md:py-8",
  },
  4: {
    order: "order-4 md:order-1",
    ring: "border-indigo-300/20",
    badge: "bg-indigo-300/80 text-black",
    size: 130,
    pad: "py-5 md:py-6",
  },
  5: {
    order: "order-5 md:order-5",
    ring: "border-indigo-300/20",
    badge: "bg-indigo-300/80 text-black",
    size: 130,
    pad: "py-5 md:py-6",
  },
};

export default function TopFivePodium() {
  // Same data source as the leaderboard. We only take the first 5 players.
  const topFive = getRankedPlayers().slice(0, 5);

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        {topFive.map((player) => {
          const style = rankStyles[player.rank];

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: player.rank * 0.08 }}
              className={`glass flex flex-1 flex-col items-center rounded-2xl border px-4 text-center transition-transform duration-300 hover:-translate-y-1 ${style.order} ${style.ring} ${style.pad}`}
            >
              {player.rank === 1 && (
                <Crown className="mb-2 h-6 w-6 text-amber-300" />
              )}

                            <PlayerBody3D username={player.username} height={style.size} />

              <span
                className={`mt-3 rounded-full px-3 py-0.5 text-xs font-bold ${style.badge}`}
              >
                #{player.rank}
              </span>

              <p className="mt-2 max-w-full truncate font-semibold">
                {player.username}
              </p>
              <p className="text-sm text-white/60">{player.points} points</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}