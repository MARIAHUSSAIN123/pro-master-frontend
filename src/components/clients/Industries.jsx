import { motion } from "framer-motion";
import {
  Building2,
  Hospital,
  GraduationCap,
  ShoppingBag,
  Hotel,
  Warehouse,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Industries() {
  const { t } = useLanguage();

  const industries = [
    { icon: <Building2 size={42} />, title: t("industries.i1Title"), text: t("industries.i1Text") },
    { icon: <Hospital size={42} />, title: t("industries.i2Title"), text: t("industries.i2Text") },
    { icon: <GraduationCap size={42} />, title: t("industries.i3Title"), text: t("industries.i3Text") },
    { icon: <ShoppingBag size={42} />, title: t("industries.i4Title"), text: t("industries.i4Text") },
    { icon: <Hotel size={42} />, title: t("industries.i5Title"), text: t("industries.i5Text") },
    { icon: <Warehouse size={42} />, title: t("industries.i6Title"), text: t("industries.i6Text") },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-semibold uppercase tracking-widest">
            {t("industries.tag")}
          </p>

          <h2 className="text-4xl font-bold text-[#0E2A47] mt-3">
            {t("industries.heading")}
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            {t("industries.desc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {industries.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .12,
                duration: .6,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.04,
              }}
              className="bg-gray-50 rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 text-center"
            >

              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-[#0E2A47] mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.text}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}