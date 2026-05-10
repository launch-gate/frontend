import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { IRegisterResponse, IRegisterVariables } from "./register.types";
import {
  registerRequestValidationSchema,
  registerResponseValidationSchema,
} from "./register.validation";

export const registerKey = "register";

export const register = async (
  data: IRegisterVariables,
): Promise<IRegisterResponse> => {
  await validateWithSchema(
    data,
    registerRequestValidationSchema,
    "/auth/register",
  );

  return requestWithValidation<IRegisterResponse>(
    {
      url: "/auth/register",
      method: "POST",
      data,
    },
    registerResponseValidationSchema,
    "/auth/register",
  );
};

export const useRegister = () =>
  useMutation<IRegisterResponse, DetailsError, IRegisterVariables>({
    mutationKey: [registerKey],
    mutationFn: register,
  });

export * from "./register.types";
export * from "./register.validation";
