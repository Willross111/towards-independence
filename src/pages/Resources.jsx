import React from "react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Landmark, HeartPulse, LifeBuoy, FileText, Car, ExternalLink, Briefcase, GraduationCap, BookOpen
} from "lucide-react";

const resources = [
  { icon: Landmark, name: "Services Australia", desc: "Government payments and services including Centrelink and Medicare.", url: "https://www.servicesaustralia.gov.au", color: "from-blue-100 to-accent" },
  { icon: HeartPulse, name: "Medicare", desc: "Public health insurance — enrol, claim and find providers.", url: "https://www.servicesaustralia.gov.au/medicare", color: "from-emerald-100 to-green-50" },
  { icon: Landmark, name: "Centrelink", desc: "Financial support, payments and employment services.", url: "https://www.servicesaustralia.gov.au/centrelink", color: "from-amber-100 to-orange-50" },
  { icon: FileText, name: "NSW Births Deaths & Marriages", desc: "Birth certificates, name changes and life event registrations.", url: "https://www.nsw.gov.au/births-deaths-marriages", color: "from-violet-100 to-purple-50" },
  { icon: Car, name: "Transport for NSW", desc: "Opal cards, timetables, roads and transport planning.", url: "https://www.transport.nsw.gov.au", color: "from-sky-100 to-cyan-50" },
  { icon: HeartPulse, name: "Headspace", desc: "Youth mental health support and counselling (12–25).", url: "https://headspace.org.au", color: "from-rose-100 to-pink-50" },
  { icon: LifeBuoy, name: "Beyond Blue", desc: "Support for depression, anxiety and mental wellbeing.", url: "https://www.beyondblue.org.au", color: "from-sky-100 to-blue-50" },
  { icon: LifeBuoy, name: "Lifeline", desc: "24/7 crisis support — call 13 11 14.", url: "https://www.lifeline.org.au", color: "from-rose-100 to-red-50" },
  { icon: BookOpen, name: "MoneySmart", desc: "ASIC's free, independent money guidance and calculators.", url: "https://moneysmart.gov.au", color: "from-emerald-100 to-teal-50" },
  { icon: Briefcase, name: "SEEK", desc: "Australia's largest job search platform.", url: "https://www.seek.com.au", color: "from-blue-100 to-indigo-50" },
  { icon: Briefcase, name: "Indeed", desc: "Global job search with salary insights.", url: "https://au.indeed.com", color: "from-violet-100 to-fuchsia-50" },
  { icon: GraduationCap, name: "TAFE NSW", desc: "Vocational courses, certificates and apprenticeship training.", url: "https://www.tafensw.edu.au", color: "from-amber-100 to-yellow-50" },
];

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero
        eyebrow="Section 8"
        title="Resources"
        subtitle="Every official government and support link you need, in one place."
      />

      <Reveal>
        <SectionHeader eyebrow="Quick Links" title="Official websites" subtitle="Tap any card to visit the official source directly." align="center" icon={BookOpen} />
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.04}>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="block safety-card border border-border/50 p-6 h-full transition-all duration-300 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,82,204,0.10)]">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-4`}>
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{r.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm">
                Visit Website <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 safety-card border border-border/50 p-6 md:p-8 bg-accent/30 text-center">
          <p className="text-lg font-semibold mb-2">In an emergency, always call 000.</p>
          <p className="text-muted-foreground">For mental health crises, Lifeline is available 24/7 on 13 11 14.</p>
        </div>
      </Reveal>
    </div>
  );
}