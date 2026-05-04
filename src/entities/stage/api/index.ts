import { useMutation, useQuery } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import {
  IDeletedResponse,
  IFieldListResponse,
  IFieldParticipantListResponse,
  IFieldResponse,
  IResourceListResponse,
  IResourceRequest,
  IResourceResponse,
  IStageOrganizesListResponse,
  IStageOrganizesResponse,
  IStageParticipantListResponse,
  IStageParticipantResponse,
  IStageRequest,
  ISubmissionFieldRequest,
} from "../model/stage.types";
import {
  deletedSchema,
  fieldListSchema,
  fieldParticipantListSchema,
  fieldSchema,
  resourceListSchema,
  resourceRequestSchema,
  resourceSchema,
  stageOrganizesListSchema,
  stageOrganizesSchema,
  stageParticipantListSchema,
  stageParticipantSchema,
  stageRequestSchema,
  submissionFieldRequestSchema,
} from "../model/stage.validation";

export const getOrganizerContestStagesKey = "getOrganizerContestStages";
export const createOrganizerContestStageKey = "createOrganizerContestStage";
export const getOrganizerStageKey = "getOrganizerStage";
export const updateOrganizerStageKey = "updateOrganizerStage";
export const deleteOrganizerStageKey = "deleteOrganizerStage";
export const getContestStagesKey = "getContestStages";
export const getContestStageKey = "getContestStage";
export const getOrganizerStageFieldsKey = "getOrganizerStageFields";
export const getContestStageFieldsKey = "getContestStageFields";
export const createStageFieldKey = "createStageField";
export const updateStageFieldKey = "updateStageField";
export const deleteStageFieldKey = "deleteStageField";
export const getStageResourcesKey = "getStageResources";
export const createStageResourceKey = "createStageResource";
export const updateStageResourceKey = "updateStageResource";
export const deleteStageResourceKey = "deleteStageResource";

export interface IContestIdVariables {
  contestId: number;
}

export interface IStageIdVariables {
  stageId: number;
}

export interface ICreateStageVariables extends IContestIdVariables {
  data: IStageRequest;
}

export interface IUpdateStageVariables extends IStageIdVariables {
  data: IStageRequest;
}

export interface IStageFieldVariables extends IStageIdVariables {
  fieldId: number;
}

export interface ICreateStageFieldVariables extends IStageIdVariables {
  data: ISubmissionFieldRequest;
}

export interface IUpdateStageFieldVariables extends IStageFieldVariables {
  data: ISubmissionFieldRequest;
}

export interface IStageResourceVariables extends IStageIdVariables {
  resourceId: number;
}

export interface ICreateStageResourceVariables extends IStageIdVariables {
  data: IResourceRequest;
}

export interface IUpdateStageResourceVariables extends IStageResourceVariables {
  data: IResourceRequest;
}

export const getOrganizerContestStages = ({
  contestId,
}: IContestIdVariables): Promise<IStageOrganizesListResponse> =>
  requestWithValidation<IStageOrganizesListResponse>(
    {
      url: `/organizer/contests/${contestId}/stages`,
      method: "GET",
    },
    stageOrganizesListSchema,
    "/organizer/contests/{contestId}/stages",
  );

export const createOrganizerContestStage = async ({
  contestId,
  data,
}: ICreateStageVariables): Promise<IStageOrganizesResponse> => {
  await validateWithSchema(
    data,
    stageRequestSchema,
    "/organizer/contests/{contestId}/stages",
  );

  return requestWithValidation<IStageOrganizesResponse>(
    {
      url: `/organizer/contests/${contestId}/stages`,
      method: "POST",
      data,
    },
    stageOrganizesSchema,
    "/organizer/contests/{contestId}/stages",
  );
};

export const getOrganizerStage = ({
  stageId,
}: IStageIdVariables): Promise<IStageOrganizesResponse> =>
  requestWithValidation<IStageOrganizesResponse>(
    {
      url: `/organizer/stages/${stageId}`,
      method: "GET",
    },
    stageOrganizesSchema,
    "/organizer/stages/{stageId}",
  );

export const updateOrganizerStage = async ({
  stageId,
  data,
}: IUpdateStageVariables): Promise<IStageOrganizesResponse> => {
  await validateWithSchema(
    data,
    stageRequestSchema,
    "/organizer/stages/{stageId}",
  );

  return requestWithValidation<IStageOrganizesResponse>(
    {
      url: `/organizer/stages/${stageId}`,
      method: "PATCH",
      data,
    },
    stageOrganizesSchema,
    "/organizer/stages/{stageId}",
  );
};

