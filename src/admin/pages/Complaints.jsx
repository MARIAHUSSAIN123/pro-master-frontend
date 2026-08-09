import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2, Search, Pencil } from "lucide-react";
import Layout from "../components/Layout";
import { getComplaints, updateComplaint } from "../api/complaintApi";

const SEVERITY_STYLES = {
  Low: "bg-slate-700 text-slate-300",
  Medium: "bg-amber-500/20 text-amber-400",
  High: "bg-orange-500/20 text-orange-400",
  Critical: "bg-red-500/20 text-red-400",
};

const STATUS_STYLES = {
  Open: "bg-red-500/20 text-red-400",
  "In Progress": "bg-amber-500/20 text-amber-400",
  Resolved: "bg-emerald-500/20 text-emerald-400",
  Closed: "bg-slate-700 text-slate-300",
};

function EditComplaintModal({ open, onClose, onSave, saving, initial }) {
  const [form, setForm] = useState({ status: "Open", severity: "Medium", correctiveAction: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && initial) {
      setForm({
        status: initial.status,
        severity: initial.severity,
        correctiveAction: initial.correctiveAction || "",
      });
      setError("");
    }
  }, [open, initial]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSave(form);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not update complaint.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="w-full max-w-xl rounded-3xl border border-slate-800 bg-[#111827] shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/20 p-3">
                <AlertTriangle className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Update Complaint</h2>
                <p className="text-sm text-slate-400">{initial?.description}</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-xl p-2 hover:bg-slate-800">
              <X className="text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <p className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                {["Open", "In Progress", "Resolved", "Closed"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                {["Low", "Medium", "High", "Critical"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <textarea
              value={form.correctiveAction}
              onChange={(e) => setForm({ ...form, correctiveAction: e.target.value })}
              placeholder="Corrective action taken"
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 duration-300 disabled:opacity-60"
              >
                {saving && <Loader2 size={18} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, [statusFilter]);

  const load = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const data = await getComplaints(statusFilter ? { status: statusFilter } : {});
      setComplaints(data?.complaints || []);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load complaints.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      const data = await updateComplaint(editing._id, formData);
      setComplaints((prev) =>
        prev.map((c) => (c._id === editing._id ? data.complaint : c))
      );
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const filtered = complaints.filter((c) =>
    `${c.description} ${c.customer?.fullName || ""} ${c.booking?.bookingNumber || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center gap-5"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">Complaints</h1>
            <p className="text-slate-400 mt-2">
              Non-conformities and customer complaints raised on bookings.
            </p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3">
            <AlertTriangle className="text-cyan-400" />
            <div>
              <p className="text-slate-400 text-sm">Total</p>
              <h2 className="text-white text-xl font-bold">{complaints.length}</h2>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">
            <h2 className="text-2xl font-bold text-white">Complaint List</h2>
            <div className="flex gap-3 w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">All statuses</option>
                {["Open", "In Progress", "Resolved", "Closed"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="relative w-full lg:w-72">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search complaint, customer..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 text-slate-400">Description</th>
                  <th className="text-left py-4 text-slate-400">Customer</th>
                  <th className="text-left py-4 text-slate-400">Booking</th>
                  <th className="text-left py-4 text-slate-400">Type</th>
                  <th className="text-left py-4 text-slate-400">Severity</th>
                  <th className="text-left py-4 text-slate-400">Status</th>
                  <th className="text-center py-4 text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400">
                      Loading complaints...
                    </td>
                  </tr>
                )}
                {!loading && loadError && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-red-400">
                      {loadError}
                    </td>
                  </tr>
                )}
                {!loading && !loadError && filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400">
                      No complaints found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !loadError &&
                  filtered.map((c) => (
                    <tr key={c._id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 text-white font-medium max-w-xs truncate">
                        {c.description}
                      </td>
                      <td className="py-4 text-slate-300">{c.customer?.fullName || "—"}</td>
                      <td className="py-4 text-slate-400">{c.booking?.bookingNumber || "—"}</td>
                      <td className="py-4 text-slate-300">{c.type}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${SEVERITY_STYLES[c.severity]}`}>
                          {c.severity}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => setEditing(c)}
                            className="p-2 rounded-lg hover:bg-slate-800 text-cyan-400"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <EditComplaintModal
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
        saving={saving}
        initial={editing}
      />
    </Layout>
  );
}
