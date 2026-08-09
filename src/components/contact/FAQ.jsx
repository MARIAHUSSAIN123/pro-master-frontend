import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[5px] text-green font-semibold">
            {t("faq.tag")}
          </span>
          <h2 className="text-5xl font-black text-navy mt-4">
            {t("faq.heading")}
          </h2>
          <p className="text-gray-500 mt-5 leading-8 max-w-2xl mx-auto">
            {t("faq.desc")}
          </p>
        </motion.div>

        <div className="space-y-6">

          {faqs.map((faq, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * .12, duration: .5 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200"
            >

              <button
                onClick={() => setActive(active === index ? null : index)}
                className="w-full flex justify-between items-center p-7 text-left hover:bg-slate-50 transition"
              >
                <h3 className="text-xl font-bold text-navy">{faq.question}</h3>
                <div className="text-green">
                  {active === index ? <Minus size={26} /> : <Plus size={26} />}
                </div>
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: .35 }}
                  >
                    <div className="px-7 pb-7 text-gray-600 leading-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}