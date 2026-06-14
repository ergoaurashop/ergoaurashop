"use client";

import { motion } from "framer-motion";
import { S23_KEY_FEATURES } from "@/lib/s23-ultra-data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function S23Features() {
  return (
    <section className="s23-section">
      <div className="s23-section-container">
        <div className="text-center mb-12">
          <span className="s23-section-label">Key Features</span>
          <h2 className="s23-section-title">A Flagship Like No Other</h2>
          <p className="s23-section-subtitle mx-auto">
            Every detail of the Galaxy S23 Ultra was engineered to impress.
            Here's what makes it the most powerful Samsung phone ever.
          </p>
        </div>

        <motion.div
          className="s23-feature-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {S23_KEY_FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              className="s23-feature-card"
              variants={cardVariants}
            >
              <span className="s23-feature-icon">{feature.icon}</span>
              <h3 className="s23-feature-title">{feature.title}</h3>
              <p className="s23-feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
