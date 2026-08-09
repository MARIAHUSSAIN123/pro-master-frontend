import axios from "axios";

// Same backend, but the portal keeps its OWN localStorage keys
// ("portalToken" / "portalUser") — separate from the admin dashboard's
// ("token" / "user"). Without this, logging into the customer portal
// in one tab would silently log an admin out (or vice versa) since
// they'd be overwriting the same keys.
//
// Local dev: .env in the frontend root needs
//   VITE_API_URL=http://localhost:5000/api
// Production (Vercel): set VITE_API_URL to your deployed backend URL.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("portalToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If the backend says our token is invalid/expired, clear the portal
// session and send the customer back to the portal login — never the
// admin login.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("portalToken");
      localStorage.removeItem("portalUser");

      if (window.location.pathname !== "/portal/login") {
        window.location.href = "/portal/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;