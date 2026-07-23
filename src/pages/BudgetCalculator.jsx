import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download, TrendingUp, TrendingDown, Wallet, CheckCircle2, AlertTriangle } from "lucide-react";
import jsPDF from "jspdf";

const incomeFields = [
  { key: "job", label: "Job Income", icon: Wallet },
  { key: "allowance", label: "Allowance", icon: Wallet },
  { key: "scholarship", label: "Scholarships", icon: Wallet },
  { key: "other_income", label: "Other Income", icon: Wallet },
];

const expenseGroups = [
  {
    name: "Housing", items: [
      { key: "rent", label: "Rent" },
      { key: "utilities", label: "Utilities" },
      { key: "internet", label: "Internet" },
      { key: "insurance", label: "Insurance" },
    ],
  },
  {
    name: "Food", items: [
      { key: "groceries", label: "Groceries" },
      { key: "takeaway", label: "Takeaway" },
    ],
  },
  {
    name: "Transport", items: [
      { key: "public_transport", label: "Public Transport" },
      { key: "fuel", label: "Fuel" },
      { key: "car_insurance", label: "Car Insurance" },
      { key: "maintenance", label: "Maintenance" },
    ],
  },
  {
    name: "Health", items: [
      { key: "medications", label: "Medications" },
      { key: "health_insurance", label: "Health Insurance" },
    ],
  },
  {
    name: "Personal", items: [
      { key: "phone", label: "Phone" },
      { key: "clothing", label: "Clothing" },
      { key: "subscriptions", label: "Subscriptions" },
      { key: "entertainment", label: "Entertainment" },
    ],
  },
  {
    name: "Savings", items: [
      { key: "savings", label: "Savings" },
      { key: "emergency_fund", label: "Emergency Fund" },
    ],
  },
];

const defaults = {
  job: 2400, allowance: 0, scholarship: 0, other_income: 0,
  rent: 380, utilities: 180, internet: 80, insurance: 50,
  groceries: 420, takeaway: 120,
  public_transport: 180, fuel: 0, car_insurance: 0, maintenance: 0,
  medications: 40, health_insurance: 0,
  phone: 60, clothing: 80, subscriptions: 40, entertainment: 100,
  savings: 200, emergency_fund: 100,
};

const COLORS = ["#0052CC", "#00875A", "#FFAB00", "#6C5CE7", "#E17055", "#00B894"];

