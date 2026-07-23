import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const palettes = {
  blue: "from-primary/10 to-accent",
  green: "from-success/10 to-emerald-50",
  amber: "from-amber-100 to-orange-50",
  violet: "from-violet-100 to-indigo-50",
  rose: "from-rose-100 to-pink-50",
  sky: "from-sky-100 to-cyan-50",
};

export default function NavTile({ to, title, description, icon: Icon, accent = "blue", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={to}
        className="group block safety-card border border-border/50 p-6 md:p-7 h-full transition-all duration-300 hover:border-primary/40 hover:shadow-[0_28px_60px_rgba(0,82,204,0.10)] hover:-translate-y-1.5"
      >
        <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110", palettes[accent])}>
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-1.5">{title}</h3>
        <p className="text-muted-foreground text-base">{description}</p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
          Explore <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  );
}