import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, subtitle, align = "left", icon: Icon }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`${alignment} max-w-3xl mb-10 md:mb-14`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-sm font-semibold mb-4"
        >
          {Icon && <Icon className="w-4 h-4" />}
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground text-balance"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}