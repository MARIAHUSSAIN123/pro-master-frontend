import API from "./axios";

// GET /api/checklist-templates?isActive=
export const getChecklistTemplates = async (filters = {}) => {
  const { data } = await API.get("/checklist-templates", { params: filters });
  return data;
};

// GET /api/checklist-templates/:id
export const getChecklistTemplateById = async (id) => {
  const { data } = await API.get(`/checklist-templates/${id}`);
  return data;
};

// POST /api/checklist-templates  { name, service, items: [{label, required}] }
export const createChecklistTemplate = async (payload) => {
  const { data } = await API.post("/checklist-templates", payload);
  return data;
};

// PUT /api/checklist-templates/:id
export const updateChecklistTemplate = async (id, payload) => {
  const { data } = await API.put(`/checklist-templates/${id}`, payload);
  return data;
};

// DELETE /api/checklist-templates/:id
export const deleteChecklistTemplate = async (id) => {
  const { data } = await API.delete(`/checklist-templates/${id}`);
  return data;
};
