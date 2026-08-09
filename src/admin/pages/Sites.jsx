import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Pencil, Trash2, X, Loader2, Search } from "lucide-react";
import Layout from "../components/Layout";
import {
  getSites,
  createSite,
  updateSite,
  deleteSite,
} from "../api/siteApi";
import { getCustomers } from "../api/customerApi";

const EMPTY_FORM = {
  customer: "",
  siteName: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  accessInstructions: "",
  specialInstructions: "",
};

function SiteModal({ open, onClose, onSave, saving, customers, initial }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initial || EMPTY_FORM);
      setError("");
    }
  }, [open, initial]);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.customer || !form.siteName || !form.address || !form.city) {
      setError("Customer, site name, address, and city are required.");
      return;
    }
    try {
      await onSave(form);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not save site.");
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
          className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#111827] shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/20 p-3">
                <MapPin className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {initial ? "Edit Site" : "Add Site"}
                </h2>
                <p className="text-sm text-slate-400">
                  Service address for a client
                </p>
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
              <select
                name="customer"
                value={form.customer}
                onChange={handleChange}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">Select customer...</option>
                {customers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.fullName || c.companyName}
                  </option>
                ))}
              </select>

              <input
                name="siteName"
                value={form.siteName}
                onChange={handleChange}
                placeholder="Site name (e.g. Main Office)"
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <input
                name="province"
                value={form.province}
                onChange={handleChange}
                placeholder="Province / State"
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <textarea
                name="accessInstructions"
                value={form.accessInstructions}
                onChange={handleChange}
                placeholder="Access instructions (gate code, key location, parking...)"
                rows={2}
                className="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

              <textarea
                name="specialInstructions"
                value={form.specialInstructions}
                onChange={handleChange}
                placeholder="Special instructions for the agent"
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
                {initial ? "Save Changes" : "Create Site"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Sites() {
  const [sites, setSites] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const [sitesRes, customersRes] = await Promise.all([
        getSites(),
        getCustomers(),
      ]);
      setSites(sitesRes?.sites || []);
      setCustomers(customersRes?.customers || []);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load sites.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      if (editingSite) {
        const data = await updateSite(editingSite._id, formData);
        setSites((prev) =>
          prev.map((s) => (s._id === editingSite._id ? data.site : s))
        );
      } else {
        const data = await createSite(formData);
        setSites((prev) => [data.site, ...prev]);
      }
      setModalOpen(false);
      setEditingSite(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSite(deleteTarget._id);
      setSites((prev) => prev.filter((s) => s._id !== deleteTarget._id));
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = sites.filter((s) =>
    `${s.siteName} ${s.city} ${s.customer?.fullName || ""}`
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
            <h1 className="text-4xl font-bold text-white">Sites</h1>
            <p className="text-slate-400 mt-2">
              Manage client service addresses and site access details.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3">
              <MapPin className="text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Sites</p>
                <h2 className="text-white text-xl font-bold">{sites.length}</h2>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingSite(null);
                setModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 rounded-xl text-white font-semibold hover:scale-105 duration-300"
            >
              <Plus size={20} />
              Add Site
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">
            <h2 className="text-2xl font-bold text-white">Site List</h2>
            <div className="relative w-full lg:w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search site, city, customer..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 text-slate-400">Site</th>
                  <th className="text-left py-4 text-slate-400">Customer</th>
                  <th className="text-left py-4 text-slate-400">City</th>
                  <th className="text-left py-4 text-slate-400">Address</th>
                  <th className="text-left py-4 text-slate-400">Status</th>
                  <th className="text-center py-4 text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      Loading sites...
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
                {!loading && !loadError && filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      No sites found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !loadError &&
                  filtered.map((s) => (
                    <tr key={s._id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 text-white font-medium">{s.siteName}</td>
                      <td className="py-4 text-slate-300">
                        {s.customer?.fullName || s.customer?.companyName || "—"}
                      </td>
                      <td className="py-4 text-slate-300">{s.city}</td>
                      <td className="py-4 text-slate-400">{s.address}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            s.isActive
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {s.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              setEditingSite(s);
                              setModalOpen(true);
                            }}
                            className="p-2 rounded-lg hover:bg-slate-800 text-cyan-400"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(s)}
                            className="p-2 rounded-lg hover:bg-slate-800 text-red-400"
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
      </div>

      <SiteModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingSite(null);
        }}
        onSave={handleSave}
        saving={saving}
        customers={customers}
        initial={editingSite}
      />

      <AnimatePresence>
        {deleteTarget && (
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
              <h3 className="text-xl font-bold text-white mb-2">Delete Site</h3>
              <p className="text-slate-400 mb-6">
                Are you sure you want to delete{" "}
                <span className="text-white">{deleteTarget.siteName}</span>? This
                cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 bg-red-600 px-5 py-3 rounded-xl text-white font-semibold hover:bg-red-500 disabled:opacity-60"
                >
                  {deleting && <Loader2 size={18} className="animate-spin" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
