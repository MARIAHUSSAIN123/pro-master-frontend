import { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { getMyCart } from "../../api/customerQuoteApi";
import PayNowModal from "../../components/portal/PayNowModal";

export default function Cart() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payingQuote, setPayingQuote] = useState(null);

  useEffect(() => {
    getMyCart()
      .then((data) => setQuotes(data?.quotes || []))
      .catch((err) => setError(err?.response?.data?.message || "Could not load your cart."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-1">Your Cart</h1>
      <p className="text-gray-500 mb-8">
        Quotes you saved for later. Complete payment whenever you're ready.
      </p>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 size={18} className="animate-spin" /> Loading...
        </div>
      )}

      {!loading && error && <p className="text-red-600">{error}</p>}

      {!loading && !error && quotes.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <ShoppingCart size={40} className="mx-auto mb-3" />
          <p>Your cart is empty.</p>
        </div>
      )}

      <div className="space-y-4">
        {quotes.map((quote) => (
          <div key={quote._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-navy">{quote.quoteNumber}</h3>
              <p className="text-sm text-gray-500">
                {quote.items?.map((i) => i.serviceName).join(", ")}
              </p>
              <p className="text-lg font-bold text-navy mt-1">${quote.totalAmount}</p>
            </div>

            {quote.intendedUse === "OneTime" && (
              <button
                onClick={() => setPayingQuote(quote)}
                className="bg-green hover:bg-green-light text-white font-semibold px-5 py-2.5 rounded-full transition"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>

      {payingQuote && <PayNowModal quote={payingQuote} onClose={() => setPayingQuote(null)} />}
    </div>
  );
}
