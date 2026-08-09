import { useEffect, useState } from "react";
import { Calendar, Loader2, AlertCircle, Plus, MapPin, Clock } from "lucide-react";
import PortalLayout from "../components/PortalLayout";
import StatusBadge from "../components/StatusBadge";
import NewBookingModal from "../components/NewBookingModal";
import { getMyBookings } from "../api/bookingApi";

export default function PortalBookings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyBookings();
      if (data?.success) setBookings(data.bookings);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          <Loader2 className="mr-3 animate-spin" size={22} />
          Loading bookings...
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Calendar className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Bookings</h2>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus size={16} />
          Request Service
        </button>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#111827] py-16 text-center text-slate-500">
          No bookings yet.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-white">
                    {b.service?.serviceName || "Service"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{b.bookingNumber}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-800 pt-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "—"} at{" "}
                  {b.bookingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {b.address}
                </span>
              </div>

              {b.assignedEmployees?.length > 0 && (
                <p className="mt-3 text-xs text-slate-500">
                  Assigned: {b.assignedEmployees.map((e) => e.fullName).join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {showNewModal && (
        <NewBookingModal onClose={() => setShowNewModal(false)} onCreated={load} />
      )}
    </PortalLayout>
  );
}