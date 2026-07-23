import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  LifeBuoy, ExternalLink, Users, Clock, HelpCircle, ArrowRight, RotateCcw,
  Landmark, HeartPulse, Home, Scale, Building2, Stethoscope
} from "lucide-react";

const services = [
  {
    icon: Landmark, name: "Centrelink", what: "Government financial support payments and services.", who: "Australian residents meeting eligibility criteria.", when: "When you need income support, studying, or between jobs.",
    url: "https://www.servicesaustralia.gov.au/centrelink", color: "from-blue-100 to-accent",
  },
  {
    icon: Users, name: "Youth Allowance", what: "Financial help for young people studying, training or looking for work.", who: "Aged 16–24, studying an approved course or job seeking.", when: "While studying full-time, doing an apprenticeship, or job hunting.",
    url: "https://www.servicesaustralia.gov.au/youth-allowance", color: "from-emerald-100 to-green-50",
  },
  {
    icon: Home, name: "Rent Assistance", what: "Extra financial help with rent costs.", who: "Receiving an eligible Centrelink payment and paying rent above a threshold.", when: "When rent is putting pressure on your budget.",
    url: "https://www.servicesaustralia.gov.au/rent-assistance", color: "from-amber-100 to-orange-50",
  },
  {
    icon: HeartPulse, name: "Headspace", what: "Free youth mental health support and counselling.", who: "Young people aged 12–25.", when: "When you're feeling stressed, anxious or down and want to talk.",
    url: "https://headspace.org.au", color: "from-violet-100 to-purple-50",
  },
  {
    icon: HeartPulse, name: "Beyond Blue", what: "Information and support for depression and anxiety.", who: "Anyone in Australia, any age.", when: "When you or someone you know is struggling with mental health.",
    url: "https://www.beyondblue.org.au", color: "from-sky-100 to-cyan-50",
  },
  {
    icon: LifeBuoy, name: "Lifeline", what: "24/7 crisis support and suicide prevention.", who: "Anyone experiencing a personal crisis.", when: "In an emotional emergency — call 13 11 14 anytime.",
    url: "https://www.lifeline.org.au", color: "from-rose-100 to-pink-50",
  },
  {
    icon: Home, name: "Housing Assistance", who: "People at risk of or experiencing homelessness.", what: "Help finding emergency, social or affordable housing.", when: "If you're facing eviction or have nowhere safe to stay.",
    url: "https://www.facs.nsw.gov.au/housing", color: "from-blue-100 to-indigo-50",
  },
  {
    icon: Scale, name: "Financial Counselling", what: "Free, independent help managing debt and money problems.", who: "Anyone in financial difficulty.", when: "When debts are overwhelming or you need budget help.",
    url: "https://ndh.org.au", color: "from-emerald-100 to-teal-50",
  },
  {
    icon: Scale, name: "Legal Aid", what: "Free legal advice and representation for those who can't afford it.", who: "People facing legal issues who meet means tests.", when: "For tenancy disputes, fines, family or criminal matters.",
    url: "https://www.legalaid.nsw.gov.au", color: "from-violet-100 to-fuchsia-50",
  },
  {
    icon: Building2, name: "Community Centres", what: "Local support, activities and referral services.", who: "Anyone in the local community.", when: "When you need local connections or a referral.",
    url: "https://www.nsw.gov.au/community-services", color: "from-amber-100 to-yellow-50",
  },
  {
    icon: Stethoscope, name: "Local GP", what: "General health care, scripts and referrals to specialists.", who: "Everyone — register with a clinic near you.", when: "For everyday health concerns and preventative care.",
    url: "https://www.healthdirect.gov.au", color: "from-sky-100 to-blue-50",
  },
];

