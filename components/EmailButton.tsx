"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";

/**
 * The email address as the contact CTA: click copies it, and the
 * address flashes the selection highlight as confirmation.
 */
export default function EmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <Magnetic className="inline-block">
      <button
        type="button"
        onClick={copy}
        className="group flex items-center gap-3 text-lg md:text-2xl"
        aria-label={`Copy email address ${email}`}
      >
        <span className={copied ? "text-highlight" : ""}>{email}</span>
        <span className="flex size-8 items-center justify-center rounded-full border border-[var(--line)] text-muted transition-colors group-hover:text-ink">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
            </motion.span>
          </AnimatePresence>
        </span>
        <span
          aria-live="polite"
          className={`font-mono text-xs transition-opacity duration-300 ${
            copied ? "text-muted opacity-100" : "opacity-0"
          }`}
        >
          copied
        </span>
      </button>
    </Magnetic>
  );
}
