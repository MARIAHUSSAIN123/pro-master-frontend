import { Link } from "react-router-dom";
import clean5 from "../../assets/clean5.jpg";
import QuoteButton from "../QuoteButton";
import { useLanguage } from "../../context/LanguageContext";

const ServicesHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[75vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={clean5}
        alt="Professional Cleaning Services"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/55"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center text-white">

        {/* Badge */}
        <span className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold text-xs sm:text-sm lg:text-base mb-6">
          {t("servicesHero.badge")}
        </span>

        {/* Heading */}
        <h1
          className="
            font-extrabold
            tracking-tight
            leading-[1.1]
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[4rem]
            xl:text-[4.5rem]
            max-w-5xl
            mx-auto
          "
        >
          {t("servicesHero.heading1")}
          <span className="block">
            {t("servicesHero.heading2")}
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            mt-6
            max-w-3xl
            mx-auto
            text-base
            sm:text-lg
            md:text-xl
            leading-8
            text-gray-200
          "
        >
          {t("servicesHero.desc")}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">

          <QuoteButton className="w-full sm:w-auto bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
  {t("home.getFreeQuote")}
</QuoteButton>

          <Link
            to="/about"
            className="
              w-full
              sm:w-auto
              border-2
              border-white
              hover:bg-white
              hover:text-black
              px-8
              py-4
              rounded-full
              font-semibold
              transition-all
              duration-300
            "
          >
            {t("servicesHero.learnMoreBtn")}
          </Link>

        </div>

      </div>
    </section>
  );
};

export default ServicesHero;