// Decision tree
const tree = {
  q: "What kind of help are you looking for?",
  options: [
    { label: "Money & income", next: { q: "Are you currently studying or looking for work?", options: [
      { label: "Studying / apprenticeship", recommend: ["Youth Allowance", "Rent Assistance"] },
      { label: "Looking for work", recommend: ["Centrelink", "Financial Counselling"] },
    ]}},
    { label: "Housing", next: { q: "Is it urgent (no safe place tonight)?", options: [
      { label: "Yes, urgent", recommend: ["Housing Assistance", "Lifeline"] },
      { label: "Not urgent", recommend: ["Rent Assistance", "Financial Counselling"] },
    ]}},
    { label: "Mental health", next: { q: "Is it a crisis right now?", options: [
      { label: "Yes — crisis", recommend: ["Lifeline", "Beyond Blue"] },
      { label: "No, but I need support", recommend: ["Headspace", "Beyond Blue", "Local GP"] },
    ]}},
    { label: "Legal or debt", next: { q: "What do you need?", options: [
      { label: "Legal advice", recommend: ["Legal Aid"] },
      { label: "Help with debt", recommend: ["Financial Counselling"] },
    ]}},
  ],
};

function findService(name) {
  return services.find((s) => s.name === name);
}

function DecisionTree() {
  const [path, setPath] = useState([]);
  const [result, setResult] = useState(null);

  const current = path.length === 0 ? tree : path.reduce((acc, idx) => acc.options[idx].next, tree);
  const atQuestion = current && current.q;
  const recommendations = result;

  const choose = (i) => {
    const next = current.options[i];
    if (next.next) {
      setPath([...path, i]);
    } else {
      setResult(next.recommend);
    }
  };

  const reset = () => { setPath([]); setResult(null); };

  return (
    <div className="safety-card border border-border/50 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Need Help? Decision Tree</h3>
          <p className="text-muted-foreground text-sm">Answer a couple of questions and we'll point you to the right service.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!recommendations && atQuestion && (
          <motion.div key={current.q} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-lg font-semibold mb-4">{current.q}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {current.options.map((opt, i) => (
                <button key={opt.label} onClick={() => choose(i)} className="py-4 px-5 rounded-2xl bg-muted hover:bg-accent text-left font-medium transition-colors flex items-center justify-between">
                  {opt.label} <ArrowRight className="w-4 h-4 text-primary" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {recommendations && (
          <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="text-lg font-semibold mb-4">Recommended services for you:</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {recommendations.map((name) => {
                const s = findService(name);
                return s ? (
                  <div key={name} className="rounded-2xl border border-border/60 p-4">
                    <p className="font-bold mb-1">{s.name}</p>
                    <p className="text-sm text-muted-foreground mb-3">{s.what}</p>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="rounded-xl">Visit Website <ExternalLink className="w-3.5 h-3.5 ml-1" /></Button>
                    </a>
                  </div>
                ) : null;
              })}
            </div>
            <Button onClick={reset} variant="outline" className="rounded-xl"><RotateCcw className="w-4 h-4 mr-1.5" /> Start Over</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportServices() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero
        eyebrow="Section 3"
        title="Support Services"
        subtitle="You're never on your own. Here's every service available to help you through the tough parts."
        image="https://media.base44.com/images/public/6a615183b04ed3564f9b9ec9/d3b53bc4b_generated_f3be2a25.png"
      />

      {/* Decision tree */}
      <Reveal>
        <SectionHeader eyebrow="Not Sure Where to Start?" title="Let's find the right help" align="center" icon={HelpCircle} />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mb-16">
          <DecisionTree />
        </div>
      </Reveal>

      {/* Service cards */}
      <Reveal>
        <SectionHeader eyebrow="Support Directory" title="Services at a glance" subtitle="Each card explains what it does, who can access it, and when to use it." align="center" icon={LifeBuoy} />
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.04}>
            <div className="safety-card border border-border/50 p-6 h-full flex flex-col transition-all duration-300 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,82,204,0.10)]">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3">{s.name}</h3>
              <div className="space-y-3 text-sm flex-1">
                <div>
                  <p className="font-semibold text-muted-foreground/80 flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5" /> What it does</p>
                  <p className="mt-0.5">{s.what}</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground/80 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Who can access</p>
                  <p className="mt-0.5">{s.who}</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground/80 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> When to use</p>
                  <p className="mt-0.5">{s.when}</p>
                </div>
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-5">
                <Button className="rounded-xl w-full">Visit Website <ExternalLink className="w-4 h-4 ml-1.5" /></Button>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}