import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-[#071D31] via-[#0D2A47] to-[#12395C]">

      <div className="absolute -top-24 -left-24 w-80 h-80 bg-green/20 rounded-full blur-[140px]" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-yellow-400/20 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/10 p-12 md:p-16 text-center"
        >

          <span className="uppercase tracking-[5px] text-green font-semibold">
            {t("servicesCta.tag")}
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-white mt-5 leading-tight">
            {t("servicesCta.heading1")}
            <span className="block text-gold mt-2">
              {t("servicesCta.heading2")}
            </span>
          </h2>

          <p className="text-white/70 max-w-3xl mx-auto mt-8 text-lg leading-9">
            {t("servicesCta.desc")}
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">

            <Link
              to="/contact"
              className="group bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              {t("servicesCta.getFreeQuoteBtn")}
              <ArrowRight size={20} className="group-hover:translate-x-2 transition" />
            </Link>

            
           <a href="tel:+14034580219"
              className="group border border-white/30 backdrop-blur-xl px-8 py-4 rounded-full text-white hover:bg-white hover:text-navy transition-all duration-300 flex items-center gap-3"
            >
              <Phone size={18} />
              {t("servicesCta.callNowBtn")}
            </a>

          </div>

        </motion.div>

      </div>

    </section>
  );
}