import { useEffect, useState } from "react";
import {
  FileText,
  Loader2,
  AlertCircle,
  Check,
  X as XIcon,
  Bookmark,
  CreditCard,
  Clock,
} from "lucide-react";
import PortalLayout from "../components/PortalLayout";
import StatusBadge from "../components/StatusBadge";
import CheckoutModal from "../components/CheckoutModal";
import { getMyQuotes, respondToQuote, saveQuoteToCart } from "../api/quoteApi";

export default function PortalQuotes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [checkoutQuote, setCheckoutQuote] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyQuotes();
      if (data?.success) setQuotes(data.quotes);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAccept = async (quote) => {
    setActionError("");
    setBusyId(quote._id);
    try {
      const data = await respondToQuote(quote._id, { decision: "Accepted" });
      if (data?.success) {
        // Straight into scheduling + payment once accepted.
        setCheckoutQuote(data.quote);
        await load();
      } else {
        setActionError(data?.message || "Could not accept quote.");
      }
    } catch (err) {
      setActionError(err.response?.data?.message || "Could not accept quote.");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (quote) => {
    setActionError("");
    setBusyId(quote._id);
    try {
      const data = await respondToQuote(quote._id, {
        decision: "Rejected",
        rejectionReason,
      });
      if (data?.success) {
        setRejectingId(null);
        setRejectionReason("");
        await load();
      } else {
        setActionError(data?.message || "Could not reject quote.");
      }
    } catch (err) {
      setActionError(err.response?.data?.message || "Could not reject quote.");
    } finally {
      setBusyId(null);
    }
  };

  const handleSave = async (quote) => {
    setActionError("");
    setBusyId(quote._id);
    try {
      const data = await saveQuoteToCart(quote._id);
      if (data?.success) {
        await load();
      } else {
        setActionError(data?.message || "Could not save quote.");
      }
    } catch (err) {
      setActionError(err.response?.data?.message || "Could not save quote.");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          <Loader2 className="mr-3 animate-spin" size={22} />
          Loading quotes...
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="mb-6 flex items-center gap-3">
        <FileText className="text-cyan-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Quotes</h2>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {actionError && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
          <AlertCircle size={20} />
          {actionError}
        </div>
      )}

      {quotes.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#111827] py-16 text-center text-slate-500">
          No quotes yet.
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div key={q._id} className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{q.quoteNumber}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={12} />
                    Valid until {new Date(q.validUntil).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={q.status} />
              </div>

              {/* Line items */}
              <div className="mb-4 space-y-1.5 border-t border-slate-800 pt-4">
                {q.items?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      {item.serviceName} × {item.quantity}
                    </span>
                    <span className="text-slate-400">${item.lineTotal?.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4 flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="text-sm text-slate-400">Total</span>
                <span className="text-lg font-bold text-white">
                  ${q.totalAmount?.toFixed(2)}
                </span>
              </div>

              {q.status === "Rejected" && q.rejectionReason && (
                <p className="mb-3 rounded-xl bg-slate-900/60 px-4 py-2.5 text-sm text-slate-400">
                  Reason: {q.rejectionReason}
                </p>
              )}

              {/* Actions — only when the customer can still act on this quote */}
              {(q.status === "Sent" || q.status === "Saved") && (
                <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                  {q.status === "Sent" && rejectingId !== q._id && (
                    <>
                      <button
                        onClick={() => handleAccept(q)}
                        disabled={busyId === q._id}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-60"
                      >
                        {busyId === q._id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Check size={15} />
                        )}
                        Accept
                      </button>
                      <button
                        onClick={() => setRejectingId(q._id)}
                        disabled={busyId === q._id}
                        className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-red-500/20 hover:text-red-400 disabled:opacity-60"
                      >
                        <XIcon size={15} />
                        Reject
                      </button>
                      <button
                        onClick={() => handleSave(q)}
                        disabled={busyId === q._id}
                        className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-blue-500/20 hover:text-blue-400 disabled:opacity-60"
                      >
                        <Bookmark size={15} />
                        Save for later
                      </button>
                    </>
                  )}

                  {q.status === "Saved" && (
                    <button
                      onClick={() => setCheckoutQuote(q)}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      <CreditCard size={15} />
                      Pay Now
                    </button>
                  )}

                  {q.status === "Sent" && (
                    <button
                      onClick={() => setCheckoutQuote(q)}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      <CreditCard size={15} />
                      Accept & Pay
                    </button>
                  )}
                </div>
              )}

              {/* Inline rejection reason form */}
              {rejectingId === q._id && (
                <div className="mt-3 space-y-3 border-t border-slate-800 pt-4">
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Reason for rejecting (optional)"
                    rows={2}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReject(q)}
                      disabled={busyId === q._id}
                      className="flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
                    >
                      {busyId === q._id && <Loader2 size={15} className="animate-spin" />}
                      Confirm Reject
                    </button>
                    <button
                      onClick={() => {
                        setRejectingId(null);
                        setRejectionReason("");
                      }}
                      className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {checkoutQuote && (
        <CheckoutModal quote={checkoutQuote} onClose={() => setCheckoutQuote(null)} />
      )}
    </PortalLayout>
  );
}