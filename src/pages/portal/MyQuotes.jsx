import { useEffect, useState } from "react";
import { FileText, Loader2, Check } from "lucide-react";
import { getMyQuotes, saveQuoteToCart } from "../../api/customerQuoteApi";
import PayNowModal from "../../components/portal/PayNowModal";

const STATUS_STYLES = {
  Sent: "bg-blue-100 text-blue-700",
  Saved: "bg-amber-100 text-amber-700",
  Accepted: "bg-green-100 text-green-700",
  Converted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Expired: "bg-gray-100 text-gray-600",
  Draft: "bg-gray-100 text-gray-600",
};

export default function MyQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payingQuote, setPayingQuote] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getMyQuotes();
      setQuotes(data?.quotes || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load your quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (quote) => {
    setSavingId(quote._id);
    try {
      await saveQuoteToCart(quote._id);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not save this quote.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-1">My Quotes</h1>
      <p className="text-gray-500 mb-8">Review your quotes and place an order whenever you're ready.</p>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 size={18} className="animate-spin" /> Loading...
        </div>
      )}

      {!loading && error && <p className="text-red-600">{error}</p>}

      {!loading && !error && quotes.length === 0 && (
        <p className="text-gray-500">You don't have any quotes yet.</p>
      )}

      <div className="space-y-4">
        {quotes.map((quote) => (
          <div key={quote._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <FileText size={18} className="text-green" />
                  <h3 className="font-semibold text-navy">{quote.quoteNumber}</h3>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[quote.status] || "bg-gray-100 text-gray-600"}`}>
                    {quote.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {quote.items?.map((i) => i.serviceName).join(", ")}
                </p>
                <p className="text-lg font-bold text-navy mt-1">${quote.totalAmount}</p>
              </div>

              {["Sent", "Saved"].includes(quote.status) && (
                <div className="flex gap-3">
                  {quote.intendedUse === "OneTime" && (
                    <button
                      onClick={() => setPayingQuote(quote)}
                      className="bg-green hover:bg-green-light text-white font-semibold px-5 py-2.5 rounded-full transition"
                    >
                      Pay Now
                    </button>
                  )}
                  {quote.status !== "Saved" && (
                    <button
                      onClick={() => handleSave(quote)}
                      disabled={savingId === quote._id}
                      className="border border-gray-300 hover:bg-gray-50 text-navy font-semibold px-5 py-2.5 rounded-full transition disabled:opacity-60"
                    >
                      {savingId === quote._id ? "Saving..." : "Save for later"}
                    </button>
                  )}
                  {quote.status === "Saved" && (
                    <span className="flex items-center gap-1 text-amber-600 text-sm font-medium px-2">
                      <Check size={16} /> In your cart
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {payingQuote && <PayNowModal quote={payingQuote} onClose={() => setPayingQuote(null)} />}
    </div>
  );
}
