import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Shield, Calculator } from "lucide-react";

export default function EmergencySavingsCalculator() {
  const [monthly, setMonthly] = useState(2500);
  const [months, setMonths] = useState(3);

  const target = useMemo(() => monthly * months, [monthly, months]);

  return (
    <div className="safety-card border border-border/50 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Emergency Savings Calculator</h3>
          <p className="text-muted-foreground text-sm">How much should you set aside for a safety net?</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-semibold">Monthly Expenses</label>
            <span className="font-bold text-primary">${monthly.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="5000"
            step="100"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div>
          <label className="font-semibold mb-3 block">Safety Buffer</label>
          <div className="grid grid-cols-2 gap-3">
            {[3, 6].map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`py-4 rounded-2xl font-semibold text-sm transition-colors ${months === m ? "bg-primary text-white" : "bg-muted text-foreground/70"}`}
              >
                {m} months
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-success/10 to-emerald-50 p-6 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-1">Your Emergency Fund Target</p>
          <motion.p key={target} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-success">
            ${target.toLocaleString()}
          </motion.p>
          <p className="text-sm text-muted-foreground mt-3">
            Aim to save {months === 3 ? "3 months for basic security" : "6 months for stronger protection, especially if your income varies"}.
          </p>
        </div>
      </div>
    </div>
  );
}