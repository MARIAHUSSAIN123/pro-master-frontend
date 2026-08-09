import API from "./axios";

// GET /api/surveys?customer=&minRating=
export const getSurveys = async (filters = {}) => {
  const { data } = await API.get("/surveys", { params: filters });
  return data;
};

// GET /api/surveys/:id
export const getSurveyById = async (id) => {
  const { data } = await API.get(`/surveys/${id}`);
  return data;
};

// GET /api/surveys/stats
export const getSurveyStats = async () => {
  const { data } = await API.get("/surveys/stats");
  return data;
};
