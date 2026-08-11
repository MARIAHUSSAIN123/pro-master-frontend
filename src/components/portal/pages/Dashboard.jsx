import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  Wallet,
  Loader2,
  AlertCircle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import PortalLayout from "../components/PortalLayout";
import StatCard from "../components/StatCard";
import { getMyProfile } from "../api/authApi";
import { getMyBookings } from "../api/bookingApi";
import { getMyQuotes } from "../api/quoteApi";
import { getMyInvoices } from "../api/invoiceApi";

// Status -> badge color, shared look across bookings/quotes/invoices
const STATUS_STYLES = {
  // Bookings
  Pending: "bg-amber-500/10 text-amber-400",
  Confirmed: "bg-blue-500/10 text-blue-400",
  Assigned: "bg-blue-500/10 text-blue-400",
  "In Progress": "bg-cyan-500/10 text-cyan-400",
  Completed: "bg-emerald-500/10 text-emerald-400",
  Approved: "bg-emerald-500/10 text-emerald-400",
  "In Dispute": "bg-red-500/10 text-red-400",
  Cancelled: "bg-slate-500/10 text-slate-400",
  // Quotes
  Draft: "bg-slate-500/10 text-slate-400",
  Sent: "bg-amber-500/10 text-amber-400",
  Accepted: "bg-emerald-500/10 text-emerald-400",
  Rejected: "bg-red-500/10 text-red-400",
  Expired: "bg-slate-500/10 text-slate-400",
  Saved: "bg-blue-500/10 text-blue-400",
  Converted: "bg-emerald-500/10 text-emerald-400",
  // Invoices (paymentStatus)
  Paid: "bg-emerald-500/10 text-emerald-400",
  "Partially Paid": "bg-amber-500/10 text-amber-400",
  Refunded: "bg-slate-500/10 text-slate-400",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
        STATUS_STYLES[status] || "bg-slate-500/10 text-slate-400"
      }`}
    >
      {status}
    </span>
  );
}

export default function PortalDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [profileRes, bookingsRes, quotesRes, invoicesRes] = await Promise.all([
          getMyProfile(),
          getMyBookings(),
          getMyQuotes(),
          getMyInvoices(),
        ]);

        if (profileRes?.success) setCustomer(profileRes.customer);
        if (bookingsRes?.success) setBookings(bookingsRes.bookings);
        if (quotesRes?.success) setQuotes(quotesRes.quotes);
        if (invoicesRes?.success) setInvoices(invoicesRes.invoices);
      } catch (err) {
        setError(
          err.response?.data?.message || "Dashboard load nahi ho saka. Dobara try karein."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          <Loader2 className="mr-3 animate-spin" size={22} />
          Loading dashboard...
        </div>
      </PortalLayout>
    );
  }

  if (error) {
    return (
      <PortalLayout>
        <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
          <AlertCircle size={20} />
          {error}
        </div>
      </PortalLayout>
    );
  }

  // Quotes waiting on the customer's decision — surfaced first, since
  // this is the action most likely to be why they logged in.
  const pendingQuotes = quotes.filter((q) => q.status === "Sent");

  const pendingBookings = bookings.filter((b) =>
    ["Pending", "Confirmed", "Assigned", "In Progress"].includes(b.status)
  ).length;

  const completedBookings = bookings.filter((b) => b.status === "Completed").length;

  const outstandingBalance = invoices
    .filter((inv) => inv.paymentStatus !== "Paid")
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  return (
    <PortalLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Welcome back, {customer?.fullName?.split(" ")[0] || "there"} 👋
        </h2>
        {customer?.address && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin size={14} />
            {customer.address}, {customer.city}
          </p>
        )}
      </div>

      {/* Quotes awaiting response — most important call to action */}
      {pendingQuotes.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-amber-400">
                {pendingQuotes.length} quote{pendingQuotes.length > 1 ? "s" : ""} waiting for your
                response
              </p>
              <p className="mt-1 text-sm text-amber-400/70">
                Review and accept to schedule your service.
              </p>
            </div>
            <button
              onClick={() => navigate("/portal/quotes")}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
            >
              Review Quotes
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Bookings"
          value={pendingBookings}
          icon={Calendar}
          gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
        />
        <StatCard
          title="Completed Services"
          value={completedBookings}
          icon={Calendar}
          gradient="bg-gradient-to-br from-emerald-500 to-green-600"
        />
        <StatCard
          title="Open Quotes"
          value={pendingQuotes.length}
          icon={FileText}
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
        />
        <StatCard
          title="Outstanding Balance"
          value={`$${outstandingBalance.toFixed(2)}`}
          icon={Wallet}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent bookings */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Bookings</h3>
            <button
              onClick={() => navigate("/portal/bookings")}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              View all
            </button>
          </div>

          {bookings.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {b.service?.serviceName || "Service"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "—"}
                    </p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent invoices */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Invoices</h3>
            <button
              onClick={() => navigate("/portal/invoices")}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              View all
            </button>
          </div>

          {invoices.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500">No invoices yet.</p>
          ) : (
            <div className="space-y-3">
              {invoices.slice(0, 5).map((inv) => (
                <div
                  key={inv._id}
                  className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {inv.invoiceNumber}
                    </p>
                    <p className="text-xs text-slate-500">${inv.totalAmount?.toFixed(2)}</p>
                  </div>
                  <StatusBadge status={inv.paymentStatus} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
