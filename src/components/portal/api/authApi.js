import API from "./axios";

// POST /api/auth/login — { success, token, user, message }
export const loginRequest = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  return data;
};

// POST /api/auth/register-customer — public self-signup — { success, token, user, message }
export const registerCustomerRequest = async (payload) => {
  const { data } = await API.post("/auth/register-customer", payload);
  return data;
};

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

// --- Local storage helpers for the logged-in portal user ---

// Reads and parses the user object saved at login time
export const getStoredPortalUser = () => {
  try {
    const raw = localStorage.getItem("portalUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Reads the raw auth token saved at login time
export const getStoredPortalToken = () => {
  return localStorage.getItem("portalToken");
};

// Quick boolean check for route guards
export const isPortalAuthenticated = () => {
  return Boolean(localStorage.getItem("portalToken"));
};

// Clears stored session data (use for logout)
export const clearPortalSession = () => {
  localStorage.removeItem("portalToken");
  localStorage.removeItem("portalUser");
};

// Alias — some components import this as portalLogout
export const portalLogout = clearPortalSession;