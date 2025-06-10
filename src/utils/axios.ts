import axios from "axios";

export const AxiosAuth = axios.create()

AxiosAuth.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

AxiosAuth.interceptors.response.use((response) => response, (error) => {
  if(error?.response?.status === 401){
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})