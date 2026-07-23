import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Users, DollarSign } from "lucide-react";

const baseCosts = {
  sydney: { label: "Sydney", rentAlone: 720, rentShare: 380, apartment: 720, base: 0 },
  regional: { label: "Regional NSW", rentAlone: 420, rentShare: 230, apartment: 420, base: 0 },
};

const otherCosts = {
  utilities: 180,
  internet: 80,
  groceries: 420,
  transport: 180,
  personal: 160,
  health: 60,
};

export default function CostOfLivingEstimator() {
  const [region, setRegion] = useState("sydney");
  const [housing, setHousing] = useState("share");

  const estimate = useMemo(() => {
    const data = baseCosts[region];
    const rent = housing === "alone" ? data.rentAlone : data.rentShare;
    const total = rent + Object.values(otherCosts).reduce((a, b) => a + b, 0);
    return { rent, other: total - rent, total };
  }, [region, housing]);

  return (
    <div className="safety-card border border-border/50 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="flex items-center gap-2 font-semibold mb-3"><MapPin className="w-4 h-4 text-primary" /> Location</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(baseCosts).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setRegion(key)}
                className={`py-3 rounded-2xl font-medium text-sm transition-colors ${region === key ? "bg-primary text-white" : "bg-muted text-foreground/70"}`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 font-semibold mb-3"><Home className="w-4 h-4 text-primary" /> Living Arrangement</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setHousing("share")} className={`py-3 rounded-2xl font-medium text-sm transition-colors flex items-center justify-center gap-1.5 ${housing === "share" ? "bg-primary text-white" : "bg-muted text-foreground/70"}`}>
              <Users className="w-4 h-4" /> Shared House
            </button>
            <button onClick={() => setHousing("alone")} className={`py-3 rounded-2xl font-medium text-sm transition-colors flex items-center justify-center gap-1.5 ${housing === "alone" ? "bg-primary text-white" : "bg-muted text-foreground/70"}`}>
              <Home className="w-4 h-4" /> Living Alone
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-primary/5 to-accent p-6">
        <p className="text-sm font-semibold text-muted-foreground mb-1">Estimated Monthly Cost</p>
        <motion.p key={estimate.total} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-primary mb-4">
          ${estimate.total.toLocaleString()}
        </motion.p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
            <span className="text-muted-foreground">Housing</span>
            <span className="font-semibold">${estimate.rent}</span>
          </div>
          <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
            <span className="text-muted-foreground">All other costs</span>
            <span className="font-semibold">${estimate.other}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Includes utilities, internet, groceries, transport, personal & health. Figures are realistic Australian estimates.</p>
      </div>
    </div>
  );
}