import { useLanguage } from "../../context/LanguageContext";
import QuoteButton from "../QuoteButton";
import { Link } from "react-router-dom";

function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#0D2A47] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {t("cta.heading")}
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          {t("cta.desc")}
        </p>

      <QuoteButton className="w-full sm:w-auto bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
  {t("home.getFreeQuote")}
</QuoteButton>
      </div>
    </section>
  );
}

export default CTASection;