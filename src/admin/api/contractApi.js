import API from "./axios";

// GET /api/contracts
export const getContracts = async () => {
  const { data } = await API.get("/contracts");
  return data;
};

// GET /api/contracts/:id
export const getContractById = async (id) => {
  const { data } = await API.get(`/contracts/${id}`);
  return data;
};

// POST /api/contracts
export const createContract = async (payload) => {
  const { data } = await API.post("/contracts", payload);
  return data;
};

// PUT /api/contracts/:id
export const updateContract = async (id, payload) => {
  const { data } = await API.put(`/contracts/${id}`, payload);
  return data;
};

// PATCH /api/contracts/:id/cancel
export const cancelContract = async (id) => {
  const { data } = await API.patch(`/contracts/${id}/cancel`);
  return data;
};

// POST /api/contracts/run-billing-now  (admin only)
export const runRecurringBillingNow = async () => {
  const { data } = await API.post("/contracts/run-billing-now");
  return data;
};
