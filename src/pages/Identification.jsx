import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  IdCard, FileText, CreditCard, CheckCircle2, Clock, DollarSign, ExternalLink,
  ChevronRight, AlertCircle, Download, KeyRound
} from "lucide-react";

const steps = [
  { num: 1, icon: FileText, label: "Birth Certificate", subtitle: "The Foundation", desc: "Proof of identity from birth — required for almost everything else." },
  { num: 2, icon: CreditCard, label: "Medicare Card", subtitle: "The Key to Healthcare", desc: "Access to free or subsidised medical care across Australia." },
  { num: 3, icon: IdCard, label: "Photo ID / Licence", subtitle: "The Gateway", desc: "Everyday proof of identity for opening accounts, renting and more." },
];

function TimelineCard({ step, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left safety-card border p-6 md:p-7 transition-all duration-300 ${open ? "border-primary" : "border-border/50 hover:border-primary/40"}`}
      >
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg">
            {step.num}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">{step.subtitle}</p>
            <h3 className="text-xl font-bold">{step.label}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{step.desc}</p>
          </div>
          <motion.div animate={{ rotate: open ? 90 : 0 }}>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pt-5">
              {step.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
      <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-muted-foreground text-sm mt-0.5">{value}</p>
      </div>
    </div>
  );
}

const medicareDetails = (
  <div className="grid sm:grid-cols-2 gap-x-8">
    <div>
      <InfoRow icon={AlertCircle} label="Purpose" value="Access to free or subsidised doctor visits, tests and hospital care under Australia's public health system." />
      <InfoRow icon={CheckCircle2} label="Requirements" value="Proof of identity (birth certificate or passport) and your address. You must be an Australian resident." />
      <InfoRow icon={DollarSign} label="Fees" value="Free — there is no cost to enrol in Medicare." />
    </div>
    <div>
      <InfoRow icon={Clock} label="Waiting Time" value="Usually 3–4 weeks to receive your card in the mail." />
      <InfoRow icon={KeyRound} label="Application Process" value="Complete a Medicare enrolment form online via myGov or at a Services Australia service centre." />
      <div className="pt-4">
        <a href="https://www.servicesaustralia.gov.au/medicare" target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl w-full sm:w-auto">Services Australia — Medicare <ExternalLink className="w-4 h-4 ml-1.5" /></Button>
        </a>
      </div>
    </div>
  </div>
);

const birthCertDetails = (
  <div className="grid sm:grid-cols-2 gap-x-8">
    <div>
      <InfoRow icon={AlertCircle} label="Purpose" value="Official proof of identity and date of birth — required for licences, Medicare, passports and more." />
      <InfoRow icon={CheckCircle2} label="Requirements" value="Details about your birth, parents' details, and proof of your identity if applying as an adult." />
      <InfoRow icon={DollarSign} label="Fees" value="Approx. $60–$83 for a standard certificate in NSW (subject to change)." />
    </div>
    <div>
      <InfoRow icon={Clock} label="Processing Time" value="Allow up to 6 weeks for a standard application by post." />
      <InfoRow icon={KeyRound} label="Application Process" value="Apply online via NSW Births Deaths and Marriages, by post, or in person at a service centre." />
      <div className="pt-4">
        <a href="https://www.nsw.gov.au/births-deaths-marriages" target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl w-full sm:w-auto">NSW Births Deaths & Marriages <ExternalLink className="w-4 h-4 ml-1.5" /></Button>
        </a>
      </div>
    </div>
  </div>
);

const photoIdDetails = (
  <div className="grid sm:grid-cols-2 gap-x-8">
    <div>
      <InfoRow icon={AlertCircle} label="Purpose" value="Everyday proof of identity — needed to open bank accounts, rent, buy alcohol and verify age." />
      <InfoRow icon={CheckCircle2} label="Requirements" value="Proof of identity (birth certificate/passport) and proof of address. Must pass an eyesight test for a licence." />
      <InfoRow icon={DollarSign} label="Fees" value="NSW Photo Card approx. $57; Provisional licence from approx. $26." />
    </div>
    <div>
      <InfoRow icon={Clock} label="Processing Time" value="Photo card issued on the spot; licence card posted within 5–10 business days." />
      <InfoRow icon={KeyRound} label="Application Process" value="Visit a Service NSW centre with your documents and complete the application in person." />
      <div className="pt-4">
        <a href="https://www.service.nsw.gov.au" target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl w-full sm:w-auto">Service NSW <ExternalLink className="w-4 h-4 ml-1.5" /></Button>
        </a>
      </div>
    </div>
  </div>
);

const downloadableCards = [
  { title: "Medicare Card Checklist", items: ["Proof of identity", "Address details", "myGov account", "Enrolment form"] },
  { title: "Birth Certificate Checklist", items: ["Birth details", "Parents' details", "Proof of identity", "Application fee (~$60)"] },
  { title: "Photo ID Checklist", items: ["Birth certificate/passport", "Proof of address", "Eyesight test (licence)", "Application fee (~$57)"] },
];

export default function Identification() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
      <PageHero
        eyebrow="Section 2"
        title="Identification"
        subtitle="Why your ID matters and how to get the documents you need — step by step."
      />

      {/* Why it matters */}
      <Reveal>
        <div className="safety-card border border-border/50 p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold mb-3">Why identification is essential</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Before you can rent a property, open a bank account, enrol in Medicare, claim Centrelink payments or even get a
            phone plan, you need to prove who you are. Without the right documents, everyday tasks become roadblocks.
            Getting your ID sorted early is one of the first and most important steps towards living independently.
          </p>
        </div>
      </Reveal>

      {/* Timeline */}
      <section className="mb-16">
        <Reveal>
          <SectionHeader eyebrow="Step-by-Step Timeline" title="Get your ID in the right order" subtitle="Click a step to expand the full checklist, requirements and links." align="center" icon={KeyRound} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative pl-8 md:pl-0">
            {/* vertical line on mobile */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border md:hidden" />
            <div className="space-y-5">
              <TimelineCard step={{ ...steps[0], details: birthCertDetails }} defaultOpen={true} />
              <TimelineCard step={{ ...steps[1], details: medicareDetails }} />
              <TimelineCard step={{ ...steps[2], details: photoIdDetails }} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Downloadable cards */}
      <section className="mb-8">
        <Reveal>
          <SectionHeader eyebrow="Print & Go" title="Downloadable information cards" subtitle="Quick checklists you can screenshot or print before you head to a service centre." align="center" icon={Download} />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {downloadableCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="safety-card border border-border/50 p-6 h-full hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{c.title}</h3>
                </div>
                <ul className="space-y-2 mb-5">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="rounded-xl w-full" onClick={() => window.print()}>
                  <Download className="w-4 h-4 mr-1.5" /> Print Checklist
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}