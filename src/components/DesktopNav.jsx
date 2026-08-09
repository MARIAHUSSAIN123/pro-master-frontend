import { NavLink, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function DesktopNav() {
  const { t } = useLanguage();

  const links = [
    {
      to: "/",
      label: t("nav.home"),
    },
    {
      to: "/about",
      label: t("nav.about"),
    },
    {
      to: "/services",
      label: t("nav.services"),
    },
    {
      to: "/clients",
      label: t("nav.clients"),
    },
    {
      to: "/contact",
      label: t("nav.contact"),
    },
  ];

  return (
    <div className="hidden lg:flex items-center gap-10">

      {/* Navigation */}

      <div className="flex items-center gap-8">

        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative text-[15px] font-semibold uppercase tracking-wide transition-all duration-300 group ${
                isActive
                  ? "text-green"
                  : "text-navy hover:text-green"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}

                <span
                  className={`absolute left-0 -bottom-2 h-[2px] bg-gold transition-all duration-300 ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}

      </div>

      {/* Search */}

      <button className="w-11 h-11 rounded-full border border-mist flex items-center justify-center hover:bg-green hover:text-white transition-all duration-300">
        <Search size={18} />
      </button>

      {/* CTA */}

      <Link
        to="/contact"
        className="bg-green hover:bg-green-light text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Get Quote
      </Link>

    </div>
  );
}