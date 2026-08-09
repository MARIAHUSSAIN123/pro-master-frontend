import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  Users,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    { icon: ShieldCheck, title: t("clientsWhyChooseUs.f1Title"), text: t("clientsWhyChooseUs.f1Text") },
    { icon: Clock3, title: t("clientsWhyChooseUs.f2Title"), text: t("clientsWhyChooseUs.f2Text") },
    { icon: Users, title: t("clientsWhyChooseUs.f3Title"), text: t("clientsWhyChooseUs.f3Text") },
    { icon: Sparkles, title: t("clientsWhyChooseUs.f4Title"), text: t("clientsWhyChooseUs.f4Text") },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <span className="uppercase tracking-[4px] text-green-600 font-semibold">
            {t("clientsWhyChooseUs.tag")}
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-[#0E2A47] mt-4">
            {t("clientsWhyChooseUs.heading")}
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            {t("clientsWhyChooseUs.desc")}
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * .15,
                  duration: .6,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.04,
                }}
                className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:border-green-500 transition-all duration-500 relative overflow-hidden"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition duration-500">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#0E2A47] mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-7">
                    {item.text}
                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}