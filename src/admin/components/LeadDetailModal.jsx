import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function LeadDetailModal({
  open,
  onClose,
  lead,
  onUpdateStatus,
  onConvert,
  saving,
}) {
  const [status, setStatus] = useState("New");
  const [internalNotes, setInternalNotes] = useState("");
  const [showConvertForm, setShowConvertForm] = useState(false);
  const [convertForm, setConvertForm] = useState({
    address: "",
    city: "",
    province: "",
    postalCode: "",
    billingMethod: "Cash",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status || "New");
      setInternalNotes(lead.internalNotes || "");
      setConvertForm({
        address: lead.address || "",
        city: lead.city || "",
        province: "",
        postalCode: "",
        billingMethod: "Cash",
      });
      setShowConvertForm(false);
      setError("");
    }
  }, [lead]);

  if (!open || !lead) return null;

  const handleSaveStatus = async () => {
    setError("");
    try {
      await onUpdateStatus?.(lead._id, { status, internalNotes });
    } catch (err) {
      setError(err?.response?.data?.message || "Could not update lead.");
    }
  };

  const handleConvert = async () => {
    setError("");
    if (!convertForm.address || !convertForm.city) {
      setError("Address and city are required to create the customer.");
      return;
    }
    try {
      await onConvert?.(lead._id, convertForm);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not convert lead.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#111827] border border-slate-800 rounded-3xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-white mb-1">{lead.fullName}</h2>
          <p className="text-slate-500 mb-6">
            {lead.customerType}
            {lead.companyName ? ` — ${lead.companyName}` : ""}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail size={16} className="text-cyan-400" /> {lead.email}
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Phone size={16} className="text-cyan-400" /> {lead.phone}
            </div>
            {(lead.address || lead.city) && (
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin size={16} className="text-cyan-400" />
                {[lead.address, lead.city].filter(Boolean).join(", ")}
              </div>
            )}
            {lead.message && (
              <div className="flex items-start gap-3 text-slate-300">
                <MessageSquare size={16} className="text-cyan-400 mt-1" />
                <p>{lead.message}</p>
              </div>
            )}
          </div>

          {lead.status === "Converted" ? (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4">
              This lead has already been converted to a customer.
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="text-slate-400 text-sm mb-2 block">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="text-slate-400 text-sm mb-2 block">
                  Internal Notes
                </label>
                <textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                  placeholder="Follow-up notes, call summary, etc."
                />
              </div>

              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleSaveStatus}
                  disabled={saving}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowConvertForm((v) => !v)}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 duration-300 text-white font-semibold py-3 rounded-xl transition"
                >
                  Convert to Customer
                </button>
              </div>

              {showConvertForm && (
                <div className="border-t border-slate-800 pt-5 space-y-3">
                  <input
                    value={convertForm.address}
                    onChange={(e) =>
                      setConvertForm((f) => ({ ...f, address: e.target.value }))
                    }
                    placeholder="Address *"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={convertForm.city}
                      onChange={(e) =>
                        setConvertForm((f) => ({ ...f, city: e.target.value }))
                      }
                      placeholder="City *"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                    />
                    <input
                      value={convertForm.postalCode}
                      onChange={(e) =>
                        setConvertForm((f) => ({ ...f, postalCode: e.target.value }))
                      }
                      placeholder="Postal Code"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    onClick={handleConvert}
                    disabled={saving}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
                  >
                    {saving ? "Converting..." : "Confirm Conversion"}
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
