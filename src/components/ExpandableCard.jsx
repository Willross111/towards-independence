import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExpandableCard({ title, subtitle, icon: Icon, children, accent = "primary" }) {
  const [open, setOpen] = useState(false);
  const accentClasses = {
    primary: "hover:border-primary/40 hover:shadow-[0_28px_50px_rgba(0,82,204,0.08)]",
    success: "hover:border-success/40",
  };
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn("safety-card border border-border/60 p-6 md:p-7 transition-colors cursor-pointer", accentClasses[accent])}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            {subtitle && <p className="text-muted-foreground mt-1 text-base">{subtitle}</p>}
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="shrink-0 mt-1">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t border-border/60 text-base text-muted-foreground leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}