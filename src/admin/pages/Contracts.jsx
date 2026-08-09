import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Pencil,
  Ban,
  X,
  Loader2,
  Search,
  PlayCircle,
} from "lucide-react";
import Layout from "../components/Layout";
import {
  getContracts,
  createContract,
  updateContract,
  cancelContract,
  runRecurringBillingNow,
} from "../api/contractApi";
import { getCustomers } from "../api/customerApi";
import { getSites } from "../api/siteApi";
import { getServices } from "../api/serviceApi";

const EMPTY_FORM = {
  contractNumber: "",
  customer: "",
  site: "",
  services: [],
  frequency: "Monthly",
  rate: "",
  billingCycle: "Monthly",
  startDate: "",
  endDate: "",
  notes: "",
};

const FREQUENCIES = ["Daily", "Weekly", "Bi-Weekly", "Monthly", "Quarterly", "One-Time"];
const BILLING_CYCLES = ["Weekly", "Monthly", "Quarterly", "Annually"];

function ContractModal({ open, onClose, onSave, saving, customers, sites, services, initial }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              ...initial,
              customer: initial.customer?._id || initial.customer,
              site: initial.site?._id || initial.site,
              services: (initial.services || []).map((s) => s._id || s),
              startDate: initial.startDate ? initial.startDate.slice(0, 10) : "",
              endDate: initial.endDate ? initial.endDate.slice(0, 10) : "",
            }
          : EMPTY_FORM
      );
      setError("");
    }
  }, [open, initial]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleService = (id) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.customer || !form.site || !form.frequency || !form.rate || !form.startDate) {
      setError("Customer, site, frequency, rate, and start date are required.");
      return;
    }
    if (!initial && !form.contractNumber) {
      setError("Contract number is required.");
      return;
    }
    try {
      await onSave(form);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not save contract.");
    }
  };

  const sitesForCustomer = sites.filter(
    (s) => (s.customer?._id || s.customer) === form.customer
  );

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
          className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#111827] shadow-2xl my-8"
        >
          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/20 p-3">
                <FileText className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {initial ? "Edit Contract" : "Add Contract"}
                </h2>
                <p className="text-sm text-slate-400">Recurring service agreement</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {!initial && (
                <input
                  name="contractNumber"
                  value={form.contractNumber}
                  onChange={handleChange}
                  placeholder="Contract number (e.g. CT-0001)"
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                />
              )}

              <select
                name="customer"
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value, site: "" })}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">Select customer...</option>
                {customers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.fullName || c.companyName}
                  </option>
                ))}
              </select>

              <select
                name="site"
                value={form.site}
                onChange={handleChange}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">Select site...</option>
                {sitesForCustomer.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.siteName}
                  </option>
                ))}
              </select>

              <select
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                {FREQUENCIES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>

              <input
                name="rate"
                type="number"
                min="0"
                value={form.rate}
                onChange={handleChange}
                placeholder="Rate"
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <select
                name="billingCycle"
                value={form.billingCycle}
                onChange={handleChange}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                {BILLING_CYCLES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <div className="sm:col-span-2">
                <p className="text-slate-400 text-sm mb-2">Included Services</p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s._id}
                      onClick={() => toggleService(s._id)}
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        form.services.includes(s._id)
                          ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                          : "border-slate-700 text-slate-400"
                      }`}
                    >
                      {s.serviceName}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes"
                rows={2}
                className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

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
                {initial ? "Save Changes" : "Create Contract"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const STATUS_STYLES = {
  Active: "bg-emerald-500/20 text-emerald-400",
  Paused: "bg-amber-500/20 text-amber-400",
  Cancelled: "bg-slate-700 text-slate-300",
  Expired: "bg-red-500/20 text-red-400",
};

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sites, setSites] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [saving, setSaving] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [runningBilling, setRunningBilling] = useState(false);
  const [billingMsg, setBillingMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const [contractsRes, customersRes, sitesRes, servicesRes] = await Promise.all([
        getContracts(),
        getCustomers(),
        getSites(),
        getServices(),
      ]);
      setContracts(contractsRes?.contracts || []);
      setCustomers(customersRes?.customers || []);
      setSites(sitesRes?.sites || []);
      setServices(servicesRes?.services || []);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load contracts.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      if (editingContract) {
        const data = await updateContract(editingContract._id, formData);
        setContracts((prev) =>
          prev.map((c) => (c._id === editingContract._id ? data.contract : c))
        );
      } else {
        const data = await createContract(formData);
        setContracts((prev) => [data.contract, ...prev]);
      }
      setModalOpen(false);
      setEditingContract(null);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      const data = await cancelContract(cancelTarget._id);
      setContracts((prev) =>
        prev.map((c) => (c._id === cancelTarget._id ? data.contract : c))
      );
      setCancelTarget(null);
    } finally {
      setCancelling(false);
    }
  };

  const handleRunBilling = async () => {
    setRunningBilling(true);
    setBillingMsg("");
    try {
      const data = await runRecurringBillingNow();
      setBillingMsg(data?.message || "Billing cycle executed.");
      load();
    } catch (error) {
      setBillingMsg(error?.response?.data?.message || "Could not run billing.");
    } finally {
      setRunningBilling(false);
    }
  };

  const filtered = contracts.filter((c) =>
    `${c.contractNumber} ${c.customer?.fullName || ""} ${c.site?.siteName || ""}`
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
            <h1 className="text-4xl font-bold text-white">Contracts</h1>
            <p className="text-slate-400 mt-2">
              Recurring contracts, rates, and billing schedule.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3">
              <FileText className="text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Contracts</p>
                <h2 className="text-white text-xl font-bold">{contracts.length}</h2>
              </div>
            </div>

            <button
              onClick={handleRunBilling}
              disabled={runningBilling}
              title="Manually run the recurring billing cycle now"
              className="flex items-center gap-2 border border-slate-700 px-5 rounded-xl text-slate-200 hover:bg-slate-800 disabled:opacity-60"
            >
              {runningBilling ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <PlayCircle size={20} />
              )}
              Run Billing Now
            </button>

            <button
              onClick={() => {
                setEditingContract(null);
                setModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 rounded-xl text-white font-semibold hover:scale-105 duration-300"
            >
              <Plus size={20} />
              Add Contract
            </button>
          </div>
        </motion.div>

        {billingMsg && (
          <p className="rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-3 text-sm text-cyan-300">
            {billingMsg}
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">
            <h2 className="text-2xl font-bold text-white">Contract List</h2>
            <div className="relative w-full lg:w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contract, customer, site..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 text-slate-400">Contract #</th>
                  <th className="text-left py-4 text-slate-400">Customer</th>
                  <th className="text-left py-4 text-slate-400">Site</th>
                  <th className="text-left py-4 text-slate-400">Frequency</th>
                  <th className="text-left py-4 text-slate-400">Rate</th>
                  <th className="text-left py-4 text-slate-400">Next Billing</th>
                  <th className="text-left py-4 text-slate-400">Status</th>
                  <th className="text-center py-4 text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400">
                      Loading contracts...
                    </td>
                  </tr>
                )}
                {!loading && loadError && (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-red-400">
                      {loadError}
                    </td>
                  </tr>
                )}
                {!loading && !loadError && filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400">
                      No contracts found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !loadError &&
                  filtered.map((c) => (
                    <tr key={c._id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 text-white font-medium">{c.contractNumber}</td>
                      <td className="py-4 text-slate-300">
                        {c.customer?.fullName || c.customer?.companyName || "—"}
                      </td>
                      <td className="py-4 text-slate-300">{c.site?.siteName || "—"}</td>
                      <td className="py-4 text-slate-300">{c.frequency}</td>
                      <td className="py-4 text-slate-300">${c.rate}</td>
                      <td className="py-4 text-slate-400">
                        {c.nextBillingDate ? new Date(c.nextBillingDate).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            STATUS_STYLES[c.status] || "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              setEditingContract(c);
                              setModalOpen(true);
                            }}
                            className="p-2 rounded-lg hover:bg-slate-800 text-cyan-400"
                          >
                            <Pencil size={18} />
                          </button>
                          {c.status !== "Cancelled" && (
                            <button
                              onClick={() => setCancelTarget(c)}
                              className="p-2 rounded-lg hover:bg-slate-800 text-red-400"
                              title="Cancel contract"
                            >
                              <Ban size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <ContractModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingContract(null);
        }}
        onSave={handleSave}
        saving={saving}
        customers={customers}
        sites={sites}
        services={services}
        initial={editingContract}
      />

      <AnimatePresence>
        {cancelTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#111827] p-6"
            >
              <h3 className="text-xl font-bold text-white mb-2">Cancel Contract</h3>
              <p className="text-slate-400 mb-6">
                Cancel contract{" "}
                <span className="text-white">{cancelTarget.contractNumber}</span>? No
                further invoices will be auto-generated.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCancelTarget(null)}
                  className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="flex items-center gap-2 bg-red-600 px-5 py-3 rounded-xl text-white font-semibold hover:bg-red-500 disabled:opacity-60"
                >
                  {cancelling && <Loader2 size={18} className="animate-spin" />}
                  Cancel Contract
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
