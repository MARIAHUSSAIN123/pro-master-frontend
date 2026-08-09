import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import PortalLayout from "../components/PortalLayout";
import { confirmCheckoutSession } from "../api/quoteApi";

export default function PortalPaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const quoteId = searchParams.get("quoteId");

  const [status, setStatus] = useState("confirming"); // confirming | done | error
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  // Prevents calling confirmCheckoutSession twice for the same
  // session — React 18 StrictMode intentionally double-invokes
  // effects in dev, and without this guard that fired the confirm
  // request twice, racing the backend for the same quote.
  const confirmedSessionRef = useRef(null);

  useEffect(() => {
    const confirm = async () => {
      if (!sessionId || !quoteId) {
        setError("Payment session details missing.");
        setStatus("error");
        return;
      }

      if (confirmedSessionRef.current === sessionId) return;
      confirmedSessionRef.current = sessionId;

      try {
        const data = await confirmCheckoutSession(quoteId, sessionId);
        if (data?.success) {
          setBookings(data.bookings || []);
          setStatus("done");
        } else {
          setError(data?.message || "Could not confirm payment.");
          setStatus("error");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Could not confirm payment.");
        setStatus("error");
      }
    };

    confirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, quoteId]);

  return (
    <PortalLayout>
      <div className="mx-auto max-w-lg py-16 text-center">
        {status === "confirming" && (
          <>
            <Loader2 className="mx-auto mb-5 animate-spin text-cyan-400" size={40} />
            <h2 className="text-xl font-semibold text-white">Confirming your payment...</h2>
            <p className="mt-2 text-sm text-slate-400">One moment, this will just take a second.</p>
          </>
        )}

        {status === "done" && (
          <>
            <CheckCircle2 className="mx-auto mb-5 text-emerald-400" size={48} />
            <h2 className="text-xl font-semibold text-white">Payment successful!</h2>
            <p className="mt-2 text-sm text-slate-400">
              {bookings.length} booking{bookings.length > 1 ? "s" : ""} confirmed
              . Your invoice has also been generated.
            </p>
            <button
              onClick={() => navigate("/portal/bookings")}
              className="mx-auto mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
            >
              View Bookings
              <ArrowRight size={16} />
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="mx-auto mb-5 text-red-400" size={40} />
            <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
            <p className="mt-2 text-sm text-slate-400">{error}</p>
            <button
              onClick={() => navigate("/portal/quotes")}
              className="mx-auto mt-6 rounded-xl bg-slate-800 px-5 py-2.5 font-semibold text-slate-300 transition hover:bg-slate-700"
            >
              Back to Quotes
            </button>
          </>
        )}
      </div>
    </PortalLayout>
  );
}