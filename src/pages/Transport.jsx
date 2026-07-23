import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Car, Footprints, Bike, Train, Bus, Wind, CarFront, MapPin, Trophy } from "lucide-react";

const transportOptions = [
  { key: "walk", name: "Walking", icon: Footprints, urban: 0, regional: 0, pros: "Free, healthy, reliable", cons: "Slow for long distances", best: "Short urban trips" },
  { key: "bike", name: "Bike", icon: Bike, urban: 30, regional: 30, pros: "Cheap, fast, eco-friendly", cons: "Weather-dependent, theft risk", best: "5–10km commutes" },
  { key: "train", name: "Train", icon: Train, urban: 160, regional: 120, pros: "Fast in cities, avoid traffic", cons: "Limited in regional areas", best: "Sydney commuting" },
  { key: "bus", name: "Bus", icon: Bus, urban: 140, regional: 100, pros: "Wide coverage, affordable", cons: "Slower, subject to traffic", best: "Where trains don't go" },
  { key: "car", name: "Car", icon: Car, urban: 450, regional: 520, pros: "Door-to-door flexibility", cons: "Expensive to run & maintain", best: "Regional or family needs" },
  { key: "motorbike", name: "Motorbike", icon: Wind, urban: 220, regional: 280, pros: "Cheaper than a car, lane filter", cons: "Less safe, weather exposure", best: "Solo commuters" },
  { key: "rideshare", name: "Ride Share", icon: CarFront, urban: 300, regional: 400, pros: "No ownership costs", cons: "Expensive long-term", best: "Occasional trips" },
];

const carCosts = [
  { label: "Purchase Price", val: "$5,000–$15,000", note: "First car, second-hand" },
  { label: "Registration", val: "$700–$900/yr", note: "NSW rego + CTP" },
  { label: "Insurance", val: "$800–$1,500/yr", note: "Comprehensive" },
  { label: "Fuel", val: "$150–$250/mo", note: "Depends on usage" },
  { label: "Maintenance", val: "$50–$100/mo", note: "Average upkeep" },
  { label: "Servicing", val: "$200–$500/visit", note: "Every 6–12 months" },
  { label: "Tyres", val: "$400–$800/set", note: "Every 2–3 years" },
];

export default function Transport() {
  const [area, setArea] = useState("urban");

  const cheapest = useMemo(() => {
    return [...transportOptions].sort((a, b) => a[area] - b[area])[0];
  }, [area]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero eyebrow="Section 7" title="Transport" subtitle="Compare every way to get around — and see the true cost of owning a car." />

      {/* Comparison table */}
      <Reveal>
        <SectionHeader eyebrow="Transport Comparison" title="Cost vs convenience" align="center" icon={Car} />
      </Reveal>

      {/* Area toggle */}
      <Reveal delay={0.05}>
        <div className="flex justify-center gap-3 mb-8">
          {[
            { key: "urban", label: "Urban (Sydney)", icon: MapPin },
            { key: "regional", label: "Regional NSW", icon: MapPin },
          ].map((a) => (
            <button key={a.key} onClick={() => setArea(a.key)} className={`px-5 py-3 rounded-2xl font-medium text-sm transition-colors flex items-center gap-2 ${area === a.key ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground"}`}>
              <a.icon className="w-4 h-4" /> {a.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Recommendation */}
      <Reveal delay={0.1}>
        <div className="safety-card border border-success/40 bg-success/5 p-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-success font-semibold mb-2"><Trophy className="w-5 h-5" /> Cheapest Option for {area === "urban" ? "Urban Sydney" : "Regional NSW"}</div>
          <p className="text-3xl font-bold text-success">{cheapest.name} — ${cheapest[area]}/mo</p>
          <p className="text-sm text-muted-foreground mt-2">{cheapest.best}</p>
        </div>
      </Reveal>

      {/* Table */}
      <Reveal delay={0.15}>
        <div className="safety-card border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left p-4 font-semibold">Option</th>
                  <th className="text-right p-4 font-semibold">Urban (Sydney)</th>
                  <th className="text-right p-4 font-semibold">Regional NSW</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody>
                {transportOptions.map((opt, i) => (
                  <motion.tr key={opt.key} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className={`border-b border-border/40 ${opt.key === cheapest.key ? "bg-success/5" : ""}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <opt.icon className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{opt.name}</span>
                      </div>
                    </td>
                    <td className="text-right p-4 font-medium">${opt.urban}/mo</td>
                    <td className="text-right p-4 font-medium">${opt.regional}/mo</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell text-xs">{opt.best}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Detailed cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 mb-16">
        {transportOptions.map((opt, i) => (
          <Reveal key={opt.key} delay={i * 0.03}>
            <div className="safety-card border border-border/50 p-6 h-full hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                <opt.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{opt.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">~${opt[area]}/mo</p>
              <p className="text-xs text-success mb-1">+ {opt.pros}</p>
              <p className="text-xs text-destructive">− {opt.cons}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Car ownership costs */}
      <Reveal>
        <SectionHeader eyebrow="Buying a Car" title="The true cost of car ownership" subtitle="It's more than just the purchase price. Here's the full breakdown." align="center" icon={Car} />
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {carCosts.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.04}>
            <div className="safety-card border border-border/50 p-5">
              <Car className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <p className="font-bold text-base">{c.val}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}