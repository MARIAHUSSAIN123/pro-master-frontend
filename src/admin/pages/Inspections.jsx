import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Plus, Eye, X, Loader2, Check, X as XIcon } from "lucide-react";
import Layout from "../components/Layout";
import {
  getInspections,
  createInspection,
  updateInspection,
} from "../api/inspectionApi";
import { getBookings } from "../api/bookingApi";
import { getChecklistTemplates } from "../api/checklistApi";

const STATUS_STYLES = {
  Pending: "bg-amber-500/20 text-amber-400",
  Pass: "bg-emerald-500/20 text-emerald-400",
  Fail: "bg-red-500/20 text-red-400",
};

function StartInspectionModal({ open, onClose, onSave, saving, bookings, templates }) {
  const [booking, setBooking] = useState("");
  const [checklistTemplate, setChecklistTemplate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setBooking("");
      setChecklistTemplate("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!booking) {
      setError("Booking is required.");
      return;
    }
    try {
      await onSave({ booking, checklistTemplate: checklistTemplate || undefined });
    } catch (err) {
      setError(err?.response?.data?.message || "Could not start inspection.");
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
                <ClipboardCheck className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Start Inspection</h2>
                <p className="text-sm text-slate-400">Run a quality checklist against a booking</p>
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

            <select
              value={booking}
              onChange={(e) => setBooking(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="">Select booking...</option>
              {bookings.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.bookingNumber} — {b.customer?.fullName || ""}
                </option>
              ))}
            </select>

            <select
              value={checklistTemplate}
              onChange={(e) => setChecklistTemplate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="">Auto-select template for the service</option>
              {templates.map((t) => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>

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
                Start Inspection
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InspectionDetailModal({ open, onClose, onSave, saving, inspection }) {
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open && inspection) {
      setItems(inspection.items || []);
      setNotes(inspection.notes || "");
    }
  }, [open, inspection]);

  if (!open || !inspection) return null;

  const setPassed = (idx, value) => {
    const next = [...items];
    next[idx] = { ...next[idx], passed: value };
    setItems(next);
  };

  const handleSave = async () => {
    await onSave({
      items: items.map((i) => ({ label: i.label, passed: i.passed, notes: i.notes || "" })),
      notes,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="w-full max-w-xl rounded-3xl border border-slate-800 bg-[#111827] shadow-2xl my-8"
        >
          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Inspection — {inspection.booking?.bookingNumber}
              </h2>
              <p className="text-sm text-slate-400">
                Score: {inspection.score}% · Status: {inspection.status}
              </p>
            </div>
            <button onClick={onClose} className="rounded-xl p-2 hover:bg-slate-800">
              <X className="text-slate-400" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="text-white">
                      {item.label} {item.required && <span className="text-red-400">*</span>}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPassed(idx, true)}
                      className={`p-2 rounded-lg ${
                        item.passed === true ? "bg-emerald-500/30 text-emerald-400" : "text-slate-500 hover:bg-slate-800"
                      }`}
                    >
                      <Check size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPassed(idx, false)}
                      className={`p-2 rounded-lg ${
                        item.passed === false ? "bg-red-500/30 text-red-400" : "text-slate-500 hover:bg-slate-800"
                      }`}
                    >
                      <XIcon size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Inspection notes"
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 duration-300 disabled:opacity-60"
              >
                {saving && <Loader2 size={18} className="animate-spin" />}
                Save Results
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Inspections() {
  const [inspections, setInspections] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [startOpen, setStartOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const [detail, setDetail] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const [inspRes, bookingsRes, templatesRes] = await Promise.all([
        getInspections(),
        getBookings(),
        getChecklistTemplates(),
      ]);
      setInspections(inspRes?.inspections || []);
      setBookings(bookingsRes?.bookings || []);
      setTemplates(templatesRes?.templates || []);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load inspections.");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (payload) => {
    setStarting(true);
    try {
      const data = await createInspection(payload);
      setInspections((prev) => [data.inspection, ...prev]);
      setStartOpen(false);
    } finally {
      setStarting(false);
    }
  };

  const handleUpdate = async (payload) => {
    setSaving(true);
    try {
      const data = await updateInspection(detail._id, payload);
      setInspections((prev) =>
        prev.map((i) => (i._id === detail._id ? data.inspection : i))
      );
      setDetail(null);
    } finally {
      setSaving(false);
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
            <h1 className="text-4xl font-bold text-white">Inspections</h1>
            <p className="text-slate-400 mt-2">
              Quality checklists run against completed bookings.
            </p>
          </div>

          <button
            onClick={() => setStartOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 rounded-xl text-white font-semibold hover:scale-105 duration-300"
          >
            <Plus size={20} />
            Start Inspection
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 text-slate-400">Booking</th>
                  <th className="text-left py-4 text-slate-400">Service</th>
                  <th className="text-left py-4 text-slate-400">Template</th>
                  <th className="text-left py-4 text-slate-400">Score</th>
                  <th className="text-left py-4 text-slate-400">Status</th>
                  <th className="text-center py-4 text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      Loading inspections...
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
                {!loading && !loadError && inspections.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      No inspections found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !loadError &&
                  inspections.map((i) => (
                    <tr key={i._id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 text-white font-medium">{i.booking?.bookingNumber || "—"}</td>
                      <td className="py-4 text-slate-300">{i.service?.serviceName || "—"}</td>
                      <td className="py-4 text-slate-400">{i.checklistTemplate?.name || "—"}</td>
                      <td className="py-4 text-slate-300">{i.score}%</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[i.status]}`}>
                          {i.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => setDetail(i)}
                            className="p-2 rounded-lg hover:bg-slate-800 text-cyan-400"
                          >
                            <Eye size={18} />
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

      <StartInspectionModal
        open={startOpen}
        onClose={() => setStartOpen(false)}
        onSave={handleStart}
        saving={starting}
        bookings={bookings}
        templates={templates}
      />

      <InspectionDetailModal
        open={!!detail}
        onClose={() => setDetail(null)}
        onSave={handleUpdate}
        saving={saving}
        inspection={detail}
      />
    </Layout>
  );
}
