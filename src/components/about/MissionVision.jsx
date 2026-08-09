import { motion } from "framer-motion";
import { Target, Eye, HeartHandshake } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function MissionVision() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Target,
      title: t("missionVision.missionTitle"),
      desc: t("missionVision.missionDesc"),
      color: "from-green to-green-light",
    },
    {
      icon: Eye,
      title: t("missionVision.visionTitle"),
      desc: t("missionVision.visionDesc"),
      color: "from-gold to-yellow-500",
    },
    {
      icon: HeartHandshake,
      title: t("missionVision.valuesTitle"),
      desc: t("missionVision.valuesDesc"),
      color: "from-navy to-slate-700",
    },
  ];

  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-[5px] text-green font-semibold">
            {t("missionVision.tag")}
          </span>

          <h2 className="font-display text-5xl font-black text-navy mt-5">
            {t("missionVision.heading1")}
            <span className="text-gold"> {t("missionVision.heading2")}</span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
            {t("missionVision.intro")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="relative overflow-hidden rounded-[30px] bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              >

                {/* Top Gradient */}
                <div
                  className={`h-2 bg-gradient-to-r ${card.color}`}
                />

                <div className="p-10">

                  <div
                    className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg mb-8 group-hover:rotate-6 duration-300`}
                  >
                    <Icon className="text-white" size={38} />
                  </div>

                  <h3 className="text-3xl font-bold text-navy mb-5">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 leading-8">
                    {card.desc}
                  </p>

                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-gold/5 opacity-0 group-hover:opacity-100 transition duration-500" />

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
