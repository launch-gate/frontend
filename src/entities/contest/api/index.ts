import { useMutation, useQuery } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";
import { deletedSchema, IDeletedResponse } from "@/entities/stage";
import {
  IAddOrganizerRequest,
  IContestAnalyticsResponse,
  IContestInfoResponse,
  IContestListInfoResponse,
  IContestParticipantListResponse,
  IContestParticipantOrganizerListResponse,
  IContestRequest,
  ICustomExportRequest,
  ICustomExportResponse,
  ExportFormat,
  IOrganizerListResponse,
  IOrganizerResponse,
  IParticipantContestRegistrationResponse,
} from "@/entities/contest";

import {
  addOrganizerRequestSchema,
  contestAnalyticsSchema,
  contestInfoSchema,
  contestListInfoSchema,
  contestParticipantListSchema,
  contestParticipantOrganizerListSchema,
  contestRequestSchema,
  customExportRequestSchema,
  customExportSchema,
  organizerListSchema,
  organizerSchema,
  participantContestRegistrationSchema,
} from "../model/contest.validation";

export const getContestsKey = "getContests";
export const getContestKey = "getContest";
export const registerContestKey = "registerContest";
export const getContestParticipantsKey = "getContestParticipants";
export const getOrganizerContestsKey = "getOrganizerContests";
export const createOrganizerContestKey = "createOrganizerContest";
export const updateOrganizerContestKey = "updateOrganizerContest";
export const publishOrganizerContestKey = "publishOrganizerContest";
export const deleteOrganizerContestKey = "deleteOrganizerContest";
export const getOrganizerContestParticipantsKey =
  "getOrganizerContestParticipants";
export const getContestOrganizersKey = "getContestOrganizers";
export const addContestOrganizerKey = "addContestOrganizer";
export const deleteContestOrganizerKey = "deleteContestOrganizer";
export const getContestAnalyticsKey = "getContestAnalytics";
export const exportContestRankingKey = "exportContestRanking";
export const createCustomContestExportKey = "createCustomContestExport";

export interface IContestIdVariables {
  contestId: number;
}

export interface IUpdateContestVariables extends IContestIdVariables {
  data: IContestRequest;
}

export interface IAddContestOrganizerVariables extends IContestIdVariables {
  data: IAddOrganizerRequest;
}

export interface IDeleteContestOrganizerVariables extends IContestIdVariables {
  organizerId: number;
}

export interface IExportContestRankingVariables extends IContestIdVariables {
  format?: ExportFormat;
}

export interface ICreateCustomContestExportVariables
  extends IContestIdVariables {
  data: ICustomExportRequest;
}

export const getContests = (): Promise<IContestListInfoResponse> =>
  requestWithValidation<IContestListInfoResponse>(
    {
      url: "/contests",
      method: "GET",
    },
    contestListInfoSchema,
    "/contests",
  );

export const getContest = ({
  contestId,
}: IContestIdVariables): Promise<IContestInfoResponse> =>
  requestWithValidation<IContestInfoResponse>(
    {
      url: `/contests/${contestId}`,
      method: "GET",
    },
    contestInfoSchema,
    "/contests/{contestId}",
  );

export const registerContest = ({
  contestId,
}: IContestIdVariables): Promise<IParticipantContestRegistrationResponse> =>
  requestWithValidation<IParticipantContestRegistrationResponse>(
    {
      url: `/contests/${contestId}/registrations`,
      method: "POST",
    },
    participantContestRegistrationSchema,
    "/contests/{contestId}/registrations",
  );

export const getContestParticipants = ({
  contestId,
}: IContestIdVariables): Promise<IContestParticipantListResponse> =>
  requestWithValidation<IContestParticipantListResponse>(
    {
      url: `/contests/${contestId}/participants`,
      method: "GET",
    },
    contestParticipantListSchema,
    "/contests/{contestId}/participants",
  );

export const getOrganizerContests = (): Promise<IContestListInfoResponse> =>
  requestWithValidation<IContestListInfoResponse>(
    {
      url: "/organizer/contests",
      method: "GET",
    },
    contestListInfoSchema,
    "/organizer/contests",
  );

