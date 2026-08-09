import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, FileText, Receipt, LogOut, User } from "lucide-react";
import { portalLogout, getStoredPortalUser } from "../api/authApi";

const navItems = [
  { to: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portal/bookings", label: "Bookings", icon: Calendar },
  { to: "/portal/quotes", label: "Quotes", icon: FileText },
  { to: "/portal/invoices", label: "Invoices", icon: Receipt },
];

export default function PortalLayout({ children }) {
  const navigate = useNavigate();
  const user = getStoredPortalUser();

  const handleLogout = () => {
    portalLogout();
    navigate("/portal/login");
  };

  return (
    <div className="min-h-screen bg-[#0B1220]">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#101828]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Pro Master
            </h1>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 sm:flex">
              <User size={16} className="text-cyan-400" />
              {user?.fullName || "Customer"}
            </div>
            <button
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-red-500/20 hover:text-red-400"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-slate-800 px-4 py-2 md:hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
    </div>
  );
}