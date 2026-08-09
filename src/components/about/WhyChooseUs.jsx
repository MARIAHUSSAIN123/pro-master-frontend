import { motion } from "framer-motion";
import {
  ShieldCheck,
  Leaf,
  Clock3,
  BadgeCheck,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

import teamImg from "../../assets/clean3.jpg";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    { icon: ShieldCheck, title: t("whyChooseUs.feature1Title"), text: t("whyChooseUs.feature1Text") },
    { icon: Leaf, title: t("whyChooseUs.feature2Title"), text: t("whyChooseUs.feature2Text") },
    { icon: Clock3, title: t("whyChooseUs.feature3Title"), text: t("whyChooseUs.feature3Text") },
    { icon: BadgeCheck, title: t("whyChooseUs.feature4Title"), text: t("whyChooseUs.feature4Text") },
  ];

  return (
    <section className="py-28 bg-[#f8fafb] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >

            <span className="uppercase tracking-[5px] text-green font-semibold">
              {t("whyChooseUs.tag")}
            </span>

            <h2 className="font-display text-5xl font-black text-navy mt-5 leading-tight">
              {t("whyChooseUs.heading1")}
              <span className="block text-gold">
                {t("whyChooseUs.heading2")}
              </span>
            </h2>

            <p className="mt-8 text-gray-600 leading-8">
              {t("whyChooseUs.intro")}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-12">

              {features.map((item, index) => {
                const Icon = item.icon;

                return (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * .1 }}
                    whileHover={{
                      y: -8,
                      scale: 1.03,
                    }}
                    className="group bg-white rounded-3xl border border-gray-200 p-7 shadow-lg hover:border-green hover:shadow-2xl duration-500"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green to-green-light flex items-center justify-center mb-5 group-hover:rotate-6 duration-300">

                      <Icon
                        className="text-white"
                        size={26}
                      />

                    </div>

                    <h3 className="font-bold text-xl text-navy mb-3">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 leading-7 text-sm">
                      {item.text}
                    </p>

                  </motion.div>

                );
              })}

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className="relative"
          >

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green/20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-52 h-52 bg-gold/20 blur-3xl rounded-full"></div>

            <img
              src={teamImg}
              alt=""
              className="relative rounded-[35px] shadow-2xl w-full"
            />

            {/* Floating Card */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute -bottom-8 -left-8 bg-white rounded-3xl shadow-2xl px-8 py-6"
            >

              <h2 className="text-4xl font-black text-green">
                100%
              </h2>

              <p className="text-navy font-semibold mt-2">
                {t("whyChooseUs.satisfactionLabel")}
              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}