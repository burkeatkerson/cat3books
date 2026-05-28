"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE, DURATION, Y_DEFAULT, VIEWPORT_MARGIN } from "@/lib/motion-config";

interface FadeUpProps {
  children: React.ReactNode;
  /** Extra delay in seconds on top of any parent stagger */
  delay?: number;
  duration?: number;
  y?: number;
  /** true = triggers on page load (hero); false = triggers on scroll */
  load?: boolean;
  className?: string;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = DURATION,
  y = Y_DEFAULT,
  load = false,
  className,
}: FadeUpProps) {
  const reduced = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE,
      },
    },
  };

  if (load) {
    return (
      <m.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      variants={variants}
    >
      {children}
    </m.div>
  );
}
