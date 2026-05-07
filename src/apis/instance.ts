import { STORAGE_ACCESS_TOKEN_KEY } from "@/constants/storage-keys";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const clearRefreshCookieOnAppOrigin = async () => {
  await fetch("/api/auth/clear-refresh-cookie", {
    method: "POST",
    credentials: "include",
  });
};

/**
 * @description Orval `ApiResponse*` 스키마에서 HTTP 본문(payload) 타입만 추출
 * @param T - HTTP 본문(payload) 타입
 */
export type UnwrapApiResponse<T> = T extends { data?: infer D } ? D : T;

/**
 * @description Orval `ApiResponse*` 스키마에서 HTTP 본문(payload) 타입만 추출
 * @param value - Orval `ApiResponse*` 스키마
 * @returns - Orval `ApiResponse*` 스키마에서 HTTP 본문(payload) 타입만 추출
 */
const isWrappedApiEnvelope = (
  value: unknown,
): value is { success: boolean; data: unknown } => {
  if (value === null || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.success === "boolean" && "data" in record;
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
      if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<unknown>) => {
    const body = response.data;
    if (isWrappedApiEnvelope(body)) {
      return {
        ...response,
        data: body.data,
      };
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (typeof window !== "undefined") {
            localStorage.clear();
            await clearRefreshCookieOnAppOrigin();
            window.location.href = "/login";
          }
          break;
        case 500:
          break;
        default:
      }
    }
    return Promise.reject(error);
  },
);

/** Orval customInstance 규약: Axios `AxiosResponse`가 아니라 본문 `response.data`만 반환 (Query의 `data`가 곧 payload) */
export const customInstance = async <T>(
  config: AxiosRequestConfig,
): Promise<UnwrapApiResponse<T>> => {
  const response = await axiosInstance<UnwrapApiResponse<T>>(config);
  return response.data;
};

export default axiosInstance;
