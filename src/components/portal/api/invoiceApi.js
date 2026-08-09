import API from "./axios";

// GET /api/invoices/me — { success, totalInvoices, invoices }
export const getMyInvoices = async () => {
  const { data } = await API.get("/invoices/me");
  return data;
};