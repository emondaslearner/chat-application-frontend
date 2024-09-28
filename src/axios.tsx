import axiosClient, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { requestForAccessToken } from "./apis/auth";

const baseURL: string = "https://chat-appliation-backend.onrender.com";

const axios: AxiosInstance = axiosClient.create({
  baseURL,
});

const token = localStorage.getItem("token");
axios.defaults.headers.common["authorization"] = token;

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const currentToken = localStorage.getItem("token");

    if (
      err?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      currentToken
    ) {
      originalRequest._retry = true;

      try {
        const data: any = await requestForAccessToken({ token: currentToken });

        if (data.code === 200) {
          localStorage.setItem("token", data.token);

          // Update the token in the original request
          originalRequest.headers["Authorization"] = `Bearer ${data.token}`;

          // Retry the original request with the new token
          return axios(originalRequest);
        } else {
          localStorage.removeItem("token");
        }
      } catch (refreshError) {
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
