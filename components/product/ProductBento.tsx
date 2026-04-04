"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProductBentoProps {
  highlightsRaw?: string;
}

export function ProductBento({ highlightsRaw }: ProductBentoProps) {
  if (!highlightsRaw) return null;

  const highlights = highlightsRaw.split("|").map(s => s.trim()).filter(Boolean);
  if (highlights.length === 0) return null;

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as any
    }
  };

  return (
    <section className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Main Bento Feature (Large) */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 md:row-span-2 bg-ergo-surface rounded-3xl p-8 md:p-12 border border-ergo-border flex flex-col justify-end min-h-[400px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-ergo-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-ergo-green mb-4 block">Core Innovation</span>
            <h3 className="text-3xl md:text-5xl font-black text-ergo-navy-deep tracking-tighter mb-6">
              {highlights[0]}
            </h3>
            <p className="text-ergo-muted text-sm md:text-base max-w-md leading-relaxed">
              Experience the pinnacle of ergonomic engineering. Every curve and mechanism is designed for your ultimate comfort and long-term health.
            </p>
          </div>
        </motion.div>

        {/* Second Feature */}
        {highlights[1] && (
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 border border-ergo-border flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-2xl bg-ergo-navy-deep text-white flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h4 className="text-xl font-black text-ergo-navy-deep tracking-tight">
              {highlights[1]}
            </h4>
          </motion.div>
        )}

        {/* Third Feature */}
        {highlights[2] && (
          <motion.div 
            variants={itemVariants}
            className="bg-ergo-navy-deep rounded-3xl p-8 text-white flex flex-col justify-between"
          >
            <div className="text-ergo-green mb-6 font-black text-4xl italic opacity-50">03</div>
            <h4 className="text-xl font-bold tracking-tight">
              {highlights[2]}
            </h4>
          </motion.div>
        )}

        {/* Remaining Features as a Grid */}
        {highlights.slice(3).map((highlight, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="bg-ergo-surface rounded-3xl p-6 border border-ergo-border flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-ergo-green/20 text-ergo-green flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-bold text-ergo-navy-deep">{highlight}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