export const createOrganizerContest = async (
  data: IContestRequest,
): Promise<IContestInfoResponse> => {
  await validateWithSchema(data, contestRequestSchema, "/organizer/contests");

  return requestWithValidation<IContestInfoResponse>(
    {
      url: "/organizer/contests",
      method: "POST",
      data,
    },
    contestInfoSchema,
    "/organizer/contests",
  );
};

export const updateOrganizerContest = async ({
  contestId,
  data,
}: IUpdateContestVariables): Promise<IContestInfoResponse> => {
  await validateWithSchema(
    data,
    contestRequestSchema,
    "/organizer/contests/{contestId}",
  );

  return requestWithValidation<IContestInfoResponse>(
    {
      url: `/organizer/contests/${contestId}`,
      method: "PATCH",
      data,
    },
    contestInfoSchema,
    "/organizer/contests/{contestId}",
  );
};

export const publishOrganizerContest = ({
  contestId,
}: IContestIdVariables): Promise<IContestInfoResponse> =>
  requestWithValidation<IContestInfoResponse>(
    {
      url: `/organizer/contests/${contestId}/publish`,
      method: "POST",
    },
    contestInfoSchema,
    "/organizer/contests/{contestId}/publish",
  );

export const deleteOrganizerContest = ({
  contestId,
}: IContestIdVariables): Promise<IDeletedResponse> =>
  requestWithValidation<IDeletedResponse>(
    {
      url: `/organizer/contests/${contestId}`,
      method: "DELETE",
    },
    deletedSchema,
    "/organizer/contests/{contestId}",
  );

export const getOrganizerContestParticipants = ({
  contestId,
}: IContestIdVariables): Promise<IContestParticipantOrganizerListResponse> =>
  requestWithValidation<IContestParticipantOrganizerListResponse>(
    {
      url: `/organizer/contests/${contestId}/participants`,
      method: "GET",
    },
    contestParticipantOrganizerListSchema,
    "/organizer/contests/{contestId}/participants",
  );

export const getContestOrganizers = ({
  contestId,
}: IContestIdVariables): Promise<IOrganizerListResponse> =>
  requestWithValidation<IOrganizerListResponse>(
    {
      url: `/organizer/contests/${contestId}/organizers`,
      method: "GET",
    },
    organizerListSchema,
    "/organizer/contests/{contestId}/organizers",
  );

export const addContestOrganizer = async ({
  contestId,
  data,
}: IAddContestOrganizerVariables): Promise<IOrganizerResponse> => {
  await validateWithSchema(
    data,
    addOrganizerRequestSchema,
    "/organizer/contests/{contestId}/organizers",
  );

  return requestWithValidation<IOrganizerResponse>(
    {
      url: `/organizer/contests/${contestId}/organizers`,
      method: "POST",
      data,
    },
    organizerSchema,
    "/organizer/contests/{contestId}/organizers",
  );
};

export const deleteContestOrganizer = ({
  contestId,
  organizerId,
}: IDeleteContestOrganizerVariables): Promise<IDeletedResponse> =>
  requestWithValidation<IDeletedResponse>(
    {
      url: `/organizer/contests/${contestId}/organizers/${organizerId}`,
      method: "DELETE",
    },
    deletedSchema,
    "/organizer/contests/{contestId}/organizers/{organizerId}",
  );

export const getContestAnalytics = ({
  contestId,
}: IContestIdVariables): Promise<IContestAnalyticsResponse> =>
  requestWithValidation<IContestAnalyticsResponse>(
    {
      url: `/organizer/contests/${contestId}/analytics`,
      method: "GET",
    },
    contestAnalyticsSchema,
    "/organizer/contests/{contestId}/analytics",
  );

export const exportContestRanking = ({
  contestId,
  format = "CSV",
}: IExportContestRankingVariables): Promise<Blob> =>
  requestWithValidation<Blob>(
    {
      url: `/organizer/contests/${contestId}/exports/ranking`,
      method: "GET",
      params: { format },
      responseType: "blob",
    },
    null,
    "/organizer/contests/{contestId}/exports/ranking",
  );

