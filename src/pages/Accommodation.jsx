import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import ExpandableCard from "@/components/ExpandableCard";
import { MapPin, Train, ShieldCheck, Users, Wifi, Building2, Home, GraduationCap, Heart, Filter } from "lucide-react";

const options = [
  {
    key: "renting", name: "Renting Alone", icon: Home, cost: "$600–$900/mo", privacy: "High", freedom: "High", amenities: "Full",
    travel: "Varies", suitability: "Stable income, values privacy",
    pros: ["Complete privacy & control", "Build rental history", "Your own space"],
    cons: ["Highest cost", "All bills in your name", "Bond + advance rent upfront"],
  },
  {
    key: "shared", name: "Shared Housing", icon: Users, cost: "$300–$480/mo", privacy: "Medium", freedom: "Medium", amenities: "Shared",
    travel: "Varies", suitability: "Budget-conscious, social",
    pros: ["Much cheaper", "Split bills & chores", "Built-in social contact"],
    cons: ["Less privacy", "Housemate conflicts possible", "Shared common areas"],
  },
  {
    key: "buying", name: "Buying", icon: Building2, cost: "$2,000+/mo mortgage", privacy: "High", freedom: "High", amenities: "Full",
    travel: "Varies", suitability: "Long-term, stable income + deposit",
    pros: ["Build equity", "Long-term security", "Customise your home"],
    cons: ["Large deposit needed", "Ongoing maintenance costs", "Less flexibility to move"],
  },
  {
    key: "student", name: "Student Accommodation", icon: GraduationCap, cost: "$400–$700/mo", privacy: "Low–Medium", freedom: "Medium", amenities: "Furnished",
    travel: "Near campus", suitability: "Full-time students",
    pros: ["Close to university", "Furnished & bills included", "Meet other students"],
    cons: ["Limited space", "Rules & curfews may apply", "Not available to non-students"],
  },
  {
    key: "parents", name: "Living with Parents", icon: Heart, cost: "$0–$250/mo", privacy: "Low", freedom: "Low", amenities: "Shared",
    travel: "Varies", suitability: "Saving money, transitioning",
    pros: ["Cheapest option", "Save for a deposit", "Family support"],
    cons: ["Less independence", "House rules", "Harder to build rental history"],
  },
];

const filters = ["All", "Cheapest", "Most Privacy", "Most Freedom", "Furnished"];

function badgeColor(val) {
  if (["High", "Full"].includes(val)) return "bg-success/10 text-success";
  if (["Medium", "Shared"].includes(val)) return "bg-warning/10 text-warning";
  return "bg-muted text-muted-foreground";
}

export default function Accommodation() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return options;
    if (filter === "Cheapest") return [...options].sort((a, b) => a.cost.localeCompare(b.cost)).slice(0, 3);
    if (filter === "Most Privacy") return options.filter((o) => ["High"].includes(o.privacy));
    if (filter === "Most Freedom") return options.filter((o) => ["High"].includes(o.freedom));
    if (filter === "Furnished") return options.filter((o) => o.amenities === "Furnished");
    return options;
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero eyebrow="Section 6" title="Accommodation" subtitle="Compare every housing option side-by-side and find the right fit for your budget and lifestyle." />

      {/* Location factors */}
      <Reveal>
        <SectionHeader eyebrow="Choosing a Location" title="Beyond the rent" subtitle="Location matters as much as price. Consider these factors:" align="center" icon={MapPin} />
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {[
          { icon: MapPin, t: "Distance to Work", d: "A long commute costs time and money." },
          { icon: GraduationCap, t: "Distance to Uni", d: "Walking or cycling distance saves on transport." },
          { icon: Train, t: "Public Transport", d: "Reliable access reduces car dependence." },
          { icon: ShieldCheck, t: "Safety", d: "Research area safety and crime stats." },
          { icon: Users, t: "Community", d: "A supportive neighbourhood helps you settle in." },
          { icon: Wifi, t: "Internet", d: "Check NBN availability before signing." },
          { icon: Users, t: "Social Life", d: "Stay connected to friends and support." },
          { icon: MapPin, t: "Amenities", d: "Nearby shops, GP and services matter." },
        ].map((f, i) => (
          <Reveal key={f.t} delay={i * 0.03}>
            <div className="safety-card border border-border/50 p-5 h-full">
              <f.icon className="w-6 h-6 text-primary mb-3" />
              <p className="font-semibold text-sm mb-1">{f.t}</p>
              <p className="text-xs text-muted-foreground">{f.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Filters */}
      <Reveal>
        <SectionHeader eyebrow="Compare Options" title="Which suits you best?" subtitle="Use the filters to narrow down your options." align="center" icon={Filter} />
      </Reveal>
      <Reveal delay={0.05}>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground hover:border-primary/40"}`}>
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Comparison cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((opt, i) => (
            <motion.div key={opt.key} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <div className="safety-card border border-border/50 p-6 h-full flex flex-col hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <opt.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">{opt.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">{opt.cost}</p>

                <div className="space-y-2 mb-4 text-sm">
                  {[
                    { label: "Privacy", val: opt.privacy },
                    { label: "Freedom", val: opt.freedom },
                    { label: "Amenities", val: opt.amenities },
                    { label: "Travel", val: opt.travel },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor(row.val)}`}>{row.val}</span>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground pt-1"><span className="font-semibold">Best for:</span> {opt.suitability}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-success mb-1.5">Pros</p>
                    <ul className="space-y-1">{opt.pros.map((p) => <li key={p} className="text-xs text-muted-foreground flex gap-1.5"><span className="text-success">+</span> {p}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-destructive mb-1.5">Cons</p>
                    <ul className="space-y-1">{opt.cons.map((c) => <li key={c} className="text-xs text-muted-foreground flex gap-1.5"><span className="text-destructive">−</span> {c}</li>)}</ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}