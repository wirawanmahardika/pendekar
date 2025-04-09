import axios from "axios";
import { clearApiToken, getApiToken } from "../utils/api";

export const AxiosAuth = axios.create({
  headers: { Authorization:  getApiToken() }
})

axios.interceptors.request.use((config) => {
  const token = getApiToken();
  config.headers.Authorization = token;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearApiToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
