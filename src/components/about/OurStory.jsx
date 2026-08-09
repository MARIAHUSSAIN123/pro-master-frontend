import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

import story1 from "../../assets/clean1.jpg";
import story2 from "../../assets/clean2.jpg";

export default function OurStory() {
  const { t } = useLanguage();

  const points = [
    t("ourStory.point1"),
    t("ourStory.point2"),
    t("ourStory.point3"),
    t("ourStory.point4"),
  ];

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT IMAGES */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative"
          >

            <img
              src={story1}
              alt=""
              className="rounded-[30px] shadow-2xl w-[90%] h-[620px] object-cover"
            />

            <img
              src={story2}
              alt=""
              className="absolute -bottom-12 right-0 w-[55%] rounded-[25px] border-8 border-white shadow-2xl"
            />

            {/* Floating Card */}

            <div className="absolute top-10 -right-10 bg-white rounded-3xl shadow-2xl px-8 py-6">

              <h2 className="text-5xl font-black text-green">
                15+
              </h2>

              <p className="mt-2 font-semibold text-navy">
                {t("ourStory.yearsLabel")}
              </p>

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >

            <span className="uppercase tracking-[5px] text-green font-semibold">
              {t("ourStory.tag")}
            </span>

            <h2 className="font-display text-5xl lg:text-6xl font-black text-navy mt-5 leading-tight">

              {t("ourStory.heading1")}
              <span className="block text-gold">
                {t("ourStory.heading2")}
              </span>

            </h2>

            <p className="mt-8 text-gray-600 leading-9">
              {t("ourStory.para1")}
            </p>

            <p className="mt-6 text-gray-600 leading-9">
              {t("ourStory.para2")}
            </p>

            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-5 mt-10">

              {points.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={22}
                    className="text-green"
                  />

                  <span className="font-medium text-navy">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            {/* Button */}

           <Link
  to="/services"
  className="mt-12 inline-block bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
>
  {t("ourStory.learnMoreBtn")}
</Link>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