export default function BudgetCalculator() {
  const [values, setValues] = useState(defaults);
  const resultsRef = useRef(null);

  const totals = useMemo(() => {
    const income = incomeFields.reduce((sum, f) => sum + (Number(values[f.key]) || 0), 0);
    const expenseKeys = expenseGroups.flatMap((g) => g.items.map((i) => i.key));
    const expenses = expenseKeys.reduce((sum, k) => sum + (Number(values[k]) || 0), 0);
    const remaining = income - expenses;
    const savingsRate = income > 0 ? Math.round((remaining / income) * 100) : 0;
    return { income, expenses, remaining, savingsRate };
  }, [values]);

  const pieData = useMemo(() => {
    return expenseGroups
      .map((g) => ({
        name: g.name,
        value: g.items.reduce((sum, i) => sum + (Number(values[i.key]) || 0), 0),
      }))
      .filter((d) => d.value > 0);
  }, [values]);

  const barData = [{ name: "Income", amount: totals.income }, { name: "Expenses", amount: totals.expenses }];

  const isHealthy = totals.remaining >= 0;
  const advice = useMemo(() => {
    if (totals.income === 0) return "Add your income to see personalised advice.";
    if (totals.remaining < 0) return `You're spending $${Math.abs(totals.remaining).toLocaleString()} more than you earn. Look at cutting "wants" first — entertainment, subscriptions and takeaway are good places to start.`;
    if (totals.savingsRate >= 20) return `Great work! You're saving ${totals.savingsRate}% of your income — above the recommended 20%. Consider boosting your emergency fund or investing for the future.`;
    if (totals.savingsRate >= 10) return `You're saving ${totals.savingsRate}% of your income. Aim to push this towards 20% by trimming variable expenses like takeaway and entertainment.`;
    return `You're saving ${totals.savingsRate}% of your income. Try to reach at least 10% — start by reviewing subscriptions and non-essential spending.`;
  }, [totals]);

  const update = (key, val) => setValues((v) => ({ ...v, [key]: val === "" ? 0 : Number(val) }));
  const reset = () => setValues(defaults);

  const download = () => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(20); doc.setFont(undefined, "bold");
    doc.text("My Independence Budget", 20, y); y += 10;
    doc.setFontSize(11); doc.setFont(undefined, "normal");
    doc.text("Towards Independence - Monthly Budget Summary", 20, y); y += 14;

    doc.setFontSize(13); doc.setFont(undefined, "bold"); doc.text("Summary", 20, y); y += 8;
    doc.setFontSize(11); doc.setFont(undefined, "normal");
    doc.text(`Total Income:   $${totals.income.toLocaleString()}`, 20, y); y += 7;
    doc.text(`Total Expenses: $${totals.expenses.toLocaleString()}`, 20, y); y += 7;
    doc.text(`Remaining:      $${totals.remaining.toLocaleString()}`, 20, y); y += 7;
    doc.text(`Savings Rate:   ${totals.savingsRate}%`, 20, y); y += 12;

    doc.setFontSize(13); doc.setFont(undefined, "bold"); doc.text("Advice", 20, y); y += 8;
    doc.setFontSize(10); doc.setFont(undefined, "normal");
    const adviceLines = doc.splitTextToSize(advice, 170);
    doc.text(adviceLines, 20, y); y += adviceLines.length * 6 + 6;

    doc.setFontSize(13); doc.setFont(undefined, "bold"); doc.text("Expense Breakdown", 20, y); y += 8;
    doc.setFontSize(11); doc.setFont(undefined, "normal");
    pieData.forEach((d) => {
      doc.text(`${d.name}: $${d.value.toLocaleString()}`, 20, y); y += 7;
    });

    doc.save("my-independence-budget.pdf");
  };

  const NumberInput = ({ fieldKey, label }) => (
    <div>
      <label className="text-sm font-medium text-muted-foreground block mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
        <input
          type="number"
          min="0"
          value={values[fieldKey] || ""}
          onChange={(e) => update(fieldKey, e.target.value)}
          className="w-full pl-8 pr-4 py-3 rounded-xl border border-input bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero
        eyebrow="Section 5 · The Centrepiece"
        title="Interactive Budget Calculator"
        subtitle="Build your real monthly budget. Charts and advice update live as you type."
      />

      <div className="grid lg:grid-cols-[1fr_minmax(340px,420px)] gap-6">
        {/* Input stack */}
        <div className="space-y-6">
          {/* Income */}
          <Reveal>
            <div className="safety-card border border-border/50 p-6 md:p-7">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-success" /> Monthly Income</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {incomeFields.map((f) => <NumberInput key={f.key} fieldKey={f.key} label={f.label} />)}
              </div>
            </div>
          </Reveal>

          {/* Expenses */}
          {expenseGroups.map((group, gi) => (
            <Reveal key={group.name} delay={gi * 0.03}>
              <div className="safety-card border border-border/50 p-6 md:p-7">
                <h3 className="text-lg font-bold mb-4">{group.name}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {group.items.map((item) => <NumberInput key={item.key} fieldKey={item.key} label={item.label} />)}
                </div>
              </div>
            </Reveal>
          ))}

          <div className="flex flex-wrap gap-3">
            <Button onClick={reset} variant="outline" className="rounded-xl"><RotateCcw className="w-4 h-4 mr-1.5" /> Reset Budget</Button>
            <Button onClick={download} className="rounded-xl"><Download className="w-4 h-4 mr-1.5" /> Download Budget Summary</Button>
          </div>
        </div>

        {/* Live results - sticky */}
        <div className="lg:sticky lg:top-24 h-fit space-y-5" ref={resultsRef}>
          <Reveal>
            <div className={`safety-card border-2 p-6 md:p-7 ${isHealthy ? "border-success/40" : "border-destructive/40"}`}>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Remaining Money</p>
              <motion.p key={totals.remaining} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl font-bold ${isHealthy ? "text-success" : "text-destructive"}`}>
                ${totals.remaining.toLocaleString()}
              </motion.p>
              <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${isHealthy ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                {isHealthy ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {isHealthy ? "Under budget" : "Spending exceeds income"}
              </div>
            </div>
          </Reveal>

          {/* KPIs */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-3 gap-3">
              <div className="safety-card border border-border/50 p-4 text-center">
                <p className="text-xs text-muted-foreground">Income</p>
                <p className="font-bold text-sm sm:text-base">${totals.income.toLocaleString()}</p>
              </div>
              <div className="safety-card border border-border/50 p-4 text-center">
                <p className="text-xs text-muted-foreground">Expenses</p>
                <p className="font-bold text-sm sm:text-base">${totals.expenses.toLocaleString()}</p>
              </div>
              <div className="safety-card border border-border/50 p-4 text-center">
                <p className="text-xs text-muted-foreground">Save %</p>
                <p className={`font-bold text-sm sm:text-base ${totals.savingsRate >= 20 ? "text-success" : "text-warning"}`}>{totals.savingsRate}%</p>
              </div>
            </div>
          </Reveal>

          {/* Pie chart */}
          {pieData.length > 0 && (
            <Reveal delay={0.1}>
              <div className="safety-card border border-border/50 p-6">
                <h4 className="font-bold mb-4 text-sm">Expense Breakdown</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Reveal>
          )}

          {/* Bar chart */}
          <Reveal delay={0.15}>
            <div className="safety-card border border-border/50 p-6">
              <h4 className="font-bold mb-4 text-sm">Income vs Expenses</h4>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    <Cell fill="#0052CC" />
                    <Cell fill={isHealthy ? "#00875A" : "#E5484D"} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          {/* Advice */}
          <Reveal delay={0.2}>
            <div className={`safety-card border p-6 ${isHealthy ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
              <div className="flex items-start gap-3">
                {isHealthy ? <TrendingUp className="w-5 h-5 text-success shrink-0 mt-0.5" /> : <TrendingDown className="w-5 h-5 text-destructive shrink-0 mt-0.5" />}
                <div>
                  <h4 className="font-bold mb-1 text-sm">Personalised Advice</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{advice}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}