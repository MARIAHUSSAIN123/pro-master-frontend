import axios from "axios";

// Local dev: create a .env file in the frontend root with
//   VITE_API_URL=http://localhost:5000/api
// Production: set VITE_API_URL to your deployed backend URL,
// e.g. https://your-backend.vercel.app/api
const publicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// POST /api/leads — public "Get a Free Quote" / contact form submission.
// No auth required; this is what turns an anonymous visitor into a
// Lead that shows up on the admin's Leads page.
export const submitLead = async (payload) => {
  const { data } = await publicAPI.post("/leads", payload);
  return data;
};

export default publicAPI;