export const createCustomContestExport = async ({
  contestId,
  data,
}: ICreateCustomContestExportVariables): Promise<ICustomExportResponse> => {
  await validateWithSchema(
    data,
    customExportRequestSchema,
    "/organizer/contests/{contestId}/exports/custom",
  );

  return requestWithValidation<ICustomExportResponse>(
    {
      url: `/organizer/contests/${contestId}/exports/custom`,
      method: "POST",
      data,
    },
    customExportSchema,
    "/organizer/contests/{contestId}/exports/custom",
  );
};

export const useGetContests = () =>
  useQuery<IContestListInfoResponse, DetailsError>({
    queryKey: [getContestsKey],
    queryFn: getContests,
  });

export const useGetContest = (contestId: number) =>
  useQuery<IContestInfoResponse, DetailsError>({
    queryKey: [getContestKey, contestId],
    queryFn: () => getContest({ contestId }),
  });

export const useRegisterContest = () =>
  useMutation<
    IParticipantContestRegistrationResponse,
    DetailsError,
    IContestIdVariables
  >({
    mutationKey: [registerContestKey],
    mutationFn: registerContest,
  });

export const useGetContestParticipants = (contestId: number, enabled = true) =>
  useQuery<IContestParticipantListResponse, DetailsError>({
    queryKey: [getContestParticipantsKey, contestId],
    queryFn: () => getContestParticipants({ contestId }),
    enabled,
  });

export const useGetOrganizerContests = () =>
  useQuery<IContestListInfoResponse, DetailsError>({
    queryKey: [getOrganizerContestsKey],
    queryFn: getOrganizerContests,
  });

export const useCreateOrganizerContest = () =>
  useMutation<IContestInfoResponse, DetailsError, IContestRequest>({
    mutationKey: [createOrganizerContestKey],
    mutationFn: createOrganizerContest,
  });

export const useUpdateOrganizerContest = () =>
  useMutation<IContestInfoResponse, DetailsError, IUpdateContestVariables>({
    mutationKey: [updateOrganizerContestKey],
    mutationFn: updateOrganizerContest,
  });

export const usePublishOrganizerContest = () =>
  useMutation<IContestInfoResponse, DetailsError, IContestIdVariables>({
    mutationKey: [publishOrganizerContestKey],
    mutationFn: publishOrganizerContest,
  });

export const useDeleteOrganizerContest = () =>
  useMutation<IDeletedResponse, DetailsError, IContestIdVariables>({
    mutationKey: [deleteOrganizerContestKey],
    mutationFn: deleteOrganizerContest,
  });

export const useGetOrganizerContestParticipants = (contestId: number) =>
  useQuery<IContestParticipantOrganizerListResponse, DetailsError>({
    queryKey: [getOrganizerContestParticipantsKey, contestId],
    queryFn: () => getOrganizerContestParticipants({ contestId }),
  });

export const useGetContestOrganizers = (contestId: number) =>
  useQuery<IOrganizerListResponse, DetailsError>({
    queryKey: [getContestOrganizersKey, contestId],
    queryFn: () => getContestOrganizers({ contestId }),
  });

export const useAddContestOrganizer = () =>
  useMutation<IOrganizerResponse, DetailsError, IAddContestOrganizerVariables>({
    mutationKey: [addContestOrganizerKey],
    mutationFn: addContestOrganizer,
  });

export const useDeleteContestOrganizer = () =>
  useMutation<IDeletedResponse, DetailsError, IDeleteContestOrganizerVariables>(
    {
      mutationKey: [deleteContestOrganizerKey],
      mutationFn: deleteContestOrganizer,
    },
  );

export const useGetContestAnalytics = (contestId: number) =>
  useQuery<IContestAnalyticsResponse, DetailsError>({
    queryKey: [getContestAnalyticsKey, contestId],
    queryFn: () => getContestAnalytics({ contestId }),
  });

export const useExportContestRanking = () =>
  useMutation<Blob, DetailsError, IExportContestRankingVariables>({
    mutationKey: [exportContestRankingKey],
    mutationFn: exportContestRanking,
  });

export const useCreateCustomContestExport = () =>
  useMutation<
    ICustomExportResponse,
    DetailsError,
    ICreateCustomContestExportVariables
  >({
    mutationKey: [createCustomContestExportKey],
    mutationFn: createCustomContestExport,
  });

export * from "../model/contest.types";
