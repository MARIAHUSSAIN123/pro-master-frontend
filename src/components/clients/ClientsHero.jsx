import "./ClientsHero.css";
import { ArrowRight } from "lucide-react";
import hero from "../../assets/clean4.jpg";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function ClientsHero() {
  const { t } = useLanguage();

  return (
    <section className="clientsHero">
      <img src={hero} alt="" className="heroImage" />

      <div className="heroOverlay"></div>

      <div className="heroContent">
        <span>{t("clientsHero.badge")}</span>

        <h1>
          {t("clientsHero.heading")}
          <br />
          {t("clientsHero.headingLine2")}
        </h1>

        <p>
          {t("clientsHero.desc")}
        </p>

      <Link to="/contact">
  {t("clientsHero.becomePartnerBtn")}
  <ArrowRight size={18} />
</Link>
      </div>
    </section>
  );
}