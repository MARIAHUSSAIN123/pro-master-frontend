import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";
import { getMyNotifications } from "../api/notificationApi";
import Notifications from "./Notifications";

export default function Topbar({
  sidebarOpen,
  setOpen,
}) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Poll for the unread count so the bell reflects new bookings/
  // payments/etc. without needing a page refresh. 30s is frequent
  // enough to feel live without hammering the API.
  useEffect(() => {
    let cancelled = false;

    const loadCount = async () => {
      try {
        const data = await getMyNotifications({ limit: 1 });
        if (!cancelled) setUnreadCount(data?.unreadCount || 0);
      } catch {
        // Silently ignore — the bell just won't update this cycle.
      }
    };

    loadCount();
    const interval = setInterval(loadCount, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Close the dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 border-b border-slate-800 bg-[#101828]/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            onClick={() => setOpen(!sidebarOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-cyan-500 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-white">
              Dashboard
            </h1>

            <p className="hidden text-sm text-slate-400 sm:block">
              Welcome back, Administrator 👋
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <div className="hidden items-center gap-3 rounded-2xl bg-slate-800 px-4 py-3 md:flex">

            <Search
              size={18}
              className="text-cyan-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-48 bg-transparent text-white outline-none placeholder:text-slate-500 xl:w-64"
            />

          </div>

          {/* Notification */}

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((open) => !open)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 transition hover:bg-cyan-500"
            >

              <Bell
                size={20}
                className="text-white"
              />

              {unreadCount > 0 && (
                <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
              )}

            </button>

            {notifOpen && (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] z-40 w-[380px] max-w-[90vw]">
                <Notifications onUnreadCountChange={setUnreadCount} />
              </div>
            )}
          </div>

          {/* Profile */}

          <div className="flex items-center gap-3 rounded-2xl bg-slate-800 px-3 py-2">

            <UserCircle2
              size={38}
              className="text-cyan-400"
            />

            <div className="hidden lg:block">

              <h3 className="font-semibold text-white">
                Admin
              </h3>

              <p className="text-xs text-slate-400">
                Super Administrator
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Mobile Search */}

      <div className="px-4 pb-4 md:hidden">

        <div className="flex items-center gap-3 rounded-2xl bg-slate-800 px-4 py-3">

          <Search
            size={18}
            className="text-cyan-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />

        </div>

      </div>

    </motion.header>
  );
}