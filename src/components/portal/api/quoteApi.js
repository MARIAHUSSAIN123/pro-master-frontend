import API from "./axios";

// GET /api/quotes/me — { success, totalQuotes, quotes }
export const getMyQuotes = async () => {
  const { data } = await API.get("/quotes/me");
  return data;
};

// GET /api/quotes/me/cart — quotes the customer saved for later
export const getMyCart = async () => {
  const { data } = await API.get("/quotes/me/cart");
  return data;
};

// PATCH /api/quotes/:id/respond — { decision: "Accepted" | "Rejected", rejectionReason? }
export const respondToQuote = async (id, payload) => {
  const { data } = await API.patch(`/quotes/${id}/respond`, payload);
  return data;
};

// PATCH /api/quotes/:id/save — save quote to cart instead of paying now
export const saveQuoteToCart = async (id) => {
  const { data } = await API.patch(`/quotes/${id}/save`);
  return data;
};

// POST /api/quotes/:id/checkout — starts Stripe checkout session
export const createCheckoutSession = async (id, payload) => {
  const { data } = await API.post(`/quotes/${id}/checkout`, payload);
  return data;
};

// POST /api/quotes/:id/checkout/confirm — confirms payment, creates booking(s) + invoice
export const confirmCheckoutSession = async (id, sessionId) => {
  const { data } = await API.post(`/quotes/${id}/checkout/confirm`, { sessionId });
  return data;
};