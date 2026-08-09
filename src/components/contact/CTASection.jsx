import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import QuoteButton from "../QuoteButton";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-[#081E31] via-[#0D2A47] to-[#12395C]">

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green/20 rounded-full blur-[150px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-[150px]" />

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:25px_25px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="rounded-[40px] border border-white/10 bg-white/10 backdrop-blur-xl p-12 md:p-16 text-center shadow-2xl"
        >

          <span className="uppercase tracking-[5px] text-green font-semibold">
            {t("contactCta.tag")}
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-white mt-5 leading-tight">
            {t("contactCta.heading1")}
            <span className="block text-gold mt-2">
              {t("contactCta.heading2")}
            </span>
          </h2>

          <p className="text-white/75 text-lg leading-9 max-w-3xl mx-auto mt-8">
            {t("contactCta.desc")}
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">

            <QuoteButton className="group bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-500 hover:scale-105 flex items-center gap-3">
  {t("contactCta.requestQuoteBtn")}
  <ArrowRight size={20} className="group-hover:translate-x-2 transition" />
</QuoteButton>

            
             <a href="tel:+14034580219"
              className="group border border-white/30 px-8 py-4 rounded-full text-white hover:bg-white hover:text-navy transition-all duration-500 flex items-center gap-3"
            >
              <PhoneCall size={18} />
              {t("contactCta.callUsNowBtn")}
            </a>

          </div>

        </motion.div>

      </div>

    </section>
  );
}