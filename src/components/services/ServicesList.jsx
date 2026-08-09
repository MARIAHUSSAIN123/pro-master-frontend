import {
  Building2,
  Home,
  Sparkles,
  BrushCleaning,
  ShowerHead,
  Warehouse,
  Hammer,
  Waves,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// NOTE: update these import paths to match your actual file names in src/assets.
// Total: 9 images needed, one per service card below.
import commercialImg from "../../assets/services/commercial-cleaning.jpg";
import residentialImg from "../../assets/services/residential-cleaning.jpg";
import officeImg from "../../assets/services/office-cleaning.jpg";
import carpetImg from "../../assets/services/carpet-cleaning.jpg";
import windowImg from "../../assets/services/window-cleaning.jpg";
import industrialImg from "../../assets/services/industrial-cleaning.jpg";
import constructionImg from "../../assets/services/construction-cleanup.jpg";
import pressureWashImg from "../../assets/services/pressure-washing.jpg";
import sanitizationImg from "../../assets/services/sanitization.jpg";

const ServicesList = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Building2 size={28} />,
      image: commercialImg,
      title: t("servicesList.s1Title"),
      desc: t("servicesList.s1Desc"),
    },
    {
      icon: <Home size={28} />,
      image: residentialImg,
      title: t("servicesList.s2Title"),
      desc: t("servicesList.s2Desc"),
    },
    {
      icon: <Sparkles size={28} />,
      image: officeImg,
      title: t("servicesList.s3Title"),
      desc: t("servicesList.s3Desc"),
    },
    {
      icon: <BrushCleaning size={28} />,
      image: carpetImg,
      title: t("servicesList.s4Title"),
      desc: t("servicesList.s4Desc"),
    },
    {
      icon: <ShowerHead size={28} />,
      image: windowImg,
      title: t("servicesList.s5Title"),
      desc: t("servicesList.s5Desc"),
    },
    {
      icon: <Warehouse size={28} />,
      image: industrialImg,
      title: t("servicesList.s6Title"),
      desc: t("servicesList.s6Desc"),
    },
    {
      icon: <Hammer size={28} />,
      image: constructionImg,
      title: t("servicesList.s7Title"),
      desc: t("servicesList.s7Desc"),
    },
    {
      icon: <Waves size={28} />,
      image: pressureWashImg,
      title: t("servicesList.s8Title"),
      desc: t("servicesList.s8Desc"),
    },
    {
      icon: <ShieldCheck size={28} />,
      image: sanitizationImg,
      title: t("servicesList.s9Title"),
      desc: t("servicesList.s9Desc"),
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold uppercase tracking-widest">
            {t("servicesList.tag")}
          </span>

          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            {t("servicesList.heading")}
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg">
            {t("servicesList.desc")}
          </p>
        </div>

        {/* Cards grid - items-stretch makes every card in a row match the tallest one */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image on top */}
              <div className="relative h-56 w-full overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
                {/* Subtle bottom fade only - keeps true photo colors instead of a full dark tint */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                {/* Pricing badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {t("servicesList.startingAt")}
                </div>
              </div>

              {/* Content - flex-1 so it fills remaining height evenly across the row */}
              <div className="relative flex-1 flex flex-col px-8 pb-8">
                {/* Icon badge: floats half on image, half on card, white ring makes the seam look intentional */}
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white group-hover:bg-black transition-colors duration-300">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 pt-8">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
