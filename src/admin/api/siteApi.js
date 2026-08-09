import API from "./axios";

// GET /api/sites?customer=
export const getSites = async (customer) => {
  const { data } = await API.get("/sites", {
    params: customer ? { customer } : {},
  });
  return data;
};

// GET /api/sites/:id
export const getSiteById = async (id) => {
  const { data } = await API.get(`/sites/${id}`);
  return data;
};

// POST /api/sites
export const createSite = async (payload) => {
  const { data } = await API.post("/sites", payload);
  return data;
};

// PUT /api/sites/:id
export const updateSite = async (id, payload) => {
  const { data } = await API.put(`/sites/${id}`, payload);
  return data;
};

// DELETE /api/sites/:id
export const deleteSite = async (id) => {
  const { data } = await API.delete(`/sites/${id}`);
  return data;
};
