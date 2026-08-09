import API from "./axios";

// GET /api/leads?status=New
export const getLeads = async (status = "") => {
  const { data } = await API.get("/leads", {
    params: status ? { status } : {},
  });
  return data;
};

// GET /api/leads/:id
export const getLeadById = async (id) => {
  const { data } = await API.get(`/leads/${id}`);
  return data;
};

// PUT /api/leads/:id  (status / internalNotes)
export const updateLead = async (id, payload) => {
  const { data } = await API.put(`/leads/${id}`, payload);
  return data;
};

// POST /api/leads/:id/convert
export const convertLead = async (id, payload) => {
  const { data } = await API.post(`/leads/${id}/convert`, payload);
  return data;
};

// DELETE /api/leads/:id
export const deleteLead = async (id) => {
  const { data } = await API.delete(`/leads/${id}`);
  return data;
};
