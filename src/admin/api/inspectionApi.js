import API from "./axios";

// GET /api/inspections?booking=&status=&service=
export const getInspections = async (filters = {}) => {
  const { data } = await API.get("/inspections", { params: filters });
  return data;
};

// GET /api/inspections/:id
export const getInspectionById = async (id) => {
  const { data } = await API.get(`/inspections/${id}`);
  return data;
};

// POST /api/inspections  { booking, checklistTemplate? }
export const createInspection = async (payload) => {
  const { data } = await API.post("/inspections", payload);
  return data;
};

// PUT /api/inspections/:id  { items: [{label, passed, notes}], notes }
export const updateInspection = async (id, payload) => {
  const { data } = await API.put(`/inspections/${id}`, payload);
  return data;
};
