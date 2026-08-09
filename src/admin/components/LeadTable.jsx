import { motion } from "framer-motion";
import { Mail, Phone, Building2, ArrowRightCircle, Trash2 } from "lucide-react";

const STATUS_STYLES = {
  New: "bg-amber-500/20 text-amber-400",
  Contacted: "bg-blue-500/20 text-blue-400",
  Converted: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
};

export default function LeadTable({
  leads = [],
  loading = false,
  loadError = "",
  onView,
  onDelete,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-8">Quote Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-4 text-slate-400">Contact</th>
              <th className="text-left py-4 text-slate-400">Type</th>
              <th className="text-left py-4 text-slate-400">Service Interest</th>
              <th className="text-left py-4 text-slate-400">Received</th>
              <th className="text-left py-4 text-slate-400">Status</th>
              <th className="text-center py-4 text-slate-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-400">
                  Loading leads...
                </td>
              </tr>
            )}

            {!loading && loadError && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-red-400">
                  {loadError}
                </td>
              </tr>
            )}

            {!loading && !loadError && leads.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-400">
                  No leads found.
                </td>
              </tr>
            )}

            {!loading &&
              !loadError &&
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-slate-800 hover:bg-slate-900 transition-all duration-300"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {lead.fullName?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{lead.fullName}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Mail size={14} /> {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Phone size={14} /> {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Building2 size={16} />
                      {lead.customerType}
                      {lead.companyName ? ` — ${lead.companyName}` : ""}
                    </div>
                  </td>

                  <td className="text-slate-300 max-w-[220px] truncate">
                    {lead.serviceInterest || "-"}
                  </td>

                  <td className="text-slate-400 text-sm">
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        STATUS_STYLES[lead.status] || "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onView?.(lead)}
                        className="w-10 h-10 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-white transition flex items-center justify-center"
                        title="View / Convert"
                      >
                        <ArrowRightCircle size={18} />
                      </button>

                      <button
                        onClick={() => onDelete?.(lead)}
                        className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white transition flex items-center justify-center"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
