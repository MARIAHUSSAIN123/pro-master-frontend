import API from "./axios";

// GET /api/audit-logs?page=&limit=&userId=&action=&startDate=&endDate=
export const getAuditLogs = async (filters = {}) => {
  const { data } = await API.get("/audit-logs", { params: filters });
  return data;
};

// GET /api/audit-logs/login-history/:id
export const getUserLoginHistory = async (id) => {
  const { data } = await API.get(`/audit-logs/login-history/${id}`);
  return data;
};
