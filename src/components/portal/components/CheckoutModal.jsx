import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createCheckoutSession } from "../api/quoteApi";

export default function CheckoutModal({ quote, onClose }) {
  const [form, setForm] = useState({ bookingDate: "", bookingTime: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.bookingDate || !form.bookingTime || !form.address) {
      setError("Sab fields zaroori hain.");
      return;
    }

    setLoading(true);
    try {
      const data = await createCheckoutSession(quote._id, form);
      if (data?.success && data.url) {
        // Stripe hosted checkout — backend already wired the
        // success/cancel URLs to /portal/payment-success and
        // /portal/quotes/:id.
        window.location.href = data.url;
      } else {
        setError(data?.message || "Checkout shuru nahi ho saka.");
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Checkout shuru nahi ho saka.");
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-4 text-white placeholder-slate-500 outline-none transition focus:border-cyan-500";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#101828] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Schedule & Pay</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-5 text-sm text-slate-400">
          Total: <span className="font-semibold text-white">${quote.totalAmount?.toFixed(2)}</span>{" "}
          — you'll be redirected to Stripe to pay securely.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className={labelClass}>Preferred Date</label>
            <input
              type="date"
              name="bookingDate"
              value={form.bookingDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Preferred Time</label>
            <input
              type="time"
              name="bookingTime"
              value={form.bookingTime}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Service Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main St, Toronto"
              className={fieldClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Redirecting to Stripe..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}