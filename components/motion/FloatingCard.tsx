"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type FloatingCardProps = {
  children: React.ReactNode;
  /** Cursor-parallax depth: px of travel at screen edges. Vary per card. */
  depth?: number;
  /** Seconds; each card gets a different period so floats never sync. */
  floatDuration?: number;
  floatDelay?: number;
  rotate?: number;
  className?: string;
};

export default function FloatingCard({
  children,
  depth = 14,
  floatDuration = 7,
  floatDelay = 0,
  rotate = 0,
  className,
}: FloatingCardProps) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), {
    stiffness: 60,
    damping: 20,
  });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-depth, depth]), {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  return (
    <motion.div style={reduced ? undefined : { x: px, y: py }} className={className}>
      <motion.div
        animate={
          reduced
            ? undefined
            : { y: [0, -9, 0], rotate: [rotate, rotate + 0.6, rotate] }
        }
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ rotate }}
        whileHover={{ scale: 1.03, y: -6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
