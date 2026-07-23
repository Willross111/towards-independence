import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

export default function PageHero({ eyebrow, title, subtitle, image, align = "center" }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 md:pt-20 md:pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent/40 rounded-full blur-3xl translate-y-1/3" />
      </div>
      <div className={`max-w-6xl mx-auto px-5 md:px-8 ${align === "center" ? "text-center" : ""}`}>
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md mb-8"
          >
            <div className="animate-float">
              <Image
                src={image}
                alt={title}
                className="w-full aspect-square rounded-[32px] object-contain"
                fittingType="fit"
              />
            </div>
          </motion.div>
        )}
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-sm font-semibold mb-5"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={`mt-5 text-lg md:text-xl text-muted-foreground text-balance ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}