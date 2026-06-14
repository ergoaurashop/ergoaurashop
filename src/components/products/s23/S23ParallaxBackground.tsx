"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface S23ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number; // 0-1, higher = faster parallax
  className?: string;
}

export default function S23ParallaxBackground({
  children,
  speed = 0.5,
  className = "",
}: S23ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <div ref={ref} className={`s23-parallax-wrapper ${className}`}>
      <motion.div style={{ y }} className="s23-parallax-content">
        {children}
      </motion.div>
    </div>
  );
}
