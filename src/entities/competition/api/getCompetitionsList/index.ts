import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidationError } from "yup";

import API, { DetailsError, IError } from "@/shared/api";
import { removeEmpty } from "@/shared/lib";
import { IGetCreateCompetition } from "@/entities/competition/api";

import { competitionsListValidationSchema } from "./getCompetitionsList.validation";
import { IGetCompetition } from "./getCompetitionsList.types";

const getCargoTypesKey = "getCargoTypesList";

const getCompetitionsList = async (
  params: IGetCompetition,
): Promise<IGetCreateCompetition[]> => {
  return API<IGetCreateCompetition[]>({
    url: `/competitions/get-all`,
    method: "GET",
    params: removeEmpty(params),
  })
    .then(async ({ data }) => {
      const validate = await competitionsListValidationSchema.validate(data, {
        abortEarly: false,
      });
      return validate;
    })
    .catch((error: AxiosError<IError> | ValidationError) => {
      const errorName = "/competition";

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

const groupGetCompetitionsList = (search: string) =>
  infiniteQueryOptions({
    queryKey: [getCargoTypesKey, search],
    queryFn: ({ pageParam }) =>
      getCompetitionsList({ search, page: pageParam }),
    initialPageParam: 0,
    select: (data) => data?.pages.flat(),
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage?.length ? lastPageParam + 1 : null,
  });

export const useGetCompetitionsList = (search: string) =>
  useInfiniteQuery(groupGetCompetitionsList(search));

export * from "./getCompetitionsList.types";
