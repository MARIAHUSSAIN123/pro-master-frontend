import axios from "axios";

// Separate token/user keys from the admin panel on purpose — a
// customer and a staff member could be logged in from the same
// browser, and they must not overwrite each other's session.
const TOKEN_KEY = "customerToken";
const USER_KEY = "customerUser";

const customerAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

customerAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// POST /api/auth/login — shared login endpoint (role comes back in
// the response; the portal only cares that it's "customer").
export const customerLogin = async (email, password) => {
  const { data } = await customerAPI.post("/auth/login", { email, password });
  return data;
};

// POST /api/auth/register-customer — public residential self-signup
export const customerRegister = async (formData) => {
  const { data } = await customerAPI.post("/auth/register-customer", formData);
  alert(error.response?.data?.message);  // ✅
  return data;
};

export const saveCustomerSession = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getStoredCustomer = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const getCustomerToken = () => localStorage.getItem(TOKEN_KEY);

export const customerLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};


export default customerAPI;
