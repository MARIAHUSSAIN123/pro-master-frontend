import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    { name: "Michael Brown", company: t("testimonials.t1Role"), review: t("testimonials.t1Review") },
    { name: "Sarah Johnson", company: t("testimonials.t2Role"), review: t("testimonials.t2Review") },
    { name: "David Wilson", company: t("testimonials.t3Role"), review: t("testimonials.t3Review") },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[4px] text-green-600 font-semibold">
            {t("testimonials.tag")}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0E2A47] mt-4">
            {t("testimonials.heading")}
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            {t("testimonials.desc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .2,
                duration: .6,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-500"
            >

              <div className="flex gap-1 text-yellow-400 mb-5">
                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>
              </div>

              <p className="text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-bold text-[#0E2A47]">
                  {item.name}
                </h3>
                <p className="text-green-600">
                  {item.company}
                </p>
              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}