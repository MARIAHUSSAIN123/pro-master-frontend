import API from "./axios";

// GET /api/customers/me — { success, customer, sites, contracts }
export const getMyProfile = async () => {
  const { data } = await API.get("/customers/me");
  return data;
};

// PUT /api/customers/me — update own contact info / billing method only
export const updateMyProfile = async (payload) => {
  const { data } = await API.put("/customers/me", payload);
  return data;
};