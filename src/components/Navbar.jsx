import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/clients", label: t("nav.clients") },
    { to: "/contact", label: t("nav.contact") },
  ];

  function NavItem({ to, label }) {
    return (
      <NavLink to={to} className="relative group px-1 py-2 font-body text-sm font-medium">
        {({ isActive }) => (
          <>
            <span className={isActive ? "text-green" : "text-navy"}>{label}</span>
            <span
              className={`absolute left-0 -bottom-0.5 h-[2px] bg-gold transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </>
        )}
      </NavLink>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-mist">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-1">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Hills Atcham Clean & Building Maintenance" className="h-35 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-mono font-600 border border-mist rounded-full px-3 py-1.5 hover:border-green transition-colors"
            aria-label="Toggle language"
          >
            <span className={language === "en" ? "text-navy" : "text-ink/40"}>EN</span>
            <span className="text-ink/30">/</span>
            <span className={language === "fr" ? "text-navy" : "text-ink/40"}>FR</span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-mono font-600 border border-mist rounded-full px-2.5 py-1"
            aria-label="Toggle language"
          >
            <span className={language === "en" ? "text-navy" : "text-ink/40"}>EN</span>
            <span className="text-ink/30">/</span>
            <span className={language === "fr" ? "text-navy" : "text-ink/40"}>FR</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="w-6 h-0.5 bg-navy block" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="w-6 h-0.5 bg-navy block" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="w-6 h-0.5 bg-navy block" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-mist bg-cream"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-navy font-medium"
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}