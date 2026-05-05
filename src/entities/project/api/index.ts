import { useMutation, useQuery } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";
import { IStageSubmissionResponse, toValueRequest } from "@/entities/stage";
import { stageSubmissionSchema } from "@/entities/stage/model/stage.validation";

import {
  IMyProjectsResponse,
  IProjectRequest,
  IProjectResponse,
  ISaveProjectStageValueVariables,
  ISubmitProjectStageVariables,
} from "../model/project.types";
import {
  myProjectsSchema,
  projectRequestSchema,
  projectSchema,
  valueRequestSchema,
} from "../model/project.validation";

export const createProjectKey = "createProject";
export const getProjectKey = "getProject";
export const getMyProjectsKey = "getMyProjects";
export const saveProjectStageValueKey = "saveProjectStageValue";
export const submitProjectStageKey = "submitProjectStage";
export const getOrganizerStageSubmissionKey = "getOrganizerStageSubmission";

export interface IProjectIdVariables {
  projectId: number;
}

export interface ISubmissionIdVariables {
  submissionId: number;
}

export const createProject = async (
  data: IProjectRequest,
): Promise<IProjectResponse> => {
  await validateWithSchema(data, projectRequestSchema, "/projects");

  return requestWithValidation<IProjectResponse>(
    {
      url: "/projects",
      method: "POST",
      data,
    },
    projectSchema,
    "/projects",
  );
};

export const getProject = ({
  projectId,
}: IProjectIdVariables): Promise<IProjectResponse> =>
  requestWithValidation<IProjectResponse>(
    {
      url: `/projects/${projectId}`,
      method: "GET",
    },
    projectSchema,
    "/projects/{projectId}",
  );

export const getMyProjects = (): Promise<IMyProjectsResponse> =>
  requestWithValidation<IMyProjectsResponse>(
    {
      url: "/projects/my",
      method: "GET",
    },
    myProjectsSchema,
    "/projects/my",
  );

export const saveProjectStageValue = async ({
  projectId,
  stageId,
  data,
}: ISaveProjectStageValueVariables): Promise<IStageSubmissionResponse> => {
  const requestData = toValueRequest(data);
  await validateWithSchema(
    requestData,
    valueRequestSchema,
    "/projects/{projectId}/stages/{stageId}/values",
  );

  return requestWithValidation<IStageSubmissionResponse>(
    {
      url: `/projects/${projectId}/stages/${stageId}/values`,
      method: "POST",
      data: requestData,
    },
    stageSubmissionSchema,
    "/projects/{projectId}/stages/{stageId}/values",
  );
};

export const submitProjectStage = ({
  projectId,
  stageId,
}: ISubmitProjectStageVariables): Promise<IStageSubmissionResponse> =>
  requestWithValidation<IStageSubmissionResponse>(
    {
      url: `/projects/${projectId}/stages/${stageId}/submit`,
      method: "POST",
    },
    stageSubmissionSchema,
    "/projects/{projectId}/stages/{stageId}/submit",
  );

export const getOrganizerStageSubmission = ({
  submissionId,
}: ISubmissionIdVariables): Promise<IStageSubmissionResponse> =>
  requestWithValidation<IStageSubmissionResponse>(
    {
      url: `/projects/organizer/stage-submissions/${submissionId}`,
      method: "GET",
    },
    stageSubmissionSchema,
    "/projects/organizer/stage-submissions/{submissionId}",
  );

export const useCreateProject = () =>
  useMutation<IProjectResponse, DetailsError, IProjectRequest>({
    mutationKey: [createProjectKey],
    mutationFn: createProject,
  });

export const useGetProject = (projectId: number, enabled = true) =>
  useQuery<IProjectResponse, DetailsError>({
    queryKey: [getProjectKey, projectId],
    queryFn: () => getProject({ projectId }),
    enabled,
  });

export const useGetMyProjects = () =>
  useQuery<IMyProjectsResponse, DetailsError>({
    queryKey: [getMyProjectsKey],
    queryFn: getMyProjects,
  });

export const useSaveProjectStageValue = () =>
  useMutation<
    IStageSubmissionResponse,
    DetailsError,
    ISaveProjectStageValueVariables
  >({
    mutationKey: [saveProjectStageValueKey],
    mutationFn: saveProjectStageValue,
  });

export const useSubmitProjectStage = () =>
  useMutation<
    IStageSubmissionResponse,
    DetailsError,
    ISubmitProjectStageVariables
  >({
    mutationKey: [submitProjectStageKey],
    mutationFn: submitProjectStage,
  });

export const useGetOrganizerStageSubmission = (
  submissionId: number,
  enabled = true,
) =>
  useQuery<IStageSubmissionResponse, DetailsError>({
    queryKey: [getOrganizerStageSubmissionKey, submissionId],
    queryFn: () => getOrganizerStageSubmission({ submissionId }),
    enabled,
  });

export * from "../model/project.types";
