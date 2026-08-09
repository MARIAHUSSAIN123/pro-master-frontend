import customerAPI from "./customerAuthApi";

// GET /api/quotes/me — all quotes for the logged-in customer
export const getMyQuotes = async () => {
  const { data } = await customerAPI.get("/quotes/me");
  return data;
};

// GET /api/quotes/me/cart — saved quotes (powers the cart badge)
export const getMyCart = async () => {
  const { data } = await customerAPI.get("/quotes/me/cart");
  return data;
};

// PATCH /api/quotes/:id/save — "Save" button
export const saveQuoteToCart = async (id) => {
  const { data } = await customerAPI.patch(`/quotes/${id}/save`);
  return data;
};

// POST /api/quotes/:id/checkout — "Pay Now" button, returns Stripe URL
export const createCheckoutSession = async (id, payload) => {
  const { data } = await customerAPI.post(`/quotes/${id}/checkout`, payload);
  return data;
};

// POST /api/quotes/:id/checkout/confirm — called on the success page
export const confirmCheckoutSession = async (id, sessionId) => {
  const { data } = await customerAPI.post(`/quotes/${id}/checkout/confirm`, {
    sessionId,
  });
  return data;
};
// PATCH /api/quotes/:id/respond — Accept or Reject a quote
export const respondToQuote = async (id, decision, rejectionReason) => {
  const { data } = await customerAPI.patch(`/quotes/${id}/respond`, {
    decision,
    rejectionReason,
  });
  return data;
};
