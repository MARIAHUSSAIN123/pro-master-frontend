import API from "./axios";

// GET /api/bookings/me — { success, totalBookings, bookings }
export const getMyBookings = async () => {
  const { data } = await API.get("/bookings/me");
  return data;
};

// POST /api/bookings/me — customer raises a new service request
export const createMyBooking = async (payload) => {
  const { data } = await API.post("/bookings/me", payload);
  return data;
};