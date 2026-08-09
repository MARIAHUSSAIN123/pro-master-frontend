import API from "./axios";

// GET /api/complaints?status=&severity=
export const getComplaints = async (filters = {}) => {
  const { data } = await API.get("/complaints", { params: filters });
  return data;
};

// GET /api/complaints/:id
export const getComplaintById = async (id) => {
  const { data } = await API.get(`/complaints/${id}`);
  return data;
};

// POST /api/complaints  (staff — booking, type, description, severity)
export const createComplaint = async (payload) => {
  const { data } = await API.post("/complaints", payload);
  return data;
};

// PUT /api/complaints/:id  (status, severity, correctiveAction)
export const updateComplaint = async (id, payload) => {
  const { data } = await API.put(`/complaints/${id}`, payload);
  return data;
};
