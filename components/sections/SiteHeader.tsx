"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { EASE } from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-x-0 top-0 z-40"
    >
      {/* The bar carries the blur; the menu overlay must not sit inside a
          backdrop-filter ancestor or its fixed positioning breaks. */}
      <div className="hairline-b relative z-50 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="relative z-50 font-mono text-xs tracking-wide text-muted transition-colors hover:text-ink"
        >
          {profile.name.toLowerCase().replace(" ", ".")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile: theme toggle + burger */}
        <div className="relative z-50 flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-8 flex-col items-center justify-center gap-[5px] rounded-full border border-[var(--line)]"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="block h-px w-3.5 bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="block h-px w-3.5 bg-ink"
            />
          </button>
        </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pb-10 pt-28 md:hidden"
          >
            <nav>
              {nav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.07, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="hairline-b flex items-baseline gap-4 py-5"
                  >
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl font-medium tracking-[-0.015em]">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
              className="font-mono text-xs text-muted"
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
