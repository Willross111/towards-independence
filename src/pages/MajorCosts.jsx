import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import ExpandableCard from "@/components/ExpandableCard";
import InfoCard from "@/components/InfoCard";
import EmergencySavingsCalculator from "@/components/EmergencySavingsCalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Home, Lightbulb, ShoppingCart, Shield, Smartphone, AlertTriangle,
  Car, Wrench, Smartphone as Phone, Stethoscope, ArrowRight, Receipt, Zap, Droplet, Flame, Wifi,
  Apple, Tag, CalendarDays, Salad, Wallet, HeartPulse, Package, Shirt, Clapperboard, Dumbbell, Tv, Scissors, ShowerHead, Sparkles
} from "lucide-react";

const costBreakdown = [
  { icon: Home, title: "Housing", desc: "Rent, bond, utilities and internet — usually your biggest expense." },
  { icon: Zap, title: "Utilities", desc: "Electricity, gas, water and internet — with money-saving tips." },
  { icon: ShoppingCart, title: "Groceries", desc: "Smart shopping keeps your food budget healthy." },
  { icon: Shield, title: "Insurance", desc: "Health, contents and car insurance — protect what matters." },
  { icon: Smartphone, title: "Personal Expenses", desc: "Phone, clothing, entertainment and more." },
  { icon: AlertTriangle, title: "Emergency Fund", desc: "A buffer for life's surprises." },
];

const utilityTips = [
  "Compare providers annually — energy plans change and better deals appear often.",
  "Switch off appliances at the wall to avoid standby power drain.",
  "Use cold water for washing clothes and short showers to save on hot water.",
  "Set your heater to 18–20°C and air con to 24–26°C for efficiency.",
  "Bundle internet with energy if a provider offers a discount.",
];

const groceryTips = [
  { icon: CalendarDays, tip: "Plan your meals for the week before you shop." },
  { icon: Tag, tip: "Choose home-brand staples — they're often made by the same manufacturers." },
  { icon: Receipt, tip: "Check catalogues and buy specials in bulk where possible." },
  { icon: Salad, tip: "Buy seasonal produce — it's cheaper and fresher." },
  { icon: Apple, tip: "Cook in batches and freeze portions to reduce waste and takeaway." },
];

const insuranceTypes = [
  { icon: HeartPulse, title: "Health Insurance", desc: "Medicare covers most needs. Private cover (from ~$1,000/yr) speeds up elective treatment.", cost: "~$0–$1,000+/yr" },
  { icon: Package, title: "Contents Insurance", desc: "Covers your belongings against theft, fire and damage in a rental.", cost: "~$250–$500/yr" },
  { icon: Car, title: "Car Insurance", desc: "Compulsory (CTP/Green Slip) plus optional comprehensive cover.", cost: "~$800–$1,500+/yr" },
];

const personalItems = [
  { id: "phone", label: "Phone & Plan", icon: Smartphone, type: "need" },
  { id: "clothing", label: "Essential Clothing", icon: Shirt, type: "need" },
  { id: "toiletries", label: "Toiletries", icon: ShowerHead, type: "need" },
  { id: "haircut", label: "Haircuts", icon: Scissors, type: "need" },
  { id: "gym", label: "Gym Membership", icon: Dumbbell, type: "want" },
  { id: "streaming", label: "Streaming Services", icon: Tv, type: "want" },
  { id: "entertainment", label: "Nights Out", icon: Clapperboard, type: "want" },
  { id: "luxury", label: "Designer Fashion", icon: Sparkles, type: "want" },
];

const emergencyExamples = [
  { icon: Wrench, label: "Car Repairs", cost: "$500–$2,000" },
  { icon: Stethoscope, label: "Medical Bills", cost: "$200–$2,000" },
  { icon: Smartphone, label: "Broken Phone", cost: "$300–$1,500" },
  { icon: AlertTriangle, label: "Job Loss", cost: "1–3 months income" },
];

