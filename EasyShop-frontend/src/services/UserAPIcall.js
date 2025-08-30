import axios from "axios";

export const axiosUserInstance = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
