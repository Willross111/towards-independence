import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import InfoCard from "@/components/InfoCard";
import ExpandableCard from "@/components/ExpandableCard";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Wallet, Clock, UtensilsCrossed, Sparkles, ReceiptText, Briefcase, HeartPulse,
  GraduationCap, CalendarClock, ShieldCheck, ArrowRight, Banknote, TrendingDown,
  PiggyBank, AlertTriangle, ExternalLink, MapPin, Train, ShieldAlert, Users, Wifi, Scale, Brain, Stethoscope
} from "lucide-react";

const skills = [
  { icon: Wallet, title: "Budgeting", desc: "Track income and expenses so you always know what you can spend." },
  { icon: Clock, title: "Time Management", desc: "Balance work, study, chores and rest with a weekly routine." },
  { icon: UtensilsCrossed, title: "Cooking", desc: "Master a handful of simple, affordable meals to save money." },
  { icon: Sparkles, title: "Cleaning", desc: "Keep on top of dishes, laundry and surfaces with a basic roster." },
  { icon: ReceiptText, title: "Paying Bills", desc: "Set up direct debits and never miss a due date." },
  { icon: Briefcase, title: "Employment", desc: "Secure income through part-time or full-time work." },
  { icon: HeartPulse, title: "Health", desc: "Register with a GP and look after your physical and mental wellbeing." },
  { icon: GraduationCap, title: "Education", desc: "Keep studying or upskilling to grow your future earning power." },
  { icon: CalendarClock, title: "Building Routines", desc: "Consistent sleep, meals and exercise keep you grounded." },
  { icon: ShieldCheck, title: "Personal Safety", desc: "Lock doors, know your emergency contacts and trust your instincts." },
];

const moneyFlow = [
  { icon: Banknote, label: "Income", desc: "Job, allowance, scholarships", color: "bg-primary/10 text-primary" },
  { icon: TrendingDown, label: "Fixed Expenses", desc: "Rent, bills, insurance", color: "bg-amber-100 text-amber-700" },
  { icon: Wallet, label: "Variable Expenses", desc: "Groceries, transport, fun", color: "bg-violet-100 text-violet-700" },
  { icon: PiggyBank, label: "Savings", desc: "Goals & future plans", color: "bg-emerald-100 text-emerald-700" },
  { icon: AlertTriangle, label: "Emergency Fund", desc: "Unexpected costs only", color: "bg-rose-100 text-rose-700" },
];

const jobs = [
  { title: "Retail", skills: "Customer service, cash handling, communication", qual: "No formal qualification needed", where: "On-the-job training", icon: Briefcase },
  { title: "Hospitality", skills: "Teamwork, multitasking, food safety", qual: "RSA certificate (for alcohol service)", where: "TAFE / on-the-job", icon: UtensilsCrossed },
  { title: "Trades", skills: "Practical problem-solving, manual dexterity", qual: "Certificate III (Apprenticeship)", where: "TAFE / Apprenticeships", icon: ShieldCheck },
  { title: "Apprenticeships", skills: "Dedication, hands-on learning", qual: "Year 10 minimum, trade specific", where: "Apprenticeships.gov.au", icon: GraduationCap },
  { title: "Office Jobs", skills: "Computer literacy, organisation, communication", qual: "Cert III/IV in Business or similar", where: "TAFE / short courses", icon: Briefcase },
  { title: "University Pathways", skills: "Research, writing, critical thinking", qual: "ATAR or pathway entry", where: "University + Careers services", icon: GraduationCap },
];

const jobLinks = [
  { label: "SEEK", url: "https://www.seek.com.au" },
  { label: "Indeed", url: "https://au.indeed.com" },
  { label: "TAFE NSW", url: "https://www.tafensw.edu.au" },
  { label: "Apprenticeships", url: "https://www.australianapprenticeships.gov.au" },
];

const accomFactors = [
  { icon: Wallet, title: "Cost", desc: "Can you comfortably afford rent plus bills?" },
  { icon: MapPin, title: "Location", desc: "Close to work, study and essentials." },
  { icon: ShieldCheck, title: "Safety", desc: "Research the area's safety and security." },
  { icon: Train, title: "Transport", desc: "Reliable access to public transport." },
  { icon: Briefcase, title: "Work", desc: "Reasonable commute to your workplace." },
  { icon: GraduationCap, title: "University", desc: "Near campus if you're studying." },
  { icon: Users, title: "Friends & Community", desc: "Social support close by." },
  { icon: Wifi, title: "Internet", desc: "Check NBN availability and speed." },
  { icon: ShieldAlert, title: "Crime Rates", desc: "Check NSW Crime Statistics." },
];

const healthTopics = [
  { icon: UtensilsCrossed, title: "Healthy Eating", desc: "Plan meals, cook at home and keep balanced." },
  { icon: HeartPulse, title: "Exercise", desc: "Aim for 30 minutes of activity most days." },
  { icon: Clock, title: "Sleep", desc: "7–9 hours a night supports mental health." },
  { icon: Brain, title: "Stress", desc: "Try mindfulness, breaks and talking to someone." },
  { icon: HeartPulse, title: "Mental Health", desc: "It's okay to ask for help — see support services." },
  { icon: Stethoscope, title: "GP Visits", desc: "Register with a bulk-billing GP near you." },
];

