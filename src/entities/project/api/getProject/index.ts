import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetProjectResponse, IGetProjectVariables } from "./getProject.types";
import { getProjectResponseSchema } from "./getProject.validation";

export const getProjectKey = "getProject";

export const getProject = ({
  projectId,
}: IGetProjectVariables): Promise<IGetProjectResponse> =>
  requestWithValidation<IGetProjectResponse>(
    {
      url: `/projects/${projectId}`,
      method: "GET",
    },
    getProjectResponseSchema,
    "/projects/{projectId}",
  );

export const useGetProject = (projectId: number, enabled = true) =>
  useQuery<IGetProjectResponse, DetailsError>({
    queryKey: [getProjectKey, projectId],
    queryFn: () => getProject({ projectId }),
    enabled,
  });

export * from "./getProject.types";
export * from "./getProject.validation";
