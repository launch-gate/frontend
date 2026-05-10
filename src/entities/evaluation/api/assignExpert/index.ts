import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import {
  IAssignExpertResponse,
  IAssignExpertVariables,
} from "./assignExpert.types";
import {
  assignExpertRequestSchema,
  assignExpertResponseSchema,
} from "./assignExpert.validation";

export const assignExpertKey = "assignExpert";

export const assignExpert = async (
  data: IAssignExpertVariables,
): Promise<IAssignExpertResponse> => {
  await validateWithSchema(
    data,
    assignExpertRequestSchema,
    "/organizer/evaluations/assignments",
  );

  return requestWithValidation<IAssignExpertResponse>(
    {
      url: "/organizer/evaluations/assignments",
      method: "POST",
      data,
    },
    assignExpertResponseSchema,
    "/organizer/evaluations/assignments",
  );
};

export const useAssignExpert = () =>
  useMutation<IAssignExpertResponse, DetailsError, IAssignExpertVariables>({
    mutationKey: [assignExpertKey],
    mutationFn: assignExpert,
  });

export * from "./assignExpert.types";
export * from "./assignExpert.validation";