export const deleteOrganizerStage = ({
  stageId,
}: IStageIdVariables): Promise<IDeletedResponse> =>
  requestWithValidation<IDeletedResponse>(
    {
      url: `/organizer/stages/${stageId}`,
      method: "DELETE",
    },
    deletedSchema,
    "/organizer/stages/{stageId}",
  );

export const getContestStages = ({
  contestId,
}: IContestIdVariables): Promise<IStageParticipantListResponse> =>
  requestWithValidation<IStageParticipantListResponse>(
    {
      url: `/contests/${contestId}/stages`,
      method: "GET",
    },
    stageParticipantListSchema,
    "/contests/{contestId}/stages",
  );

export const getContestStage = ({
  stageId,
}: IStageIdVariables): Promise<IStageParticipantResponse> =>
  requestWithValidation<IStageParticipantResponse>(
    {
      url: `/contests/stages/${stageId}`,
      method: "GET",
    },
    stageParticipantSchema,
    "/contests/stages/{stageId}",
  );

export const getOrganizerStageFields = ({
  stageId,
}: IStageIdVariables): Promise<IFieldListResponse> =>
  requestWithValidation<IFieldListResponse>(
    {
      url: `/organizer/stages/${stageId}/fields`,
      method: "GET",
    },
    fieldListSchema,
    "/organizer/stages/{stageId}/fields",
  );

export const getContestStageFields = ({
  stageId,
}: IStageIdVariables): Promise<IFieldParticipantListResponse> =>
  requestWithValidation<IFieldParticipantListResponse>(
    {
      url: `/contests/stages/${stageId}/fields`,
      method: "GET",
    },
    fieldParticipantListSchema,
    "/contests/stages/{stageId}/fields",
  );

export const createStageField = async ({
  stageId,
  data,
}: ICreateStageFieldVariables): Promise<IFieldResponse> => {
  await validateWithSchema(
    data,
    submissionFieldRequestSchema,
    "/organizer/stages/{stageId}/fields",
  );

  return requestWithValidation<IFieldResponse>(
    {
      url: `/organizer/stages/${stageId}/fields`,
      method: "POST",
      data,
    },
    fieldSchema,
    "/organizer/stages/{stageId}/fields",
  );
};

export const updateStageField = async ({
  stageId,
  fieldId,
  data,
}: IUpdateStageFieldVariables): Promise<IFieldResponse> => {
  await validateWithSchema(
    data,
    submissionFieldRequestSchema,
    "/organizer/stages/{stageId}/fields/{fieldId}",
  );

  return requestWithValidation<IFieldResponse>(
    {
      url: `/organizer/stages/${stageId}/fields/${fieldId}`,
      method: "PATCH",
      data,
    },
    fieldSchema,
    "/organizer/stages/{stageId}/fields/{fieldId}",
  );
};

export const deleteStageField = ({
  stageId,
  fieldId,
}: IStageFieldVariables): Promise<IDeletedResponse> =>
  requestWithValidation<IDeletedResponse>(
    {
      url: `/organizer/stages/${stageId}/fields/${fieldId}`,
      method: "DELETE",
    },
    deletedSchema,
    "/organizer/stages/{stageId}/fields/{fieldId}",
  );

export const getStageResources = ({
  stageId,
}: IStageIdVariables): Promise<IResourceListResponse> =>
  requestWithValidation<IResourceListResponse>(
    {
      url: `/stages/${stageId}/resources`,
      method: "GET",
    },
    resourceListSchema,
    "/stages/{stageId}/resources",
  );

export const createStageResource = async ({
  stageId,
  data,
}: ICreateStageResourceVariables): Promise<IResourceResponse> => {
  await validateWithSchema(
    data,
    resourceRequestSchema,
    "/organizer/stages/{stageId}/resources",
  );

  return requestWithValidation<IResourceResponse>(
    {
      url: `/organizer/stages/${stageId}/resources`,
      method: "POST",
      data,
    },
    resourceSchema,
    "/organizer/stages/{stageId}/resources",
  );
};

export const updateStageResource = async ({
  stageId,
  resourceId,
  data,
}: IUpdateStageResourceVariables): Promise<IResourceResponse> => {
  await validateWithSchema(
    data,
    resourceRequestSchema,
    "/organizer/stages/{stageId}/resources/{resourceId}",
  );

  return requestWithValidation<IResourceResponse>(
    {
      url: `/organizer/stages/${stageId}/resources/${resourceId}`,
      method: "PATCH",
      data,
    },
    resourceSchema,
    "/organizer/stages/{stageId}/resources/{resourceId}",
  );
};

