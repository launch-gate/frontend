import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { ILoginResponse, ILoginVariables } from "./login.types";
import {
  loginRequestValidationSchema,
  loginResponseValidationSchema,
} from "./login.validation";

export const loginKey = "login";

export const login = async (data: ILoginVariables): Promise<ILoginResponse> => {
  await validateWithSchema(data, loginRequestValidationSchema, "/auth/login");

  return requestWithValidation<ILoginResponse>(
    {
      url: "/auth/login",
      method: "POST",
      data,
    },
    loginResponseValidationSchema,
    "/auth/login",
  );
};

export const useLogin = () =>
  useMutation<ILoginResponse, DetailsError, ILoginVariables>({
    mutationKey: [loginKey],
    mutationFn: login,
  });

export * from "./login.types";
export * from "./login.validation";
