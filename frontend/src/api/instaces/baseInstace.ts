import axios, { AxiosError, AxiosRequestHeaders } from "axios";

// Create an baseInstance of Axios with custom configuration
const baseInstance = axios.create();

baseInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = import.meta.env.VITE_BASE_URL;
    // config.baseURL = "http://localhost:3000/api";

    config.headers = {
      ...config.headers,
    } as AxiosRequestHeaders;
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

baseInstance.interceptors.response.use(
  (response) => response,
  async function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default baseInstance;
