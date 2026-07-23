import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function InfoCard({ icon: Icon, title, children, className, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn("safety-card border border-border/50 p-6 md:p-7 h-full transition-colors hover:border-primary/40", className)}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="text-muted-foreground text-base leading-relaxed">{children}</div>
    </motion.div>
  );
}