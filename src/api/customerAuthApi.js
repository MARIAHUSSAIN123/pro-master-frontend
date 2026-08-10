import axios from "axios";

const TOKEN_KEY = "customerToken";
const USER_KEY = "customerUser";

const customerAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://pro-master-backend.vercel.app/api",
});

customerAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const customerLogin = async (email, password) => {
  const { data } = await customerAPI.post("/auth/login", { email, password });
  return data;
};

export const customerRegister = async (formData) => {
  const { data } = await customerAPI.post("/auth/register-customer", formData);
  return data;
};

// GET /auth/profile — logged-in customer's own profile
export const getMyProfile = async () => {
  const { data } = await customerAPI.get("/auth/profile");
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
