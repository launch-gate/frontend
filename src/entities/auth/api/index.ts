import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
} from "../model/auth.types";
import {
  authResponseSchema,
  loginRequestSchema,
  registerRequestSchema,
} from "../model/auth.validation";

export const registerKey = "register";
export const loginKey = "login";

export const register = async (
  data: IRegisterRequest,
): Promise<IAuthResponse> => {
  await validateWithSchema(data, registerRequestSchema, "/auth/register");

  return requestWithValidation<IAuthResponse>(
    {
      url: "/auth/register",
      method: "POST",
      data,
    },
    authResponseSchema,
    "/auth/register",
  );
};

export const login = async (data: ILoginRequest): Promise<IAuthResponse> => {
  await validateWithSchema(data, loginRequestSchema, "/auth/login");

  return requestWithValidation<IAuthResponse>(
    {
      url: "/auth/login",
      method: "POST",
      data,
    },
    authResponseSchema,
    "/auth/login",
  );
};

export const useRegister = () =>
  useMutation<IAuthResponse, DetailsError, IRegisterRequest>({
    mutationKey: [registerKey],
    mutationFn: register,
  });

export const useLogin = () =>
  useMutation<IAuthResponse, DetailsError, ILoginRequest>({
    mutationKey: [loginKey],
    mutationFn: login,
  });

export * from "../model/auth.types";
