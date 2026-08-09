import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import { getAuditLogs } from "../api/auditLogApi";

export default function AuditLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [actionFilter, setActionFilter] = useState("");

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, actionFilter]);

  const load = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const data = await getAuditLogs({
        page,
        limit: 20,
        ...(actionFilter ? { action: actionFilter } : {}),
      });
      setLogs(data?.logs || []);
      setTotalPages(data?.totalPages || 1);
      setTotalLogs(data?.totalLogs || 0);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load audit logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center gap-5"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">Audit Log</h1>
            <p className="text-slate-400 mt-2">
              Connection history and record of sensitive actions across the system.
            </p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3">
            <ShieldCheck className="text-cyan-400" />
            <div>
              <p className="text-slate-400 text-sm">Total Entries</p>
              <h2 className="text-white text-xl font-bold">{totalLogs}</h2>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <input
              value={actionFilter}
              onChange={(e) => {
                setPage(1);
                setActionFilter(e.target.value);
              }}
              placeholder="Filter by action (e.g. LOGIN, ROLE_CHANGED)"
              className="w-full lg:w-80 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 text-slate-400">User</th>
                  <th className="text-left py-4 text-slate-400">Action</th>
                  <th className="text-left py-4 text-slate-400">Target</th>
                  <th className="text-left py-4 text-slate-400">IP Address</th>
                  <th className="text-left py-4 text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400">
                      Loading audit log...
                    </td>
                  </tr>
                )}
                {!loading && loadError && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-red-400">
                      {loadError}
                    </td>
                  </tr>
                )}
                {!loading && !loadError && logs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400">
                      No audit entries found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !loadError &&
                  logs.map((log) => (
                    <tr key={log._id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 text-white font-medium">
                        {log.user?.fullName || "System"}
                        {log.user?.role && (
                          <span className="ml-2 text-xs text-slate-500">({log.user.role})</span>
                        )}
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-4 text-slate-400">{log.targetType || "—"}</td>
                      <td className="py-4 text-slate-500">{log.ipAddress || "—"}</td>
                      <td className="py-4 text-slate-400">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-slate-500 text-sm">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
