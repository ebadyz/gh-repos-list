import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

const AXIOS_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create(AXIOS_CONFIG);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const request = async <T = unknown, R = AxiosResponse<T>>(
  config: AxiosRequestConfig
): Promise<R> => axiosInstance.request<T, R>(config);

export default axiosInstance;
