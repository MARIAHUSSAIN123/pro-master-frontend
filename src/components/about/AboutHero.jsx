import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import aboutHero from "../../assets/clean3.jpg";
import QuoteButton from "../QuoteButton"; // ya jahan bhi ye component hai, sahi path daalo
import { useLanguage } from "../../context/LanguageContext";

export default function AboutHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[75vh] lg:min-h-[90vh] flex items-center overflow-hidden">

      {/* Background */}
      <img
        src={aboutHero}
        alt="About Pro Master"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#081E31]/90 via-[#081E31]/70 to-[#081E31]/45"></div>

      {/* Decorative Blur */}
      <div className="hidden lg:block absolute -left-24 top-20 w-80 h-80 bg-green/20 rounded-full blur-[140px]" />
      <div className="hidden lg:block absolute right-0 bottom-0 w-80 h-80 bg-gold/10 rounded-full blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-5 py-2 mb-6"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green animate-pulse"></span>

          <span className="uppercase tracking-[3px] text-xs sm:text-sm text-white">
            {t("about.badge")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            font-bold
            leading-[1.1]
            tracking-tight
            text-white
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[4rem]
            xl:text-[4.5rem]
            max-w-5xl
            mx-auto
          "
        >
          {t("about.heroLine1")}

          <span className="block text-gold mt-2">
            {t("about.heroLine2")}
          </span>

          <span className="block">
            {t("about.heroLine3")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            mt-6
            max-w-3xl
            mx-auto
            text-base
            sm:text-lg
            md:text-xl
            leading-8
            text-white/85
          "
        >
          {t("about.heroDesc")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
      <QuoteButton className="w-full sm:w-auto bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
  {t("home.getFreeQuote")}
</QuoteButton>

          <Link
            to="/services"
            className="w-full sm:w-auto group border border-white/30 backdrop-blur-lg px-8 py-4 rounded-full text-white hover:bg-white hover:text-navy transition-all duration-300 flex items-center justify-center gap-2"
          >
            {t("about.ourServicesBtn")}

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>

    </section>
  );
}