"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE, DURATION, Y_DEFAULT } from "@/lib/motion-config";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export default function StaggerItem({ children, className }: StaggerItemProps) {
  const reduced = useReducedMotion();

  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : Y_DEFAULT },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduced ? 0 : DURATION,
            ease: EASE,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
