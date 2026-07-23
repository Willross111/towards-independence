import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import NavTile from "@/components/NavTile";
import ReadinessQuiz from "@/components/ReadinessQuiz";
import CostOfLivingEstimator from "@/components/CostOfLivingEstimator";
import {
  ArrowRight, Home as HomeIcon, IdCard, LifeBuoy, Wallet, Calculator,
  Building2, Car, BookOpen, ClipboardCheck, BarChart3, ListChecks, Landmark, Sparkles
} from "lucide-react";

const heroImage = "https://media.base44.com/images/public/6a615183b04ed3564f9b9ec9/e761d1941_generated_e9ecc89b.png";

const navSections = [
  { to: "/living-independently", title: "Living Independently", desc: "Budgeting, routines, jobs, health & daily skills", icon: HomeIcon, accent: "blue" },
  { to: "/identification", title: "Identification", desc: "Medicare, birth certificate & photo ID step-by-step", icon: IdCard, accent: "green" },
  { to: "/support-services", title: "Support Services", desc: "Centrelink, housing, health & financial help", icon: LifeBuoy, accent: "sky" },
  { to: "/major-costs", title: "Major Costs", desc: "Rent, groceries, insurance & needs vs wants", icon: Wallet, accent: "amber" },
  { to: "/budget-calculator", title: "Budget Calculator", desc: "Build your monthly budget with live charts", icon: Calculator, accent: "blue" },
  { to: "/accommodation", title: "Accommodation", desc: "Compare renting, sharing, buying & more", icon: Building2, accent: "violet" },
  { to: "/transport", title: "Transport", desc: "Compare travel options & car ownership costs", icon: Car, accent: "rose" },
  { to: "/resources", title: "Resources", desc: "All official government links in one place", icon: BookOpen, accent: "sky" },
];

const features = [
  { icon: Calculator, title: "Interactive Budget Calculator", desc: "Track income and expenses with live charts and personalised advice." },
  { icon: BarChart3, title: "Accommodation Comparison", desc: "Filter and compare every housing option side-by-side." },
  { icon: Wallet, title: "Cost of Living Estimator", desc: "See realistic monthly costs for Sydney or regional NSW." },
  { icon: ListChecks, title: "Readiness Checklist", desc: "Take the quiz and get a personalised independence roadmap." },
  { icon: Landmark, title: "Helpful Government Resources", desc: "Direct links to Medicare, Centrelink, MoneySmart and more." },
  { icon: Sparkles, title: "Emergency Savings Planner", desc: "Calculate your 3–6 month safety buffer in seconds." },
];

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[42rem] h-[42rem] bg-primary/8 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent/60 rounded-full blur-3xl translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> Year 10 Commerce · NSW
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] text-balance">
              Towards Independence
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 text-lg md:text-xl text-muted-foreground max-w-lg">
              Your complete guide to living independently (18–25 years). Budget smarter, understand the real costs, and build the confidence to move out on your own.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-2xl h-14 px-8 text-base">
                <Link to="/living-independently">Start Exploring <ArrowRight className="w-5 h-5 ml-1" /></Link>
              </Button>
              <Button onClick={() => setQuizOpen(true)} variant="outline" size="lg" className="rounded-2xl h-14 px-8 text-base">
                <ClipboardCheck className="w-5 h-5 mr-1.5" /> Take the Readiness Quiz
              </Button>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div className="animate-float">
              <Image src={heroImage} alt="A young adult moving into their first apartment" className="w-full max-w-md mx-auto aspect-square rounded-[32px]" fittingType="fit" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation matrix */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <Reveal>
          <SectionHeader eyebrow="Explore the Guide" title="Everything you need, mapped out" subtitle="Eight focused sections take you from getting your ID to building a real budget." align="center" />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {navSections.map((s, i) => (
            <NavTile key={s.to} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <Reveal>
          <SectionHeader eyebrow="Website Features" title="Interactive tools, not just text" subtitle="Learn by doing — every calculator and comparison works right on the page." align="center" icon={Sparkles} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="safety-card border border-border/50 p-6 md:p-7 h-full transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(0,82,204,0.10)]">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cost of Living Estimator */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <Reveal>
          <SectionHeader eyebrow="Try It Now" title="Cost of Living Estimator" subtitle="See realistic monthly living costs for Sydney or regional NSW — shared or solo." align="center" icon={Wallet} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <CostOfLivingEstimator />
          </div>
        </Reveal>
      </section>

      {/* CTA banner */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[hsl(216,75%,15%)] text-white p-8 md:p-14">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to find out how prepared you are?</h2>
              <p className="mt-3 text-white/70 text-lg">Answer 8 quick questions and get a personalised score plus a roadmap of what to work on first.</p>
              <Button onClick={() => setQuizOpen(true)} size="lg" className="mt-6 rounded-2xl h-14 px-8 text-base bg-white text-[hsl(216,75%,15%)] hover:bg-white/90">
                <ClipboardCheck className="w-5 h-5 mr-2" /> Start the Quiz
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <ReadinessQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}