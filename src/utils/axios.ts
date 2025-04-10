import axios from "axios";
import { clearApiToken, getApiToken } from "../utils/api";

export const AxiosAuth = axios.create({
  headers: { Authorization:  getApiToken() }
})

AxiosAuth.interceptors.response.use((response) => response, (error) => {
  if(error?.response.status === 401){
    clearApiToken()
    window.location.href = '/login'
  }
  return Promise.reject(error)
})