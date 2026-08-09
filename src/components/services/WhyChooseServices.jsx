import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Leaf,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import QuoteButton from "../QuoteButton"; // ya jahan bhi ye component hai, sahi path daalo

import clean5 from "../../assets/clean5.jpg";

export default function WhyChooseServices() {
  const { t } = useLanguage();

  const features = [
    t("whyChooseServices.f1"),
    t("whyChooseServices.f2"),
    t("whyChooseServices.f3"),
    t("whyChooseServices.f4"),
    t("whyChooseServices.f5"),
    t("whyChooseServices.f6"),
  ];

  return (
    <section className="py-28 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative"
          >

            <img
              src={clean5}
              alt=""
              className="rounded-[35px] shadow-2xl w-full h-[650px] object-cover"
            />

            <div className="absolute bottom-8 left-8 bg-white rounded-3xl shadow-2xl px-8 py-6">
              <h2 className="text-5xl font-black text-green">500+</h2>
              <p className="mt-2 font-semibold text-navy">{t("whyChooseServices.happyClients")}</p>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <span className="uppercase tracking-[5px] text-green font-semibold">
              {t("whyChooseServices.tag")}
            </span>

            <h2 className="font-display text-5xl lg:text-6xl font-black text-navy mt-5 leading-tight">
              {t("whyChooseServices.heading1")}
              <span className="block text-gold">
                {t("whyChooseServices.heading2")}
              </span>
            </h2>

            <p className="mt-8 text-gray-600 leading-9">
              {t("whyChooseServices.intro")}
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={22} className="text-green" />
                  <span className="font-medium text-navy">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mt-14">

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green/10 mx-auto flex items-center justify-center">
                  <ShieldCheck className="text-green" size={30} />
                </div>
                <p className="mt-3 font-semibold text-navy">{t("whyChooseServices.trusted")}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 mx-auto flex items-center justify-center">
                  <Clock3 className="text-gold" size={30} />
                </div>
                <p className="mt-3 font-semibold text-navy">{t("whyChooseServices.onTime")}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green/10 mx-auto flex items-center justify-center">
                  <Leaf className="text-green" size={30} />
                </div>
                <p className="mt-3 font-semibold text-navy">{t("whyChooseServices.ecoSafe")}</p>
              </div>

            </div>

           <QuoteButton className="w-full sm:w-auto bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
  {t("home.getFreeQuote")}
</QuoteButton>

          </motion.div>

        </div>

      </div>

    </section>
  );
}