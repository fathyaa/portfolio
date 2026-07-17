"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { Project } from "@/data/projects";

type WorkRowProps = {
  project: Project;
  index: number;
};

/**
 * One editorial row of the work index. On pointer devices a small
 * preview card trails the cursor while the row is hovered.
 */
export default function WorkRow({ project, index }: WorkRowProps) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 200, damping: 25, mass: 0.6 });
  const py = useSpring(my, { stiffness: 200, damping: 25, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  // Every other row indents — asymmetry without breaking the reading line.
  const indent = index % 2 === 1 ? "md:pl-[14%]" : "";

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="hairline-t group relative block py-9 md:py-11"
    >
      <div className={`flex flex-col gap-2 transition-transform duration-500 ease-out ${indent}`}>
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-xs text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-3xl font-medium tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent-ink md:text-5xl">
            {project.title}
          </h3>
          <span className="ml-auto hidden font-mono text-xs text-muted md:block">
            {project.category} · {project.year}
          </span>
        </div>
        <p className="max-w-lg pl-[calc(1.25rem+2ch)] text-sm leading-relaxed text-muted">
          {project.oneLiner}
        </p>
        <span className="pl-[calc(1.25rem+2ch)] font-mono text-[11px] text-faint md:hidden">
          {project.category} · {project.year}
        </span>
      </div>

      {/* Cursor-trailing preview (pointer devices only) */}
      {!reduced && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: px, y: py }}
              className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
            >
              <div className="-translate-y-1/2 translate-x-6 overflow-hidden rounded-xl border border-[var(--line)] bg-card shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)]">
                {project.media.type === "video" ? (
                  <Image
                    src={project.media.poster}
                    alt=""
                    width={176}
                    height={208}
                    className="h-52 w-44 object-cover"
                  />
                ) : (
                  <div className="flex h-52 w-44 items-center justify-center bg-paper">
                    <span className="text-4xl text-accent">{project.media.glyph}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Link>
  );
}
