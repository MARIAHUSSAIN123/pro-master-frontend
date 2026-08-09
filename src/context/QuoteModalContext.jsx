import { createContext, useContext, useState } from "react";

const QuoteModalContext = createContext(null);

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openQuote = () => setIsOpen(true);
  const closeQuote = () => setIsOpen(false);

  return (
    <QuoteModalContext.Provider value={{ isOpen, openQuote, closeQuote }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}
