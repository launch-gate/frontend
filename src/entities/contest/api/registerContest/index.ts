import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IRegisterContestResponse,
  IRegisterContestVariables,
} from "./registerContest.types";
import { registerContestResponseSchema } from "./registerContest.validation";

export const registerContestKey = "registerContest";

export const registerContest = ({
  contestId,
}: IRegisterContestVariables): Promise<IRegisterContestResponse> =>
  requestWithValidation<IRegisterContestResponse>(
    {
      url: `/contests/${contestId}/registrations`,
      method: "POST",
    },
    registerContestResponseSchema,
    "/contests/{contestId}/registrations",
  );

export const useRegisterContest = () =>
  useMutation<
    IRegisterContestResponse,
    DetailsError,
    IRegisterContestVariables
  >({
    mutationKey: [registerContestKey],
    mutationFn: registerContest,
  });

export * from "./registerContest.types";
export * from "./registerContest.validation";
