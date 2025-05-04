import axios from "axios";
import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

const AXIOS_CONFIG: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: false,
};

const axiosInstance: AxiosInstance = axios.create(AXIOS_CONFIG);

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