export default function LivingIndependently() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero
        eyebrow="Section 1"
        title="Living Independently"
        subtitle="What it really means to run your own life — the everyday skills, money habits and health routines that make independence work."
        image="https://media.base44.com/images/public/6a615183b04ed3564f9b9ec9/e761d1941_generated_e9ecc89b.png"
      />

      {/* What it means */}
      <Reveal>
        <SectionHeader eyebrow="The Big Picture" title="What does living independently mean?" />
        <div className="safety-card border border-border/50 p-6 md:p-8 mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Living independently means taking full responsibility for your daily life — managing your own money, securing
            a place to live, paying bills, cooking, cleaning and looking after your physical and mental health. It's
            about freedom and choice, but it also requires planning, skills and reliable income. The good news? Every
            skill below can be learned and practised before you move out.
          </p>
        </div>
      </Reveal>

      {/* Skills grid */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Core Skills" title="Ten skills you'll rely on every day" subtitle="Click any card to learn more." align="center" />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <ExpandableCard title={s.title} subtitle={s.desc} icon={s.icon}>
                <p>Start small and build consistency. Practise this skill while you're still at home so it feels natural once you move out. Use the Budget Calculator and other tools on this site to support you.</p>
                <div className="flex gap-2 flex-wrap pt-2">
                  <Link to="/budget-calculator" className="text-primary font-semibold text-sm inline-flex items-center gap-1">Try the Budget Calculator <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </ExpandableCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Personal Budget flow */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Personal Budget" title="How money flows through your life" subtitle="Money comes in as income and flows out to fixed and variable costs. What's left builds your savings and emergency fund." align="center" icon={Wallet} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="safety-card border border-border/50 p-6 md:p-10">
            <div className="grid md:grid-cols-5 gap-4">
              {moneyFlow.map((m, i) => (
                <div key={m.label} className="relative">
                  <div className="rounded-2xl p-5 h-full">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${m.color}`}>
                      <m.icon className="w-6 h-6" />
                    </div>
                    <p className="font-bold">{m.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                  </div>
                  {i < moneyFlow.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {[
              { icon: Banknote, t: "Income", d: "Money coming in from jobs, allowances or scholarships." },
              { icon: TrendingDown, t: "Fixed Expenses", d: "Bills that stay roughly the same each month — rent, internet, insurance." },
              { icon: Wallet, t: "Variable Expenses", d: "Costs that change — groceries, transport, entertainment." },
              { icon: PiggyBank, t: "Savings & Emergency Fund", d: "A buffer for goals and unexpected costs like car repairs or job loss." },
            ].map((c) => (
              <InfoCard key={c.t} icon={c.icon} title={c.t}>{c.d}</InfoCard>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Jobs */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Jobs" title="Where young people earn income" subtitle="Different jobs suit different goals. Here's what each involves and where to gain the skills." align="center" icon={Briefcase} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.05}>
              <div className="safety-card border border-border/50 p-6 h-full hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <j.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{j.title}</h3>
                <dl className="space-y-2 text-sm">
                  <div><dt className="font-semibold">Skills needed:</dt><dd className="text-muted-foreground">{j.skills}</dd></div>
                  <div><dt className="font-semibold">Qualifications:</dt><dd className="text-muted-foreground">{j.qual}</dd></div>
                  <div><dt className="font-semibold">Where to gain:</dt><dd className="text-muted-foreground">{j.where}</dd></div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {jobLinks.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-2xl">
                  {l.label} <ExternalLink className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Choosing accommodation factors */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Choosing Accommodation" title="What to consider before you sign" subtitle="Expand each factor to think it through. Compare full housing options in the Accommodation section." align="center" icon={Scale} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {accomFactors.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.03}>
              <ExpandableCard title={f.title} subtitle={f.desc} icon={f.icon}>
                <p>Head to the <Link to="/accommodation" className="text-primary font-semibold">Accommodation section</Link> to compare renting, sharing, buying and more against these factors.</p>
              </ExpandableCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="rounded-2xl h-14 px-8"><Link to="/accommodation">Compare Housing Options <ArrowRight className="w-5 h-5 ml-1.5" /></Link></Button>
          </div>
        </Reveal>
      </section>

      {/* Health */}
      <section className="mb-8">
        <Reveal>
          <SectionHeader eyebrow="Physical & Mental Health" title="Looking after yourself" subtitle="Independence is easier when you feel good. Build these habits early." align="center" icon={HeartPulse} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {healthTopics.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.04}>
              <InfoCard icon={h.icon} title={h.title}>{h.desc}</InfoCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="safety-card border border-border/50 p-6 md:p-8 mt-8 bg-accent/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Need support with your mental health?</h3>
                <p className="text-muted-foreground">Free, confidential services are available 24/7.</p>
              </div>
              <Button asChild size="lg" className="rounded-2xl shrink-0"><Link to="/support-services">View Support Services <ArrowRight className="w-5 h-5 ml-1.5" /></Link></Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}