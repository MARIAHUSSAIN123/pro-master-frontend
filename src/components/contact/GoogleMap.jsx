import { motion } from "framer-motion";
import { MapPin, Navigation, Car } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function GoogleMap() {
  const { t } = useLanguage();

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
          <span className="uppercase tracking-[5px] text-green font-semibold">
            {t("googleMap.tag")}
          </span>
          <h2 className="text-5xl font-black text-navy mt-4">
            {t("googleMap.heading")}
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-8">
            {t("googleMap.desc")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">

          <motion.div
            initial={{ opacity:0,x:-40 }}
            whileInView={{ opacity:1,x:0 }}
            transition={{ duration:.8 }}
            viewport={{ once:true }}
            className="lg:col-span-2 rounded-[30px] overflow-hidden shadow-2xl"
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Calgary,Alberta,Canada&output=embed"
              className="w-full h-[500px]"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity:0,x:40 }}
            whileInView={{ opacity:1,x:0 }}
            transition={{ duration:.8 }}
            viewport={{ once:true }}
            className="bg-navy rounded-[30px] p-10 text-white shadow-2xl flex flex-col justify-center"
          >

            <div className="w-16 h-16 rounded-2xl bg-green flex items-center justify-center mb-8">
              <MapPin size={30}/>
            </div>

            <h3 className="text-3xl font-bold mb-6">
              {t("googleMap.officeName")}
            </h3>

            <p className="text-white/70 leading-8 mb-8">
              Panorama Hills Heights NW
              <br />
              Calgary, Alberta
              <br />
              Canada
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Navigation className="text-gold"/>
                <span>{t("googleMap.easyNav")}</span>
              </div>
              <div className="flex items-center gap-4">
                <Car className="text-gold"/>
                <span>{t("googleMap.freeParking")}</span>
              </div>
            </div>

        <a  href="https://www.google.com/maps/dir/?api=1&destination=Panorama+Hills+Heights+NW,+Calgary,+Alberta,+Canada"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-10 inline-block text-center bg-green hover:bg-green-light py-4 rounded-full font-semibold transition duration-300 hover:scale-105"
>
  {t("googleMap.getDirectionsBtn")}
</a>

          </motion.div>

        </div>

      </div>

    </section>
  );
}