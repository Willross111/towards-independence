import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Living", path: "/living-independently" },
  { label: "ID", path: "/identification" },
  { label: "Support", path: "/support-services" },
  { label: "Costs", path: "/major-costs" },
  { label: "Budget", path: "/budget-calculator" },
  { label: "Housing", path: "/accommodation" },
  { label: "Transport", path: "/transport" },
  { label: "Resources", path: "/resources" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav border-b border-border/50 py-2" : "bg-transparent py-3"}`}>
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base md:text-lg tracking-tight hidden sm:block">Towards Independence</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? "bg-primary text-white" : "text-foreground/70 hover:text-primary hover:bg-accent"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden glass-nav border-t border-border/50"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-colors text-center ${
                        isActive ? "bg-primary text-white" : "bg-white text-foreground/70 border border-border/50"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  const govLinks = [
    { label: "Services Australia", url: "https://www.servicesaustralia.gov.au" },
    { label: "Medicare", url: "https://www.servicesaustralia.gov.au/medicare" },
    { label: "Centrelink", url: "https://www.servicesaustralia.gov.au/centrelink" },
    { label: "NSW Births Deaths & Marriages", url: "https://www.nsw.gov.au/births-deaths-marriages" },
    { label: "Transport for NSW", url: "https://www.transport.nsw.gov.au" },
    { label: "MoneySmart", url: "https://moneysmart.gov.au" },
    { label: "Headspace", url: "https://headspace.org.au" },
    { label: "Beyond Blue", url: "https://www.beyondblue.org.au" },
    { label: "Lifeline", url: "https://www.lifeline.org.au" },
  ];

  const needLinks = [
    { label: "I need money → Support Services", path: "/support-services" },
    { label: "I need a home → Accommodation", path: "/accommodation" },
    { label: "I need ID → Identification", path: "/identification" },
    { label: "I need help → Support Services", path: "/support-services" },
  ];

  return (
    <footer className="mt-20 bg-[hsl(216,75%,15%)] text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Towards Independence</span>
            </div>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              A financial and life-skills education resource for young Australians aged 18–25 preparing to live independently.
            </p>
            <div className="mt-5">
              <span className="text-sm font-semibold text-white/90 block mb-2">Quick-Exit Emergency</span>
              <div className="flex gap-3">
                <a href="tel:000" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors">Call 000</a>
                <a href="tel:131114" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors">Lifeline 13 11 14</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white/90 mb-4">Government Resources</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {govLinks.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/90 mb-4">Find What You Need</h4>
            <ul className="space-y-2.5">
              {needLinks.map((l) => (
                <li key={l.path + l.label}>
                  <Link to={l.path} className="text-white/70 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <p>© 2026 Towards Independence. An educational resource for Year 10 Commerce (NSW).</p>
          <p>Figures are realistic estimates and should be used as a guide only.</p>
        </div>
      </div>
    </footer>
  );
}