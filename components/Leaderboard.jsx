"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { getRankedPlayers } from "@/data/players";
import { gameModes } from "@/data/gameModes";
import PlayerBust from "@/components/PlayerBust";

// Tier strength from strongest to weakest. Used to rank players inside a mode.
const TIER_ORDER = [
  "HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5",
];

// The blur/fade at the bottom of each player picture.
const BUST_FADE = "linear-gradient(to bottom, black 50%, transparent 100%)";

// Ribbon for ranks 4 and below: a plain dark one
const defaultStyle = {
  ribbon: "from-white/10 to-white/[0.03]",
  text: "text-white/50",
  shine: 0.12,
};

// Ribbon colours for the top 3 (they get a brighter shine)
const rankStyles = {
  1: { ribbon: "from-amber-300 to-amber-500", text: "text-black", shine: 0.7 },
  2: { ribbon: "from-slate-300 to-slate-400", text: "text-black", shine: 0.7 },
  3: { ribbon: "from-orange-400 to-orange-600", text: "text-black", shine: 0.6 },
};

// Colour of a tier label, based on its number (HT1, LT1 = 1, and so on).
function tierColors(tier) {
  switch (tier.slice(-1)) {
    case "1":
      return { text: "text-amber-300", bar: "bg-amber-300" };
    case "2":
      return { text: "text-slate-200", bar: "bg-slate-300" };
    case "3":
      return { text: "text-orange-400", bar: "bg-orange-400" };
    default:
      return { text: "text-white/60", bar: "bg-white/30" };
  }
}

// One small square for one game mode.
function ModeTile({ mode, tier }) {
  const [iconFailed, setIconFailed] = useState(false);
  const colors = tier ? tierColors(tier) : null;

  return (
    <div
      title={tier ? `${mode.name}: ${tier}` : `${mode.name}: no tier`}
      className={`flex h-14 w-11 shrink-0 flex-col items-center justify-between rounded-xl border border-white/10 bg-white/5 px-1 pb-1.5 pt-1.5 lg:w-12 ${
        tier ? "" : "opacity-50"
      }`}
    >
      {iconFailed ? (
        <span className="flex h-6 w-6 items-center justify-center text-base font-bold text-white/60">
          {mode.name[0]}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mode.icon}
          alt={mode.name}
          width={24}
          height={24}
          onError={() => setIconFailed(true)}
          className={`h-6 w-6 object-contain ${tier ? "" : "grayscale"}`}
          style={{ imageRendering: "pixelated" }}
        />
      )}

      <div className="flex w-full flex-col items-center gap-1">
        <span
          className={`text-[11px] font-bold leading-none ${
            tier ? colors.text : "text-white/40"
          }`}
        >
          {tier || "—"}
        </span>
        <span
          className={`h-0.5 w-7 rounded-full ${
            tier ? colors.bar : "bg-white/10"
          }`}
        />
      </div>
    </div>
  );
}

