import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidationError } from "yup";

import API, { DetailsError, IError } from "@/shared/api";
import { IGetCreateCompetition } from "@/entities/competition/api";

import { competitionItemSchema } from "../getCompetitionsList/getCompetitionsList.validation";

const getCompetitionTagsKey = "getCompetitionTags";

const getCompetition = async (id: number): Promise<IGetCreateCompetition> => {
  return API<IGetCreateCompetition>({
    url: `/competitions/get/${id}`,
    method: "GET",
  })
    .then(async ({ data }) => {
      const validate = await competitionItemSchema.validate(data, {
        abortEarly: false,
      });
      return validate;
    })
    .catch((error: AxiosError<IError> | ValidationError) => {
      const errorName = "/tags";

      if (error instanceof AxiosError) {
        throw new DetailsError(errorName, {
          status: error.response?.status,
          error: {
            errorID: error.response?.data.ErrorID,
            message: error.response?.data.Message,
          },
        });
      } else {
        const validation = error.inner.map((error) => error.message);
        throw new DetailsError(errorName, { validation });
      }
    });
};

export const useGetCompetition = (id: number) =>
  useQuery<IGetCreateCompetition, AxiosError, IGetCreateCompetition>({
    queryKey: [getCompetitionTagsKey, id],
    queryFn: async (): Promise<IGetCreateCompetition> => getCompetition(id),
  });
