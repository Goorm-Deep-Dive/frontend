import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = process.env.MASTER_ACCESS_TOKEN;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // open("인증이 만료되었습니다. 다시 로그인해주세요.");
          break;
        case 500:
          // open("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
        // open("알 수 없는 에러가 발생했습니다.");
      }
    }
    return Promise.reject(error);
  },
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance(config);
};

export default axiosInstance;
