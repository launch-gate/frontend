import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import {
  ICreateCustomContestExportResponse,
  ICreateCustomContestExportVariables,
} from "./createCustomContestExport.types";
import {
  createCustomContestExportRequestSchema,
  createCustomContestExportResponseSchema,
} from "./createCustomContestExport.validation";

export const createCustomContestExportKey = "createCustomContestExport";

export const createCustomContestExport = async ({
  contestId,
  data,
}: ICreateCustomContestExportVariables): Promise<ICreateCustomContestExportResponse> => {
  await validateWithSchema(
    data,
    createCustomContestExportRequestSchema,
    "/organizer/contests/{contestId}/exports/custom",
  );

  return requestWithValidation<ICreateCustomContestExportResponse>(
    {
      url: `/organizer/contests/${contestId}/exports/custom`,
      method: "POST",
      data,
    },
    createCustomContestExportResponseSchema,
    "/organizer/contests/{contestId}/exports/custom",
  );
};

export const useCreateCustomContestExport = () =>
  useMutation<
    ICreateCustomContestExportResponse,
    DetailsError,
    ICreateCustomContestExportVariables
  >({
    mutationKey: [createCustomContestExportKey],
    mutationFn: createCustomContestExport,
  });

export * from "./createCustomContestExport.types";
export * from "./createCustomContestExport.validation";
