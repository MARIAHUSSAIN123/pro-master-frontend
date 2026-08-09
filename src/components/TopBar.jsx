import { Link } from "react-router-dom";
import { Phone, Mail, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function TopBar() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="hidden lg:block bg-navy text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto h-11 px-6 flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-8 text-sm">

          <a
            href="tel:+14034580219"
            className="flex items-center gap-2 hover:text-gold transition-all duration-300"
          >
            <Phone size={15} className="text-gold" />
            <span>+1 (403) 458 0219</span>
          </a>

          <a
            href="mailto:ernestine.bissou@hillsatcham.com"
            className="flex items-center gap-2 hover:text-gold transition-all duration-300"
          >
            <Mail size={15} className="text-gold" />
            <span>ernestine.bissou@hillsatcham.com</span>
          </a>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-7 text-sm">

          <Link
            to="/careers"
            className="relative group"
          >
            Careers

            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/contact"
            className="relative group"
          >
            Contact

            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <motion.button
            whileTap={{ scale: .95 }}
            onClick={toggleLanguage}
            className="flex items-center gap-1 hover:text-gold transition-colors duration-300"
          >
            {language.toUpperCase()}
            <ChevronDown size={15} />
          </motion.button>

        </div>

      </div>
    </div>
  );
}