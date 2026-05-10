import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IContestIdVariables, IGetContestResponse } from "./getContest.types";
import { getContestResponseSchema } from "./getContest.validation";

export const getContestKey = "getContest";

export const getContest = ({
  contestId,
}: IContestIdVariables): Promise<IGetContestResponse> =>
  requestWithValidation<IGetContestResponse>(
    {
      url: `/contests/${contestId}`,
      method: "GET",
    },
    getContestResponseSchema,
    "/contests/{contestId}",
  );

export const useGetContest = (contestId: number) =>
  useQuery<IGetContestResponse, DetailsError>({
    queryKey: [getContestKey, contestId],
    queryFn: () => getContest({ contestId }),
  });

export * from "./getContest.types";
export * from "./getContest.validation";
