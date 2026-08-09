import API from "./axios";

// GET /api/messages/inbox?limit=
export const getInbox = async (limit) => {
  const { data } = await API.get("/messages/inbox", {
    params: limit ? { limit } : {},
  });
  return data;
};

// GET /api/messages/sent
export const getSentMessages = async () => {
  const { data } = await API.get("/messages/sent");
  return data;
};

// GET /api/messages/:id
export const getMessageById = async (id) => {
  const { data } = await API.get(`/messages/${id}`);
  return data;
};

// POST /api/messages  (direct message)
export const sendMessage = async (payload) => {
  const { data } = await API.post("/messages", payload);
  return data;
};

// POST /api/messages/announcement  (role/department/all broadcast)
export const sendAnnouncement = async (payload) => {
  const { data } = await API.post("/messages/announcement", payload);
  return data;
};

// PUT /api/messages/:id/read
export const markMessageAsRead = async (id) => {
  const { data } = await API.put(`/messages/${id}/read`);
  return data;
};

// DELETE /api/messages/:id
export const deleteMessage = async (id) => {
  const { data } = await API.delete(`/messages/${id}`);
  return data;
};
