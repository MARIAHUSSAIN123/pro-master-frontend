import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StatsSection from "../components/StatsSection";
import staffHero from "../assets/staff-hero.jpg";
import QuoteButton from "../components/QuoteButton"; 
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const { t } = useLanguage();

  const services = [
    { title: t("services.commercial"), desc: t("services.commercialDesc") },
    { title: t("services.residential"), desc: t("services.residentialDesc") },
    { title: t("services.maintenance"), desc: t("services.maintenanceDesc") },
    { title: t("services.specialized"), desc: t("services.specializedDesc") },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-navy text-cream overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={staffHero} alt="Hills Atcham team member" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081E31]/95 via-[#081E31]/75 to-transparent" />
        </div>

       <div className="relative z-10 max-w-7xl mx-auto w-full px-6 min-h-[850px] flex items-center">

  <div className="max-w-3xl">

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-5 py-2 mb-8"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-green animate-pulse"></span>

      <p className="uppercase tracking-[4px] text-sm text-white">
        {t("home.badge")}
      </p>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="font-display text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white"
    >
      {t("home.heroLine1")}

      <span className="block text-gold">
        {t("home.heroLine2")}
      </span>

      {t("home.heroLine3")}

      <span className="block">
        {t("home.heroLine4")}
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .3 }}
      className="mt-8 text-xl text-white/75 leading-8 max-w-xl"
    >
      {t("home.heroDesc")}
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .5 }}
      className="flex flex-wrap gap-5 mt-10"
    >
     <QuoteButton className="bg-gold text-navy px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm hover:opacity-90 transition-opacity">
  Get a Free Quote Today
</QuoteButton>

      <Link
        to="/services"
        className="border border-white/30 backdrop-blur-lg px-8 py-4 rounded-full text-white hover:bg-white hover:text-navy transition-all duration-300"
      >
        {t("home.exploreServices")}
      </Link>
    </motion.div>

  </div>

</div>
      </section>
   <StatsSection />
      {/* ABOUT TEASER */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-green mb-3">{t("home.whoWeAre")}</p>
        <h2 className="font-display font-700 text-2xl md:text-3xl text-navy max-w-2xl">
          {t("home.aboutTitle")}
        </h2>
        <p className="text-ink/70 mt-4 max-w-2xl leading-relaxed">
          {t("home.aboutDesc")}
        </p>
        <Link to="/about" className="inline-block mt-5 text-green font-semibold text-sm hover:underline">
          {t("home.learnMore")} →
        </Link>
      </motion.section>

      {/* SERVICES TEASER */}
      <section className="bg-white border-y border-mist">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.25em] uppercase text-green mb-3"
          >
            {t("home.whatWeDo")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-700 text-2xl md:text-3xl text-navy max-w-xl mb-10"
          >
            {t("home.ourServices")}
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl p-[1px] overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(78,148,80,0.15), rgba(184,115,18,0.1))",
                }}
              >
                <div className="absolute -inset-8 bg-gradient-to-br from-green/30 via-gold/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />

                <div className="relative h-full rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 group-hover:bg-white/70 group-hover:border-green/40 group-hover:shadow-2xl transition-all duration-500 p-6">
                  <motion.div
                    className="w-11 h-11 rounded-xl bg-navy text-cream flex items-center justify-center font-mono text-sm font-600 mb-4 shadow-md"
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{
                      background: "linear-gradient(135deg, #0B2843, #4E9450)",
                    }}
                  >
                    0{i + 1}
                  </motion.div>
                  <h3 className="font-display font-700 text-navy mb-2 text-lg group-hover:text-green transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-ink/65 text-sm leading-relaxed">{s.desc}</p>

                  <div className="mt-4 h-[2px] w-0 group-hover:w-12 bg-gradient-to-r from-green to-gold transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          <Link to="/services" className="inline-flex items-center gap-1.5 mt-8 text-green font-semibold text-sm hover:gap-2.5 transition-all duration-300">
            {t("home.viewAllServices")} <span>→</span>
          </Link>
        </div>
      </section>

      {/* CLIENTS & PARTNERS TEASER */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-green mb-3">{t("home.ourNetwork")}</p>
        <h2 className="font-display font-700 text-2xl md:text-3xl text-navy mb-4">
          {t("home.networkTitle")}
        </h2>
        <p className="text-ink/65 max-w-xl mx-auto mb-6">
          {t("home.networkDesc")}
        </p>
        <Link
          to="/clients"
          className="inline-block bg-navy text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-green transition-colors duration-300"
        >
          {t("home.viewClients")}
        </Link>
      </motion.section>

      {/* CONTACT TEASER */}
      <section className="bg-white border-t border-mist">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display font-700 text-2xl md:text-3xl text-navy mb-3">{t("home.getInTouch")}</h2>
          <p className="text-ink/65 mb-6">{t("home.getInTouchDesc")}</p>
          <Link
            to="/contact"
            className="inline-block bg-gold text-navy px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-300"
          >
            {t("home.contactUs")}
          </Link>
        </div>
      </section>
    </div>
  );
}