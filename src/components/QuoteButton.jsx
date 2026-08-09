import { useQuoteModal } from "../context/QuoteModalContext";

export default function QuoteButton({ children, className }) {
  const { openQuote } = useQuoteModal();
  return (
    <button onClick={openQuote} className={className}>
      {children}
    </button>
  );
}
