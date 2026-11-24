"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { regions, serverGroups, serverNotice } from "@/data/servers";

// How many IPs a group has in total
function countIps(group) {
  return Object.values(group.servers).reduce((sum, list) => sum + list.length, 0);
}

export default function ServerList() {
  // Which tab is open: "premium" or "cracked"
  const [activeId, setActiveId] = useState(serverGroups[0].id);
  // The IP that was copied last (shows a tick for 2 seconds)
  const [copiedIp, setCopiedIp] = useState(null);

  const group = serverGroups.find((g) => g.id === activeId);

  async function copy(ip) {
    try {
      await navigator.clipboard.writeText(ip);
      setCopiedIp(ip);
      setTimeout(() => setCopiedIp((current) => (current === ip ? null : current)), 2000);
    } catch {
      // If the browser blocks copying, do nothing. The IP is still visible.
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-5xl px-4">
      {/* Premium / Cracked tabs */}
      <div className="mb-6 flex justify-center gap-2">
        {serverGroups.map((g) => {
          const active = g.id === activeId;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveId(g.id)}
              aria-pressed={active}
              className={`rounded-xl border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                active
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              {g.title}
              <span className="ml-2 text-white/40">{countIps(g)}</span>
            </button>
          );
        })}
      </div>

      {/* One card per region. "key" replays the animation when you switch tabs. */}
      <div key={activeId} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {regions.map((region, index) => {
          const ips = group.servers[region.code] || [];

          return (
            <motion.div
              key={region.code}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-indigo-400/20 px-2.5 py-1 text-xs font-bold text-indigo-100">
                  {region.code}
                </span>
                <h2 className="font-bold">{region.name}</h2>
              </div>

              {ips.length === 0 ? (
                <p className="text-sm text-white/40">No verified IPs yet.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {ips.map((ip) => (
                    <li
                      key={ip}
                      className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2"
                    >
                      <span className="min-w-0 truncate text-sm">{ip}</span>
                      <button
                        type="button"
                        onClick={() => copy(ip)}
                        aria-label={`Copy ${ip}`}
                        title="Copy IP"
                        className="shrink-0 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {copiedIp === ip ? (
                          <Check className="h-4 w-4 text-emerald-300" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-white/40">{serverNotice}</p>
    </section>
  );
}