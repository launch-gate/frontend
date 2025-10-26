import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  ParamsSerializerOptions,
} from "axios";

import { env } from "@/shared/config";

const controller = new AbortController();
const isServer = typeof window === "undefined";

const paramsSerializer: ParamsSerializerOptions = {
  indexes: null,
  serialize: (params) => {
    return Object.entries(params)
      .filter(([_, value]) => {
        if (Array.isArray(value) && !!value.length) return true;
        return value !== "" && value !== null;
      })
      .map(([key, value]) => {
        if (Array.isArray(value) && !!value.length) {
          return value
            .map(
              (item) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
            )
            .join("&");
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join("&");
  },
};

export const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8887/api/v1",
  headers: { "Content-Type": "application/json" },
  paramsSerializer,
  signal: controller.signal,
  timeout: isServer ? 1500 : 0,
});

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV !== "production" || isServer)
    console.log(
      new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date()),
      message,
    );
};
const handlerRequest = async (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
  if (isServer) config.baseURL = env.BASE_API_URL;

  return { ...config };
};
const handlerResponse = async (
  response: AxiosResponse,
): Promise<AxiosResponse> => {
  const { status, config } = response;

  logOnDev(
    `🚀 [API] ${config.method?.toUpperCase()} ${config.url} | Response ${status}`,
  );

  return response;
};
const handlerError = async (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status } = (error.response as AxiosResponse) ?? {};

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`,
    );

    const isAuthError = url?.startsWith("/auth/");

    if (error.response?.status === 401 && !isAuthError && !isServer) {
      controller.abort();
      // await refreshSession();
    }
  }

  logOnDev(`${JSON.stringify(error)}`);

  return Promise.reject(error);
};
API.interceptors.request.use(handlerRequest, handlerError);
API.interceptors.response.use(handlerResponse, handlerError);
