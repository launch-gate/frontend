import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidationError } from "yup";

import API, { DetailsError, IError } from "@/shared/api";

import { competitionItemSchema } from "./getCompetition.validation";
import { GetCompetitionType } from "./getCompetition.types";

const getCompetitionTagsKey = "getCompetitionTags";

const getCompetition = async (id: number): Promise<GetCompetitionType> => {
  return API<GetCompetitionType>({
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
  useQuery<GetCompetitionType, AxiosError, GetCompetitionType>({
    queryKey: [getCompetitionTagsKey, id],
    queryFn: async (): Promise<GetCompetitionType> => getCompetition(id),
  });
