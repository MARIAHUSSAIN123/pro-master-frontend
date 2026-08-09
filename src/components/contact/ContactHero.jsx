import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall } from "lucide-react";
import hero from "../../assets/clean5.jpg";
import QuoteButton from "../QuoteButton"; // ya jahan bhi ye component hai, sahi path daalo
import { useLanguage } from "../../context/LanguageContext";

export default function ContactHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[75vh] lg:min-h-[90vh] flex items-center overflow-hidden">

      {/* Background Image */}
      <img
        src={hero}
        alt="Contact Pro Master"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071D31]/90 via-[#071D31]/70 to-[#071D31]/45" />

      {/* Decorative Blur */}
      <div className="hidden lg:block absolute -left-20 top-16 w-80 h-80 bg-green/20 rounded-full blur-[140px]" />

      <div className="hidden lg:block absolute right-0 bottom-0 w-72 h-72 bg-gold/20 rounded-full blur-[130px]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 w-full">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-white/70 mb-6 text-sm sm:text-base"
        >
          <Link
            to="/"
            className="hover:text-gold transition-colors"
          >
            {t("nav.home")}
          </Link>

          <span>/</span>

          <span className="text-gold">
            {t("nav.contact")}
          </span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-5 py-2 mb-6"
        >
          <PhoneCall
            size={18}
            className="text-green"
          />

          <span className="uppercase tracking-[3px] text-xs sm:text-sm text-white">
            {t("contactHero.badge")}
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
          "
        >
          {t("contactHero.heading1")}

          <span className="block text-gold mt-2">
            {t("contactHero.heading2")}
          </span>

          <span className="block">
            {t("contactHero.heading3")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            mt-6
            max-w-3xl
            text-base
            sm:text-lg
            md:text-xl
            leading-8
            text-white/80
          "
        >
          {t("contactHero.desc")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <QuoteButton className="w-full sm:w-auto bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
  {t("home.getFreeQuote")}
</QuoteButton>
          <Link
            to="/services"
            className="
              w-full
              sm:w-auto
              group
              border
              border-white/30
              backdrop-blur-lg
              px-8
              py-4
              rounded-full
              text-white
              hover:bg-white
              hover:text-navy
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {t("home.exploreServices")}

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