// One button in the mode bar. "icon" is null for the Overall tab (trophy).
function ModeTab({ label, icon, active, onClick }) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-w-0 flex-col items-center justify-start gap-1.5 rounded-xl border px-1 py-3 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide transition-colors xl:text-[11px] ${
        active
          ? "border-white/30 bg-white/10 text-white"
          : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      {icon === null ? (
        <Trophy className="h-6 w-6" />
      ) : iconFailed ? (
        <span className="flex h-6 w-6 items-center justify-center text-base font-bold">
          {label[0]}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt=""
          width={24}
          height={24}
          onError={() => setIconFailed(true)}
          className="h-6 w-6 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      )}
      <span className="flex min-h-[2.4em] items-center">{label}</span>
      <span
        className={`h-0.5 w-8 rounded-full ${
          active ? "bg-white/60" : "bg-transparent"
        }`}
      />
    </button>
  );
}

export default function Leaderboard() {
  // "Overall" or the name of one game mode, for example "Sword"
  const [selected, setSelected] = useState("Overall");

  // Same data source as the podium: all players, sorted, with overall ranks.
  const allPlayers = getRankedPlayers();

  let rows;
  if (selected === "Overall") {
    rows = allPlayers;
  } else {
    // Only players who have a tier in this mode, strongest tier first.
    // Ties: higher overall points first, then the original order.
    rows = allPlayers
      .filter((player) => player.tiers[selected])
      .sort(
        (a, b) =>
          TIER_ORDER.indexOf(a.tiers[selected]) -
            TIER_ORDER.indexOf(b.tiers[selected]) ||
          b.points - a.points ||
          a.id - b.id
      )
      .map((player, index) => ({ ...player, rank: index + 1 }));
  }

  const selectedMode = gameModes.find((mode) => mode.name === selected);

  return (
    <section className="mx-auto mt-4 max-w-5xl px-4">
      {/* Mode bar: a grid, so it never scrolls */}
      <div className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
        <ModeTab
          label="Overall"
          icon={null}
          active={selected === "Overall"}
          onClick={() => setSelected("Overall")}
        />
        {gameModes.map((mode) => (
          <ModeTab
            key={mode.name}
            label={mode.name}
            icon={mode.icon}
            active={selected === mode.name}
            onClick={() => setSelected(mode.name)}
          />
        ))}
      </div>

      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          {selected === "Overall" ? "Overall" : selected} Leaderboard
        </h2>
        <p className="text-sm text-white/50">
          {rows.length} {rows.length === 1 ? "player" : "players"}
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="glass rounded-2xl px-6 py-12 text-center text-white/50">
          No players have been tested in {selected} yet.
        </div>
      ) : (
        // "key" makes the list animate again every time you switch tabs
        <div key={selected} className="flex flex-col gap-3">
          {rows.map((player, index) => {
            const style = rankStyles[player.rank] || defaultStyle;

            return (
              // Phone: a card (header strip on top, tiles below).
              // Desktop (lg and up): one slim line, like before.
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + index * 0.04 }}
                className="glass relative overflow-hidden rounded-2xl transition-colors hover:bg-white/[0.07] lg:flex lg:items-center lg:gap-x-4 lg:py-3 lg:pl-44 lg:pr-4"
              >
                {/* Ribbon: a short strip on phones, full height on desktop */}
                <div
                  style={{ clipPath: "polygon(0 0, 100% 0, 86% 100%, 0 100%)" }}
                  className={`absolute left-0 top-0 h-20 w-36 overflow-hidden bg-gradient-to-br lg:bottom-0 lg:h-auto lg:w-40 ${style.ribbon}`}
                >
                  <span
                    className="ribbon-shine"
                    style={{
                      "--shine": style.shine,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />
                </div>

                {/* Rank number */}
                <span
                  className={`absolute left-3 top-10 -translate-y-1/2 text-2xl font-extrabold lg:top-1/2 ${style.text}`}
                >
                  {player.rank}
                </span>

                {/* 3D bust, fading out at the bottom */}
                <div
                  className="absolute left-8 top-0 lg:bottom-0 lg:left-10 lg:top-auto"
                  style={{
                    WebkitMaskImage: BUST_FADE,
                    maskImage: BUST_FADE,
                  }}
                >
                  <PlayerBust username={player.username} size={80} />
                </div>

                {/* Header: name and points (on desktop it dissolves into the row) */}
                <div className="flex h-20 items-center gap-3 pl-36 pr-4 lg:contents">
                  <div className="min-w-0 flex-1 lg:w-36 lg:flex-none">
                    <p className="truncate text-base font-bold lg:text-lg">
                      {player.username}
                    </p>
                    {selected === "Overall" && (
                      <p className="text-sm text-white/50">
                        {player.points} points
                      </p>
                    )}
                  </div>

                  {/* In a mode tab: only that mode's tile */}
                  {selected !== "Overall" && (
                    <div className="flex shrink-0 lg:ml-auto">
                      <ModeTile
                        mode={selectedMode}
                        tier={player.tiers[selected]}
                      />
                    </div>
                  )}
                </div>

                {/* Overall: all tiles. Below the header on phones, to the right on desktop. */}
                {selected === "Overall" && (
                  <div className="flex flex-wrap gap-1.5 px-4 pb-4 lg:ml-auto lg:flex-nowrap lg:gap-2 lg:p-0">
                    {gameModes.map((mode) => (
                      <ModeTile
                        key={mode.name}
                        mode={mode}
                        tier={player.tiers[mode.name]}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}