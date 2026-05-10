import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetMyProjectsResponse } from "./getMyProjects.types";
import { getMyProjectsResponseSchema } from "./getMyProjects.validation";

export const getMyProjectsKey = "getMyProjects";

export const getMyProjects = (): Promise<IGetMyProjectsResponse> =>
  requestWithValidation<IGetMyProjectsResponse>(
    {
      url: "/projects/my",
      method: "GET",
    },
    getMyProjectsResponseSchema,
    "/projects/my",
  );

export const useGetMyProjects = () =>
  useQuery<IGetMyProjectsResponse, DetailsError>({
    queryKey: [getMyProjectsKey],
    queryFn: getMyProjects,
  });

export * from "./getMyProjects.types";
export * from "./getMyProjects.validation";
