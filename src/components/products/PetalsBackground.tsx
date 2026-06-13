"use client";

import React from "react";

/**
 * Floating petals SVG background for the "Why You'll Love It" section.
 * Renders pastel-coloured petal shapes that drift upward with CSS animation.
 */
export default function PetalsBackground() {
  const petals = [
    {
      id: 1,
      d: "M12 2C10 8 4 10 4 14c0 4 6 6 8 8 2-2 8-4 8-8 0-4-6-6-8-8z",
      color: "#fbcfe8",
      size: 28,
      left: "5%",
      top: "10%",
      delay: 0,
      duration: 7,
    },
    {
      id: 2,
      d: "M10 4C6 10 2 12 2 16c0 4 6 6 8 10 2-4 8-6 8-10 0-4-4-6-8-12z",
      color: "#bfdbfe",
      size: 22,
      left: "20%",
      top: "40%",
      delay: 1.5,
      duration: 9,
    },
    {
      id: 3,
      d: "M14 3C10 9 6 11 6 15c0 4 6 6 8 9 2-3 8-5 8-9 0-4-4-6-8-12z",
      color: "#fde68a",
      size: 18,
      left: "55%",
      top: "15%",
      delay: 0.8,
      duration: 8,
    },
    {
      id: 4,
      d: "M11 2C9 8 3 10 3 14c0 4 6 6 8 8 2-2 8-4 8-8 0-4-6-6-8-8z",
      color: "#a7f3d0",
      size: 24,
      left: "75%",
      top: "35%",
      delay: 2.2,
      duration: 10,
    },
    {
      id: 5,
      d: "M13 5C9 11 5 13 5 17c0 4 6 6 8 9 2-3 8-5 8-9 0-4-4-6-8-12z",
      color: "#e9d5ff",
      size: 20,
      left: "40%",
      top: "60%",
      delay: 3,
      duration: 7.5,
    },
    {
      id: 6,
      d: "M12 3C10 9 4 11 4 15c0 4 6 6 8 9 2-3 8-5 8-9 0-4-6-6-8-12z",
      color: "#fecdd3",
      size: 16,
      left: "88%",
      top: "50%",
      delay: 1.2,
      duration: 11,
    },
    {
      id: 7,
      d: "M11 4C7 10 3 12 3 16c0 4 6 6 8 8 2-2 8-4 8-8 0-4-4-6-8-12z",
      color: "#bae6fd",
      size: 26,
      left: "12%",
      top: "70%",
      delay: 4,
      duration: 8.5,
    },
    {
      id: 8,
      d: "M14 2C12 8 6 10 6 14c0 4 6 6 8 8 2-2 8-4 8-8 0-4-6-6-8-8z",
      color: "#fef08a",
      size: 15,
      left: "65%",
      top: "80%",
      delay: 2.5,
      duration: 9.5,
    },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <svg
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `petal-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={p.d} fill={p.color} opacity={0.6} />
        </svg>
      ))}
    </div>
  );
}
