"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="flex size-8 items-center justify-center rounded-full border border-[var(--line)] text-muted transition-colors hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -40, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
