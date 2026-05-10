import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import {
  ICreateProjectResponse,
  ICreateProjectVariables,
} from "./createProject.types";
import {
  createProjectRequestSchema,
  createProjectResponseSchema,
} from "./createProject.validation";

export const createProjectKey = "createProject";

export const createProject = async (
  data: ICreateProjectVariables,
): Promise<ICreateProjectResponse> => {
  await validateWithSchema(data, createProjectRequestSchema, "/projects");

  return requestWithValidation<ICreateProjectResponse>(
    {
      url: "/projects",
      method: "POST",
      data,
    },
    createProjectResponseSchema,
    "/projects",
  );
};

export const useCreateProject = () =>
  useMutation<ICreateProjectResponse, DetailsError, ICreateProjectVariables>({
    mutationKey: [createProjectKey],
    mutationFn: createProject,
  });

export * from "./createProject.types";
export * from "./createProject.validation";
