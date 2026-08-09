import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#071D31] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 left-0 w-72 h-72 bg-green/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 right-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company */}

          <div>

            <img
              src={logo}
              alt="Hills Atcham"
              className="w-44 mb-6"
            />

            <p className="text-white/70 leading-8">
              {t("footer.companyDesc")}
            </p>

            {/* Business Hours */}

            <div className="mt-8">

              <div className="flex items-center gap-2 mb-4">

                <Clock className="text-green" size={20} />

                <h4 className="text-lg font-semibold">
                  {t("footer.businessHoursTitle")}
                </h4>

              </div>

              <div className="space-y-2 text-white/70">

                <p>{t("footer.monFri")}</p>
                <p>{t("footer.monFriHours")}</p>

                <p className="pt-2">{t("footer.saturday")}</p>
                <p>{t("footer.saturdayHours")}</p>

                <p className="pt-2">{t("footer.sunday")}</p>
                <p>{t("footer.sundayClosed")}</p>

              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-bold mb-6">
              {t("footer.quickLinksTitle")}
            </h3>

            <div className="space-y-4">

              {[
                [t("footer.linkHome"), "/"],
                [t("footer.linkAbout"), "/about"],
                [t("footer.linkServices"), "/services"],
                [t("footer.linkClients"), "/clients"],
                [t("footer.linkContact"), "/contact"],
              ].map(([name, path]) => (

                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-2 text-white/70 hover:text-gold transition group"
                >
                  {name}

                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                  />

                </Link>

              ))}

            </div>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-2xl font-bold mb-6">
              {t("footer.ourServicesTitle")}
            </h3>

            <div className="space-y-4 text-white/70">

              <p>{t("footer.svcCommercial")}</p>

              <p>{t("footer.svcResidential")}</p>

              <p>{t("footer.svcMaintenance")}</p>

              <p>{t("footer.svcJanitorial")}</p>

              <p>{t("footer.svcDeepClean")}</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold mb-6">
              {t("footer.contactUsTitle")}
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4">

                <Phone className="text-green mt-1" size={20} />

                <div>

                  <p className="font-medium">
                    {t("footer.phoneLabel")}
                  </p>

                  <p className="text-white/70">
                    +1 (403) 458-0219
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <Mail className="text-green mt-1" size={20} />

                <div>

                  <p className="font-medium">
                    {t("footer.emailLabel")}
                  </p>

                  <p className="text-white/70 break-all">
                    ernestine.bissou@hillsatcham.com
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <MapPin className="text-green mt-1" size={20} />

                <div>

                  <p className="font-medium">
                    {t("footer.addressLabel")}
                  </p>

                  <p className="text-white/70">
                    {t("footer.addressLine1")}
                    <br />
                    {t("footer.addressLine2")}
                    <br />
                    {t("footer.addressLine3")}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 mt-16 pt-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-white/60 text-sm text-center md:text-left">
              {t("footer.copyright")}
            </p>

            <p className="text-white/50 text-sm">
              {t("footer.designedWith")}
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}