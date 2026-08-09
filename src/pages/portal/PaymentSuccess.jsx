import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { confirmCheckoutSession } from "../../api/customerQuoteApi";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const quoteId = searchParams.get("quoteId");

  const [status, setStatus] = useState("confirming"); // confirming | success | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId || !quoteId) {
      setStatus("error");
      setError("Missing payment session information.");
      return;
    }

    confirmCheckoutSession(quoteId, sessionId)
      .then((data) => {
        setResult(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Could not confirm your payment.");
        setStatus("error");
      });
  }, [sessionId, quoteId]);

  return (
    <div className="max-w-lg mx-auto text-center py-16">
      {status === "confirming" && (
        <>
          <Loader2 size={48} className="mx-auto text-green animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-navy">Confirming your payment...</h1>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle2 size={56} className="mx-auto text-green mb-6" />
          <h1 className="text-3xl font-bold text-navy mb-2">Payment confirmed!</h1>
          <p className="text-gray-500 mb-1">
            Case number:{" "}
            <span className="font-semibold text-navy">
              {result?.bookings?.[0]?.bookingNumber}
            </span>
          </p>
          <p className="text-gray-500 mb-8">
            A confirmation email with your booking and invoice details is on its way.
          </p>
          <Link
            to="/portal/quotes"
            className="inline-block bg-green hover:bg-green-light text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Back to My Quotes
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle size={56} className="mx-auto text-red-500 mb-6" />
          <h1 className="text-2xl font-bold text-navy mb-2">Something went wrong</h1>
          <p className="text-gray-500 mb-8">{error}</p>
          <Link
            to="/portal/quotes"
            className="inline-block bg-navy text-cream font-semibold px-6 py-3 rounded-full"
          >
            Back to My Quotes
          </Link>
        </>
      )}
    </div>
  );
}
