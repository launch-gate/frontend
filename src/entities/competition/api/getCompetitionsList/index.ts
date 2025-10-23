import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidationError } from "yup";

import API, { DetailsError, IError } from "@/shared/api";

import { cargoTypeSchema } from "./getCompetitionsList.validation";
import { IGetCompetition, ICompetition } from "./getCompetitionsList.types";

const getCargoTypesKey = "getCargoTypesList";

const getCompetitionsList = async (
  params: IGetCompetition,
): Promise<ICompetition[]> => {
  return API<ICompetition[]>({
    url: `/web/competition`,
    method: "GET",
    params,
  })
    .then(async ({ data }) => {
      const validate = await cargoTypeSchema.validate(data, {
        abortEarly: false,
      });
      return validate;
    })
    .catch((error: AxiosError<IError> | ValidationError) => {
      const errorName = "/preorders/getCargoTypesList";

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

const groupGetCompetitionsList = (find: string) =>
  infiniteQueryOptions({
    queryKey: [getCargoTypesKey, find],
    queryFn: ({ pageParam }) => getCompetitionsList({ find, page: pageParam }),
    initialPageParam: 1,
    select: (data) => data?.pages.flat(),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage?.length ? lastPageParam + 1 : null,
  });

export const useGetCompetitionsList = (find: string) =>
  useInfiniteQuery(groupGetCompetitionsList(find));

export * from "./getCompetitionsList.types";
