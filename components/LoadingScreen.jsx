"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Swords } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function LoadingScreen() {
  // "show" is true while the loading screen is visible
  const [show, setShow] = useState(true);

  useEffect(() => {
    // If we already showed the animation in this browser session, hide it fast
    let seen = false;
    try {
      seen = sessionStorage.getItem("bladetiers-loaded") === "1";
    } catch {
      // If the browser blocks storage, we just show the animation again
    }

    if (seen) {
      setShow(false);
      return;
    }

    // Otherwise show it for 1.8 seconds, then hide it and remember that
    const timer = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("bladetiers-loaded", "1");
      } catch {}
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080c]"
        >
          {/* Soft glow behind the icon */}
          <div className="absolute h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.7, ease: "easeOut" }}
            className="relative"
          >
            <Swords className="h-14 w-14 text-indigo-300" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 1.3 }}
            className="relative mt-5 text-2xl font-bold tracking-tight"
          >
            {siteConfig.name}
          </motion.p>

          {/* Loading bar that fills from left to right */}
          <div className="relative mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full rounded-full bg-indigo-300"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}