import { motion } from "framer-motion";
import storyImg from "../assets/about-story.jpg";
import { ShieldCheck, Sparkles, Building2, Users } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    desc: "Experienced staff committed to exceptional service."
  },
  {
    icon: Sparkles,
    title: "Premium Cleaning",
    desc: "High-quality cleaning solutions for every environment."
  },
  {
    icon: Building2,
    title: "Building Maintenance",
    desc: "Reliable maintenance that protects your investment."
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Building long-term relationships through quality service."
  }
];

export default function CompanyStory() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-[#f9fbfa] to-white overflow-hidden">

      {/* Background Blur */}

      <div className="absolute -left-24 top-20 w-80 h-80 rounded-full bg-green/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="relative group"
        >

          <div className="overflow-hidden rounded-[35px] shadow-2xl">

            <img
              src={storyImg}
              alt=""
              className="w-full h-[650px] object-cover group-hover:scale-110 duration-700"
            />

          </div>

          <motion.div

            animate={{
              y: [0, -12, 0]
            }}

            transition={{
              repeat: Infinity,
              duration: 4
            }}

            className="absolute -bottom-8 -right-8 bg-white rounded-3xl shadow-2xl p-8 border border-green/20"

          >

            <h2 className="text-5xl font-black text-green">
              25+
            </h2>

            <p className="mt-2 text-navy font-semibold">
              Years Experience
            </p>

          </motion.div>

        </motion.div>

        {/* CONTENT */}

        <motion.div

          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}

        >

          <span className="uppercase tracking-[5px] text-green font-bold">

            WHO WE ARE

          </span>

          <h2 className="font-display text-5xl lg:text-6xl font-black text-navy mt-6 leading-tight">

            Excellence In

            <span className="block text-gold">

              Every Detail

            </span>

          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-600">

            Hills Atcham is committed to delivering dependable cleaning
            and building maintenance solutions that exceed expectations.
            Our experienced professionals combine innovation, precision,
            and dedication to create cleaner, safer, and healthier
            environments for every client.

          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-12">

            {features.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div

                  key={index}

                  whileHover={{
                    y: -10,
                    scale: 1.03
                  }}

                  transition={{
                    duration: .35
                  }}

                  className="group relative rounded-3xl bg-white border border-gray-200 p-6 shadow-lg hover:shadow-2xl hover:border-green duration-500 overflow-hidden"

                >

                  <div className="absolute inset-0 bg-gradient-to-r from-green/5 to-gold/5 opacity-0 group-hover:opacity-100 duration-500" />

                  <div className="relative">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green to-green-light flex items-center justify-center text-white mb-5">

                      <Icon size={26} />

                    </div>

                    <h3 className="font-bold text-xl text-navy">

                      {item.title}

                    </h3>

                    <p className="text-gray-600 mt-3 leading-7">

                      {item.desc}

                    </p>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </motion.div>

      </div>

    </section>
  );
}