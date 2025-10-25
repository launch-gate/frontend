import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidationError } from "yup";

import API, { DetailsError, IError } from "@/shared/api";
import { ITag } from "@/entities/tags";

import { tagsArraySchema } from "./getTags.validation";

const getCompetitionTagsKey = "getCompetitionTags";

const getTagsList = async (): Promise<ITag[]> => {
  return API<ITag[]>({
    url: `/web/tags`,
    method: "GET",
  })
    .then(async ({ data }) => {
      const validate = await tagsArraySchema.validate(data, {
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

export const useGetTags = () =>
  useQuery<ITag[], AxiosError, ITag[]>({
    queryKey: [getCompetitionTagsKey],
    queryFn: async (): Promise<ITag[]> => getTagsList(),
  });

export * from "./getTags.types";
