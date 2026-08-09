import { motion } from "framer-motion";
import {
  Building2,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    number: "200+",
    title: "Projects Completed",
    desc: "Successfully delivering commercial cleaning and maintenance projects across Canada.",
  },
  {
    icon: Users,
    number: "185+",
    title: "Happy Clients",
    desc: "Businesses trust our professional team for reliable and consistent service.",
  },
  {
    icon: ShieldCheck,
    number: "100%",
    title: "Quality Guaranteed",
    desc: "Certified staff committed to safety, quality and attention to every detail.",
  },
  {
    icon: Sparkles,
    number: "24/7",
    title: "Customer Support",
    desc: "Fast response whenever you need cleaning or maintenance assistance.",
  },
];

export default function StatsSection() {
  return (
    <section className="relative -mt-28 z-30 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -15,
                scale: 1.03,
              }}
              className="group relative rounded-[30px] p-[2px] overflow-hidden"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-green via-gold to-green animate-pulse" />

              {/* Card */}
              <div className="relative bg-white rounded-[28px] p-8 h-full shadow-xl group-hover:shadow-2xl transition-all duration-500">

                {/* Glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-green/10 rounded-full blur-3xl group-hover:bg-green/20 transition-all duration-500"></div>

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.7 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green to-green-light flex items-center justify-center text-white shadow-lg"
                >
                  <Icon size={38} />
                </motion.div>

                {/* Number */}
                <motion.h2
                  whileHover={{ scale: 1.08 }}
                  className="text-5xl font-black text-navy mt-8"
                >
                  {item.number}
                </motion.h2>

                {/* Title */}
                <h3 className="text-2xl font-bold text-navy mt-3">
                  {item.title}
                </h3>

                <div className="w-14 h-1 rounded-full bg-gradient-to-r from-green to-gold mt-5 mb-5"></div>

                {/* Description */}
                <p className="text-gray-600 leading-8 text-[16px]">
                  {item.desc}
                </p>

                {/* Bottom line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green via-gold to-green"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}