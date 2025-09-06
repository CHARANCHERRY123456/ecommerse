import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

api.interceptors.request.use((res) => {
  const token = localStorage.getItem("token");
  if (token) res.headers.Authorization = `Bearer ${token}`;
  return res;
});

export default api;
