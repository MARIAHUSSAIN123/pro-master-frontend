import "./LogoCarousel.css";
import { useLanguage } from "../../context/LanguageContext";

import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";
import logo5 from "../../assets/logo5.png";
import logo6 from "../../assets/logo6.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

export default function LogoCarousel() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <span className="uppercase tracking-[4px] text-green font-semibold">
          {t("logoCarousel.tag")}
        </span>

        <h2 className="font-display text-5xl font-black text-navy mt-4">
          {t("logoCarousel.heading")}
        </h2>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
          {t("logoCarousel.desc")}
        </p>

      </div>

      <div className="logoWrapper mt-16">
        <div className="logoTrack">
          {logos.concat(logos).map((logo, index) => (
            <div className="logoCard" key={index}>
              <img src={logo} alt="" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}