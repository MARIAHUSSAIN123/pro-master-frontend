import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, X, Loader2, Trash2, MailOpen } from "lucide-react";
import Layout from "../components/Layout";
import {
  getInbox,
  getSentMessages,
  sendMessage,
  sendAnnouncement,
  markMessageAsRead,
  deleteMessage,
} from "../api/messageApi";
import { getDepartments } from "../api/departmentApi";

const ROLES = ["admin", "manager", "employee", "accounting"];

function ComposeModal({ open, onClose, onSave, saving, departments }) {
  const [audience, setAudience] = useState("Direct");
  const [form, setForm] = useState({ recipient: "", role: "", department: "", subject: "", body: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setAudience("Direct");
      setForm({ recipient: "", role: "", department: "", subject: "", body: "" });
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.body.trim()) {
      setError("Message body is required.");
      return;
    }
    if (audience === "Direct" && !form.recipient) {
      setError("Recipient user ID is required for a direct message.");
      return;
    }
    if (audience === "Role" && !form.role) {
      setError("Role is required for a role broadcast.");
      return;
    }
    if (audience === "Department" && !form.department) {
      setError("Department is required for a department broadcast.");
      return;
    }
    try {
      if (audience === "Direct") {
        await onSave.direct({ recipient: form.recipient, subject: form.subject, body: form.body });
      } else {
        await onSave.announcement({
          audience,
          role: audience === "Role" ? form.role : undefined,
          department: audience === "Department" ? form.department : undefined,
          subject: form.subject,
          body: form.body,
        });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Could not send message.");
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
                <MessageSquare className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">New Message</h2>
                <p className="text-sm text-slate-400">Direct message or team announcement</p>
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

            <div className="flex gap-2">
              {["Direct", "Role", "Department", "All"].map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`px-4 py-2 rounded-lg text-sm border ${
                    audience === a
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                      : "border-slate-700 text-slate-400"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            {audience === "Direct" && (
              <input
                value={form.recipient}
                onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                placeholder="Recipient user ID"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            )}

            {audience === "Role" && (
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">Select role...</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            )}

            {audience === "Department" && (
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">Select department...</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>{d.departmentName}</option>
                ))}
              </select>
            )}

            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Subject (optional)"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Message"
              rows={4}
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
                Send
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Messages() {
  const [tab, setTab] = useState("inbox");
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [composeOpen, setComposeOpen] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const [inboxRes, sentRes, deptRes] = await Promise.all([
        getInbox(),
        getSentMessages(),
        getDepartments(),
      ]);
      setInbox(inboxRes?.messages || []);
      setSent(sentRes?.messages || []);
      setDepartments(deptRes?.departments || []);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load messages.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendDirect = async (payload) => {
    setSending(true);
    try {
      await sendMessage(payload);
      setComposeOpen(false);
      load();
    } finally {
      setSending(false);
    }
  };

  const handleSendAnnouncement = async (payload) => {
    setSending(true);
    try {
      await sendAnnouncement(payload);
      setComposeOpen(false);
      load();
    } finally {
      setSending(false);
    }
  };

  const handleMarkRead = async (id) => {
    await markMessageAsRead(id);
    setInbox((prev) =>
      prev.map((m) => (m._id === id ? { ...m, readBy: [...(m.readBy || []), { user: "me" }] } : m))
    );
  };

  const handleDelete = async (id) => {
    await deleteMessage(id);
    setInbox((prev) => prev.filter((m) => m._id !== id));
    setSent((prev) => prev.filter((m) => m._id !== id));
  };

  const list = tab === "inbox" ? inbox : sent;

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center gap-5"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">Messages</h1>
            <p className="text-slate-400 mt-2">
              Internal messaging and announcements between managers and agents.
            </p>
          </div>

          <button
            onClick={() => setComposeOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 rounded-xl text-white font-semibold hover:scale-105 duration-300"
          >
            <Plus size={20} />
            New Message
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
        >
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab("inbox")}
              className={`px-5 py-2 rounded-xl text-sm font-semibold ${
                tab === "inbox" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              Inbox ({inbox.length})
            </button>
            <button
              onClick={() => setTab("sent")}
              className={`px-5 py-2 rounded-xl text-sm font-semibold ${
                tab === "sent" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              Sent ({sent.length})
            </button>
          </div>

          {loading && <p className="text-center py-10 text-slate-400">Loading messages...</p>}
          {!loading && loadError && <p className="text-center py-10 text-red-400">{loadError}</p>}
          {!loading && !loadError && list.length === 0 && (
            <p className="text-center py-10 text-slate-400">No messages here.</p>
          )}

          {!loading && !loadError && (
            <div className="space-y-3">
              {list.map((m) => (
                <div
                  key={m._id}
                  className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl px-5 py-4"
                >
                  <div>
                    <p className="text-white font-medium">
                      {m.subject || "(no subject)"}{" "}
                      {m.isAnnouncement && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                          Announcement
                        </span>
                      )}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">{m.body}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      {tab === "inbox"
                        ? `From ${m.sender?.fullName || "Unknown"}`
                        : `To ${m.audience}${m.recipient?.fullName ? " · " + m.recipient.fullName : ""}`}
                      {" · "}
                      {new Date(m.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {tab === "inbox" && (
                      <button
                        onClick={() => handleMarkRead(m._id)}
                        className="p-2 rounded-lg hover:bg-slate-800 text-cyan-400"
                        title="Mark as read"
                      >
                        <MailOpen size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="p-2 rounded-lg hover:bg-slate-800 text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSave={{ direct: handleSendDirect, announcement: handleSendAnnouncement }}
        saving={sending}
        departments={departments}
      />
    </Layout>
  );
}
