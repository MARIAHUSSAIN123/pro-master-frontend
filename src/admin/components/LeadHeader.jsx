import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

const STATUS_TABS = ["All", "New", "Contacted", "Converted", "Rejected"];

export default function LeadHeader({ total = 0, newCount = 0, statusFilter, onStatusFilterChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row justify-between items-center gap-5"
    >
      <div>
        <h1 className="text-4xl font-bold text-white">Leads</h1>
        <p className="text-slate-400 mt-2">
          Quote requests submitted from the website.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3">
          <Inbox className="text-cyan-400" />
          <div>
            <p className="text-slate-400 text-sm">New Leads</p>
            <h2 className="text-white text-xl font-bold">{newCount}</h2>
          </div>
        </div>

        <div className="flex bg-[#111827] border border-slate-800 rounded-xl p-1 gap-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onStatusFilterChange?.(tab === "All" ? "" : tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                (statusFilter || "All") === tab || (!statusFilter && tab === "All")
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
