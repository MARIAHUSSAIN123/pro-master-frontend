import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function MobileMenu({ closeMenu }) {
  const { t } = useLanguage();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/clients", label: t("nav.clients") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[999] bg-white lg:hidden"
    >
      <div className="flex h-full flex-col justify-center items-center gap-8">

        {links.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <NavLink
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-3xl font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-green"
                    : "text-navy hover:text-green"
                }`
              }
            >
              {item.label}
            </NavLink>
          </motion.div>
        ))}

        <Link
          to="/contact"
          onClick={closeMenu}
          className="mt-8 bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
        >
          Get Quote
        </Link>

      </div>
    </motion.div>
  );
}