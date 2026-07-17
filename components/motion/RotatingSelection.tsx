"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "./Reveal";

type RotatingSelectionProps = {
  words: readonly string[];
  intervalMs?: number;
};

/**
 * Cycles through words styled as a live text selection: accent highlight
 * with selection handles, the word swapping with blur + fade + rise.
 *
 * The highlight's width is animated numerically to the *current* word's
 * measured width, so the blue box tracks the incoming word immediately —
 * it never lingers at the outgoing word's width (which left a gap on
 * wide → narrow swaps). The outgoing word fades out as an absolute overlay
 * so it no longer holds the box open.
 */
export default function RotatingSelection({
  words,
  intervalMs = 3200,
}: RotatingSelectionProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, reduced, intervalMs, words.length]);

  // Measure each word at the live font size, and re-measure on resize since
  // the hero type is fluid (clamp). The measurer inherits the hero font.
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () =>
      setWidths(
        Array.from(el.children).map((c) => c.getBoundingClientRect().width),
      );
    measure();
    window.addEventListener("resize", measure);
    // Fonts can settle after first paint; re-measure once ready.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [words]);

  const width = widths[index];

  return (
    <motion.span
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="text-highlight relative inline-block whitespace-nowrap align-bottom"
      style={width ? undefined : { width: "max-content" }}
      animate={width ? { width } : undefined}
      transition={{ duration: 0.45, ease: EASE }}
      aria-live="polite"
    >
      {/* Hidden measurer: one span per word at the real font size + padding. */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0"
      >
        {words.map((w) => (
          <span key={w} className="inline-block px-[0.08em]">
            {w}
          </span>
        ))}
      </span>

      {/* In-flow invisible copy of the current word gives the box its height
          (the visible words are absolutely positioned). */}
      <span aria-hidden className="invisible inline-block px-[0.08em]">
        {words[index]}
      </span>

      {/* selection handles, iOS-style: dot + stem on opposite corners */}
      <span
        aria-hidden
        className="absolute -left-px -top-[0.18em] z-10 h-[calc(100%+0.18em)] w-0.5 bg-accent"
      >
        <span className="absolute -left-[3.5px] -top-2 size-2 rounded-full bg-accent" />
      </span>
      <span
        aria-hidden
        className="absolute -right-px top-0 z-10 h-[calc(100%+0.18em)] w-0.5 bg-accent"
      >
        <span className="absolute -bottom-2 -right-[3.5px] size-2 rounded-full bg-accent" />
      </span>

      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={
            reduced ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }
          }
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute left-0 top-0 px-[0.08em]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
