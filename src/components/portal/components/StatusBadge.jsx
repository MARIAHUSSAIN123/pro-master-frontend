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

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
        STATUS_STYLES[status] || "bg-slate-500/10 text-slate-400"
      }`}
    >
      {status}
    </span>
  );
}