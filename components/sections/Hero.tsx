"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FloatingCard from "@/components/motion/FloatingCard";
import Magnetic from "@/components/motion/Magnetic";
import { EASE } from "@/components/motion/Reveal";
import RotatingSelection from "@/components/motion/RotatingSelection";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

// Desktop float field: index into `projects`, placement, and motion character.
const floats = [
  {
    project: 0,
    // base widths shrink the cards for iPad landscape (lg, <1280px) so the
    // float field doesn't overlap; xl restores the full desktop scale.
    className: "absolute right-[5%] top-[14%] w-44 xl:w-60",
    depth: 18,
    duration: 7.5,
    rotate: 2,
  },
  {
    project: 1,
    className: "absolute right-[25%] top-[19%] w-32 xl:w-44",
    depth: 28,
    duration: 6.2,
    delay: 0.8,
    rotate: -2.5,
  },
  {
    project: 2,
    orientation: "landscape",
    className: "absolute bottom-[8%] right-[7%] w-64 xl:w-94",
    depth: 12,
    duration: 8.4,
    delay: 1.6,
    rotate: 1.5,
  },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const line = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Desktop: cards float in the whitespace right of the type */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {floats.map((f, i) => (
          <FloatingCard
            key={projects[f.project].slug}
            depth={f.depth}
            floatDuration={f.duration}
            floatDelay={"delay" in f ? f.delay : 0}
            rotate={f.rotate}
            className={`${f.className} pointer-events-auto`}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: EASE }}
            >
              <ProjectCard
                project={projects[f.project]}
                index={f.project}
                orientation={"orientation" in f ? f.orientation : "portrait"}
              />
            </motion.div>
          </FloatingCard>
        ))}
      </div>

      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-6 pb-16 pt-32 md:px-10 lg:pb-24">
        <motion.div
          variants={container}
          initial={reduced ? false : "hidden"}
          animate="show"
          className="max-w-3xl"
        >
          <motion.p variants={line} className="mb-6 font-mono text-xs tracking-wide text-muted">
            Software Engineer · {profile.location}
          </motion.p>

          <h1 className="text-[clamp(2.2rem,6.5vw,5rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            <motion.span variants={line} className="block">
              Hi, I&rsquo;m <span className="serif-accent">{profile.firstName}</span>.
            </motion.span>
            <motion.span variants={line} className="block">
              I build
            </motion.span>
            {/* the selection always owns its line, so cycling words never reflows the page */}
            <motion.span variants={line} className="block">
              <RotatingSelection words={profile.roles} />
            </motion.span>
          </h1>

          <motion.p
            variants={line}
            className="mt-8 max-w-md text-base leading-relaxed text-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={line} className="mt-10 flex items-center gap-4">
            <Magnetic>
              <Link
                href="/#work"
                className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
              >
                See the work
                <ArrowDown size={14} />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm text-muted transition-colors hover:text-ink"
              >
                Say hi
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Mobile: the float field becomes a snap-scroll shelf */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="-mx-6 -mb-6 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-10 pt-6 md:-mx-10 md:px-10 lg:hidden"
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="w-56 shrink-0 snap-center"
              style={{ rotate: `${i % 2 === 0 ? 1.2 : -1.2}deg` }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
