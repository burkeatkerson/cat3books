"use client";

import { m } from "framer-motion";
import { STAGGER, VIEWPORT_MARGIN } from "@/lib/motion-config";

interface StaggerGroupProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export default function StaggerGroup({
  children,
  stagger = STAGGER,
  className,
}: StaggerGroupProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
