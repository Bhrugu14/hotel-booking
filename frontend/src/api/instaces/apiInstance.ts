import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

// Create an apiInstance of Axios with custom configuration
const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = import.meta.env.VITE_BASE_URL;
    // config.baseURL = "http://localhost:3000/api";

    config.headers = {
      ...config.headers,
      Authorization: Cookies.get("auth_token")
        ? `Bearer ${Cookies.get("auth_token")}`
        : "",
    } as AxiosRequestHeaders;
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default apiInstance;
