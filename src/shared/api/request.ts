import axios, { AxiosRequestConfig } from "axios";
import { AnySchema, ValidationError } from "yup";

import { DetailsError, IError } from "./errors";
import { API } from "./interceptor";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};

  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const requestWithValidation = async <TResponse>(
  config: AxiosRequestConfig,
  validationSchema: AnySchema | null,
  errorName = config.url ?? "/api",
): Promise<TResponse> =>
  API<TResponse>({
    ...config,
    headers: {
      ...getAuthHeaders(),
      ...config.headers,
    },
  })
    .then(async ({ data }) => {
      if (!validationSchema) return data;

      const validated = await validationSchema.validate(data, {
        abortEarly: false,
      });

      return validated as TResponse;
    })
    .catch((error: unknown) => {
      if (axios.isAxiosError<IError>(error)) {
        throw new DetailsError(errorName, {
          status: error.response?.status,
          error: {
            errorID: error.response?.data?.ErrorID,
            message: error.response?.data?.Message ?? error.message,
          },
        });
      }

      if (error instanceof ValidationError) {
        const validation = error.inner.length
          ? error.inner.map((innerError) => innerError.message)
          : [error.message];

        throw new DetailsError(errorName, { validation });
      }

      throw error;
    });

export const validateWithSchema = async <TData>(
  data: TData,
  validationSchema: AnySchema,
  errorName = "/validation",
): Promise<TData> => {
  try {
    await validationSchema.validate(data, { abortEarly: false });
    return data;
  } catch (error) {
    if (error instanceof ValidationError) {
      const validation = error.inner.length
        ? error.inner.map((innerError) => innerError.message)
        : [error.message];

      throw new DetailsError(errorName, { validation });
    }

    throw error;
  }
};
