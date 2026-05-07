import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  ParamsSerializerOptions,
} from "axios";

import { env } from "@/shared/config";

const isServer = typeof window === "undefined";
const API_PREFIX = "/api/v1";
const DEFAULT_BASE_API_URL = "http://157.22.252.122:8090";

const getApiBaseUrl = (baseUrl = DEFAULT_BASE_API_URL) => {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  return normalizedBaseUrl.endsWith(API_PREFIX)
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}${API_PREFIX}`;
};

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
  baseURL: getApiBaseUrl(env.BASE_API_URL),
  headers: { "Content-Type": "application/json" },
  paramsSerializer,
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
  if (isServer) config.baseURL = getApiBaseUrl(env.BASE_API_URL);

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

    // Session cleanup is handled by consumers that know the current route.
  }

  logOnDev(`${JSON.stringify(error)}`);

  return Promise.reject(error);
};
API.interceptors.request.use(handlerRequest, handlerError);
API.interceptors.response.use(handlerResponse, handlerError);