export const deleteStageResource = ({
  stageId,
  resourceId,
}: IStageResourceVariables): Promise<IDeletedResponse> =>
  requestWithValidation<IDeletedResponse>(
    {
      url: `/organizer/stages/${stageId}/resources/${resourceId}`,
      method: "DELETE",
    },
    deletedSchema,
    "/organizer/stages/{stageId}/resources/{resourceId}",
  );

export const useGetOrganizerContestStages = (contestId: number) =>
  useQuery<IStageOrganizesListResponse, DetailsError>({
    queryKey: [getOrganizerContestStagesKey, contestId],
    queryFn: () => getOrganizerContestStages({ contestId }),
  });

export const useCreateOrganizerContestStage = () =>
  useMutation<IStageOrganizesResponse, DetailsError, ICreateStageVariables>({
    mutationKey: [createOrganizerContestStageKey],
    mutationFn: createOrganizerContestStage,
  });

export const useGetOrganizerStage = (stageId: number) =>
  useQuery<IStageOrganizesResponse, DetailsError>({
    queryKey: [getOrganizerStageKey, stageId],
    queryFn: () => getOrganizerStage({ stageId }),
  });

export const useUpdateOrganizerStage = () =>
  useMutation<IStageOrganizesResponse, DetailsError, IUpdateStageVariables>({
    mutationKey: [updateOrganizerStageKey],
    mutationFn: updateOrganizerStage,
  });

export const useDeleteOrganizerStage = () =>
  useMutation<IDeletedResponse, DetailsError, IStageIdVariables>({
    mutationKey: [deleteOrganizerStageKey],
    mutationFn: deleteOrganizerStage,
  });

export const useGetContestStages = (contestId: number) =>
  useQuery<IStageParticipantListResponse, DetailsError>({
    queryKey: [getContestStagesKey, contestId],
    queryFn: () => getContestStages({ contestId }),
  });

export const useGetContestStage = (stageId: number) =>
  useQuery<IStageParticipantResponse, DetailsError>({
    queryKey: [getContestStageKey, stageId],
    queryFn: () => getContestStage({ stageId }),
  });

export const useGetOrganizerStageFields = (stageId: number) =>
  useQuery<IFieldListResponse, DetailsError>({
    queryKey: [getOrganizerStageFieldsKey, stageId],
    queryFn: () => getOrganizerStageFields({ stageId }),
  });

export const useGetContestStageFields = (stageId: number) =>
  useQuery<IFieldParticipantListResponse, DetailsError>({
    queryKey: [getContestStageFieldsKey, stageId],
    queryFn: () => getContestStageFields({ stageId }),
  });

export const useCreateStageField = () =>
  useMutation<IFieldResponse, DetailsError, ICreateStageFieldVariables>({
    mutationKey: [createStageFieldKey],
    mutationFn: createStageField,
  });

export const useUpdateStageField = () =>
  useMutation<IFieldResponse, DetailsError, IUpdateStageFieldVariables>({
    mutationKey: [updateStageFieldKey],
    mutationFn: updateStageField,
  });

export const useDeleteStageField = () =>
  useMutation<IDeletedResponse, DetailsError, IStageFieldVariables>({
    mutationKey: [deleteStageFieldKey],
    mutationFn: deleteStageField,
  });

export const useGetStageResources = (stageId: number) =>
  useQuery<IResourceListResponse, DetailsError>({
    queryKey: [getStageResourcesKey, stageId],
    queryFn: () => getStageResources({ stageId }),
  });

export const useCreateStageResource = () =>
  useMutation<IResourceResponse, DetailsError, ICreateStageResourceVariables>({
    mutationKey: [createStageResourceKey],
    mutationFn: createStageResource,
  });

export const useUpdateStageResource = () =>
  useMutation<IResourceResponse, DetailsError, IUpdateStageResourceVariables>({
    mutationKey: [updateStageResourceKey],
    mutationFn: updateStageResource,
  });

export const useDeleteStageResource = () =>
  useMutation<IDeletedResponse, DetailsError, IStageResourceVariables>({
    mutationKey: [deleteStageResourceKey],
    mutationFn: deleteStageResource,
  });

export * from "../model/stage.types";
export * from "../model/stage.converters";
