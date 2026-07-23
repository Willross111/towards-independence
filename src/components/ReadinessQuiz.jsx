import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

const questions = [
  { q: "Do you have photo identification (e.g., birth certificate, Medicare card, photo ID)?", topic: "Identification" },
  { q: "Can you cook at least 3 simple meals on your own?", topic: "Living Independently" },
  { q: "Do you have savings set aside (at least 1 month of expenses)?", topic: "Budget Calculator" },
  { q: "Can you create and follow a monthly budget?", topic: "Budget Calculator" },
  { q: "Do you know how to set up and pay household bills?", topic: "Major Costs" },
  { q: "Do you know how to wash and care for your clothes?", topic: "Living Independently" },
  { q: "Do you know your emergency contacts and support services?", topic: "Support Services" },
  { q: "Do you know how to find and apply for rental accommodation?", topic: "Accommodation" },
];

const topicsByPath = {
  "Identification": "/identification",
  "Living Independently": "/living-independently",
  "Budget Calculator": "/budget-calculator",
  "Major Costs": "/major-costs",
  "Support Services": "/support-services",
  "Accommodation": "/accommodation",
};

export default function ReadinessQuiz({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const score = answers.filter(Boolean).length;
  const pct = Math.round((score / questions.length) * 100);
  const result =
    pct >= 80 ? { label: "Ready to Live Independently", color: "text-success", icon: Trophy, advice: "You're well-prepared. Focus on building your emergency fund and refining your budget." }
    : pct >= 50 ? { label: "Almost Ready", color: "text-warning", icon: CheckCircle2, advice: "You're on the right track. Strengthen your weaker areas below before moving out." }
    : { label: "Not Ready Yet", color: "text-destructive", icon: XCircle, advice: "Don't worry — this guide will help. Start with the basics and build up your skills." };

  const weakTopics = questions
    .map((q, i) => ({ q, answeredYes: answers[i] }))
    .filter((a) => a.answeredYes === false)
    .map((a) => a.q.topic);

  const progress = done ? 100 : (step / questions.length) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="bg-white rounded-[32px] max-w-lg w-full p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress meter */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-semibold text-muted-foreground mb-2">
                <span>Ready-o-Meter</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {!done ? (
              <div>
                <p className="text-sm font-semibold text-primary mb-2">Question {step + 1} of {questions.length}</p>
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-balance">{questions[step].q}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const next = [...answers];
                      next[step] = true;
                      setAnswers(next);
                      if (step + 1 < questions.length) setStep(step + 1);
                      else setDone(true);
                    }}
                    className="py-4 rounded-2xl bg-success text-white font-semibold hover:bg-success/90 transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      const next = [...answers];
                      next[step] = false;
                      setAnswers(next);
                      if (step + 1 < questions.length) setStep(step + 1);
                      else setDone(true);
                    }}
                    className="py-4 rounded-2xl bg-muted text-foreground font-semibold hover:bg-destructive hover:text-white transition-colors"
                  >
                    Not yet
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4`}>
                  <result.icon className={`w-10 h-10 ${result.color}`} />
                </div>
                <p className="text-sm text-muted-foreground">Your score</p>
                <p className="text-5xl font-bold mb-2">{pct}<span className="text-2xl text-muted-foreground">/100</span></p>
                <h3 className={`text-2xl font-bold ${result.color} mb-3`}>{result.label}</h3>
                <p className="text-muted-foreground mb-5">{result.advice}</p>

                {weakTopics.length > 0 && (
                  <div className="text-left mb-6">
                    <p className="font-semibold mb-2">Recommended sections to review:</p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(weakTopics)].map((t) => (
                        <a key={t} href={topicsByPath[t] || "/"} className="px-3 py-1.5 rounded-full bg-accent text-primary text-sm font-medium">
                          {t}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button onClick={reset} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" /> Retake
                  </Button>
                  <Button onClick={handleClose} className="flex-1">Done</Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}