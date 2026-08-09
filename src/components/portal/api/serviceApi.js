import API from "./axios";

// GET /api/services/active — public endpoint, no auth required,
// but works fine through the portal's API instance too.
export const getActiveServices = async () => {
  const { data } = await API.get("/services/active");
  return data;
};