function NeedsVsWants() {
  const [items, setItems] = useState(personalItems);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updated = [...items];
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    // toggle type based on destination droppable
    if (result.destination.droppableId === "needs") moved.type = "need";
    if (result.destination.droppableId === "wants") moved.type = "want";
    setItems(updated);
  };

  const needs = items.filter((i) => i.type === "need");
  const wants = items.filter((i) => i.type === "want");

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-2 gap-5">
        <Droppable droppableId="needs">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`rounded-3xl p-6 border-2 border-dashed transition-colors min-h-[280px] ${snapshot.isDraggingOver ? "border-success bg-success/5" : "border-success/30 bg-white"}`}
            >
              <h4 className="font-bold text-success mb-1 flex items-center gap-2"><Wallet className="w-5 h-5" /> Needs</h4>
              <p className="text-sm text-muted-foreground mb-4">Essentials for daily life. Drag items here.</p>
              <div className="space-y-2">
                {needs.map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(p, s) => (
                      <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} className={`flex items-center gap-3 bg-white rounded-xl p-3 border border-border cursor-grab active:cursor-grabbing ${s.isDragging ? "shadow-lg" : ""}`}>
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
        <Droppable droppableId="wants">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`rounded-3xl p-6 border-2 border-dashed transition-colors min-h-[280px] ${snapshot.isDraggingOver ? "border-warning bg-warning/5" : "border-warning/30 bg-white"}`}
            >
              <h4 className="font-bold text-warning mb-1 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Wants</h4>
              <p className="text-sm text-muted-foreground mb-4">Nice-to-haves. Drag items here.</p>
              <div className="space-y-2">
                {wants.map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(p, s) => (
                      <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} className={`flex items-center gap-3 bg-white rounded-xl p-3 border border-border cursor-grab active:cursor-grabbing ${s.isDragging ? "shadow-lg" : ""}`}>
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default function MajorCosts() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero
        eyebrow="Section 4"
        title="Major Costs"
        subtitle="Understand where your money goes — and how to keep more of it."
        image="https://media.base44.com/images/public/6a615183b04ed3564f9b9ec9/e786b7b9f_generated_d6f35262.png"
      />

      {/* Breakdown overview */}
      <Reveal>
        <SectionHeader eyebrow="Cost Breakdown" title="Six categories that shape your budget" align="center" icon={Wallet} />
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {costBreakdown.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.04}>
            <InfoCard icon={c.icon} title={c.title}>{c.desc}</InfoCard>
          </Reveal>
        ))}
      </div>

      {/* Housing */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Housing" title="Rent, bond & utilities" icon={Home} />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Home, label: "Rent", val: "$380–$720/mo", note: "Share vs living alone" },
              { icon: Receipt, label: "Bond", val: "4 weeks rent", note: "Upfront, refundable" },
              { icon: Zap, label: "Electricity", val: "$120–$200/mo", note: "Higher in summer/winter" },
              { icon: Flame, label: "Gas", val: "$40–$90/mo", note: "Cooking & heating" },
              { icon: Droplet, label: "Water", val: "$0–$60/mo", note: "Sometimes included in rent" },
              { icon: Wifi, label: "Internet", val: "$70–$90/mo", note: "NBN standard plan" },
              { icon: Home, label: "Urban (Sydney)", val: "Higher rent", note: "But better transport access" },
              { icon: Home, label: "Regional NSW", val: "Lower rent", note: "But may need a car" },
            ].map((c) => (
              <div key={c.label} className="safety-card border border-border/50 p-5">
                <c.icon className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className="font-bold text-lg">{c.val}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Utilities tips */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Utilities" title="Money-saving tips" icon={Lightbulb} />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="grid sm:grid-cols-2 gap-4">
            {utilityTips.map((tip) => (
              <div key={tip} className="safety-card border border-border/50 p-5 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Groceries */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Groceries" title="Eat well on a budget" icon={ShoppingCart} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groceryTips.map((g, i) => (
            <Reveal key={g.tip} delay={i * 0.04}>
              <div className="safety-card border border-border/50 p-5 h-full">
                <g.icon className="w-6 h-6 text-primary mb-3" />
                <p className="text-sm">{g.tip}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Insurance */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Insurance" title="Protect what matters" icon={Shield} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {insuranceTypes.map((ins, i) => (
            <Reveal key={ins.title} delay={i * 0.05}>
              <div className="safety-card border border-border/50 p-6 h-full">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <ins.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{ins.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{ins.desc}</p>
                <p className="text-sm font-semibold text-primary">{ins.cost}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Needs vs Wants */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Personal Expenses" title="Needs vs Wants" subtitle="Drag and drop each expense into the right column. Understanding the difference is the key to smart spending." align="center" icon={Smartphone} />
        </Reveal>
        <Reveal delay={0.1}>
          <NeedsVsWants />
        </Reveal>
      </section>

      {/* Emergency fund */}
      <section className="mb-8">
        <Reveal>
          <SectionHeader eyebrow="Emergency Fund" title="Plan for the unexpected" subtitle="Life throws surprises. Here's what they might cost — and how to prepare." align="center" icon={AlertTriangle} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {emergencyExamples.map((e, i) => (
            <Reveal key={e.label} delay={i * 0.04}>
              <div className="safety-card border border-border/50 p-5 text-center">
                <e.icon className="w-8 h-8 text-rose-500 mx-auto mb-3" />
                <p className="font-semibold mb-1">{e.label}</p>
                <p className="text-sm text-muted-foreground">{e.cost}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="max-w-xl mx-auto">
            <EmergencySavingsCalculator />
          </div>
        </Reveal>
        <Reveal>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="rounded-2xl h-14 px-8"><Link to="/budget-calculator">Build Your Budget <ArrowRight className="w-5 h-5 ml-1.5" /></Link></Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}