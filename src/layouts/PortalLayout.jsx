import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, FileText, LogOut, User } from "lucide-react";
import { getStoredCustomer, customerLogout } from "../api/customerAuthApi";
import { getMyCart } from "../api/customerQuoteApi";

export default function PortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const customer = getStoredCustomer();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    getMyCart()
      .then((data) => mounted && setCartCount(data?.count || 0))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  const handleLogout = () => {
    customerLogout();
    navigate("/portal/login");
  };

  const navLinkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${
      location.pathname === path
        ? "bg-navy text-cream"
        : "text-navy hover:bg-navy/10"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/portal/quotes" className="font-bold text-xl text-navy">
            Pro Master <span className="font-normal text-gray-400">| My Account</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link to="/portal/quotes" className={navLinkClass("/portal/quotes")}>
              <FileText size={18} /> My Quotes
            </Link>

            <Link to="/portal/cart" className={`${navLinkClass("/portal/cart")} relative`}>
              <ShoppingCart size={18} /> Cart
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <span className="flex items-center gap-2 px-4 py-2 text-gray-500 text-sm">
              <User size={16} /> {customer?.fullName?.split(" ")[0]}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-500 hover:bg-gray-100 transition"
            >
              <LogOut size={18} />
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
