import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactInfo() {
  const { t } = useLanguage();

  const info = [
    { icon: Phone, title: t("contactInfo.callTitle"), text: "+1 (403) 458-0219", color: "bg-green-100 text-green-600" },
    { icon: Mail, title: t("contactInfo.emailTitle"), text: "info@hillsatcham.com", color: "bg-yellow-100 text-yellow-600" },
    { icon: MapPin, title: t("contactInfo.visitTitle"), text: t("contactInfo.location"), color: "bg-blue-100 text-blue-600" },
    { icon: Clock, title: t("contactInfo.hoursTitle"), text: t("contactInfo.hoursText"), color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[5px] text-green font-semibold">
            {t("contactInfo.tag")}
          </span>
          <h2 className="text-5xl font-black text-navy mt-4">
            {t("contactInfo.heading")}
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-8">
            {t("contactInfo.desc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {info.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .15, duration: .6 }}
                whileHover={{ y: -12, scale: 1.04 }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-slate-200 hover:border-green transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                  <Icon size={30} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-7">{item.text}</p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}