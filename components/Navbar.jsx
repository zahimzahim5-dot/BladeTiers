"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, Swords } from "lucide-react";
import { siteConfig, navLinks } from "@/data/siteConfig";

export default function Navbar() {
  // "open" remembers whether the mobile menu is open (true) or closed (false)
  const [open, setOpen] = useState(false);

  // usePathname tells us which page we are on, so we can highlight its link
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <Swords className="h-5 w-5 text-indigo-300" />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop links (hidden on small screens) */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            Discord
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile menu button (hidden on large screens) */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl p-2 text-white/80 transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="glass mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl p-2 md:hidden">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  active ? "bg-white/10 text-white" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-white/70"
          >
            Discord
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}