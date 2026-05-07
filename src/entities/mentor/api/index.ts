import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";
import { IStageSubmissionResponse } from "@/entities/stage";
import { stageSubmissionSchema } from "@/entities/stage/model/stage.validation";

import {
  IAssignMentorRequest,
  IMentorAssignmentListResponse,
  IMentorAssignmentResponse,
  IMentorCallCreatedResponse,
  IMentorCallListResponse,
  IMentorCommentCreatedResponse,
  IMentorCommentListResponse,
  IMentorCommentRequest,
  IScheduleCallRequest,
} from "../model/mentor.types";
import {
  assignMentorRequestSchema,
  mentorAssignmentListSchema,
  mentorAssignmentSchema,
  mentorCallCreatedSchema,
  mentorCallListSchema,
  mentorCommentCreatedSchema,
  mentorCommentListSchema,
  mentorCommentRequestSchema,
  scheduleCallRequestSchema,
} from "../model/mentor.validation";

export const assignMentorKey = "assignMentor";
export const getMentorTeamsKey = "getMentorTeams";
export const getMentorCallsKey = "getMentorCalls";
export const createMentorCallKey = "createMentorCall";
export const getTeamMentorCallsKey = "getTeamMentorCalls";
export const getMentorStageSubmissionKey = "getMentorStageSubmission";
export const getStageSubmissionMentorCommentsKey =
  "getStageSubmissionMentorComments";
export const createMentorCommentKey = "createMentorComment";

export interface ITeamIdVariables {
  teamId: number;
}

export interface IStageSubmissionIdVariables {
  stageSubmissionId: number;
}

export const assignMentor = async (
  data: IAssignMentorRequest,
): Promise<IMentorAssignmentResponse> => {
  await validateWithSchema(
    data,
    assignMentorRequestSchema,
    "/organizer/mentors/assignments",
  );

  return requestWithValidation<IMentorAssignmentResponse>(
    {
      url: "/organizer/mentors/assignments",
      method: "POST",
      data,
    },
    mentorAssignmentSchema,
    "/organizer/mentors/assignments",
  );
};

export const getMentorTeams = (): Promise<IMentorAssignmentListResponse> =>
  requestWithValidation<IMentorAssignmentListResponse>(
    {
      url: "/mentor/teams",
      method: "GET",
    },
    mentorAssignmentListSchema,
    "/mentor/teams",
  );

export const getMentorCalls = (): Promise<IMentorCallListResponse> =>
  requestWithValidation<IMentorCallListResponse>(
    {
      url: "/mentor/calls",
      method: "GET",
    },
    mentorCallListSchema,
    "/mentor/calls",
  );

export const createMentorCall = async (
  data: IScheduleCallRequest,
): Promise<IMentorCallCreatedResponse> => {
  await validateWithSchema(data, scheduleCallRequestSchema, "/mentor/calls");

  return requestWithValidation<IMentorCallCreatedResponse>(
    {
      url: "/mentor/calls",
      method: "POST",
      data,
    },
    mentorCallCreatedSchema,
    "/mentor/calls",
  );
};

export const getTeamMentorCalls = ({
  teamId,
}: ITeamIdVariables): Promise<IMentorCallListResponse> =>
  requestWithValidation<IMentorCallListResponse>(
    {
      url: `/teams/${teamId}/mentor-calls`,
      method: "GET",
    },
    mentorCallListSchema,
    "/teams/{teamId}/mentor-calls",
  );

export const getMentorStageSubmission = ({
  stageSubmissionId,
}: IStageSubmissionIdVariables): Promise<IStageSubmissionResponse> =>
  requestWithValidation<IStageSubmissionResponse>(
    {
      url: `/mentor/stage-submissions/${stageSubmissionId}`,
      method: "GET",
    },
    stageSubmissionSchema,
    "/mentor/stage-submissions/{stageSubmissionId}",
  );

export const getStageSubmissionMentorComments = ({
  stageSubmissionId,
}: IStageSubmissionIdVariables): Promise<IMentorCommentListResponse> =>
  requestWithValidation<IMentorCommentListResponse>(
    {
      url: `/stage-submissions/${stageSubmissionId}/mentor-comments`,
      method: "GET",
    },
    mentorCommentListSchema,
    "/stage-submissions/{stageSubmissionId}/mentor-comments",
  );

export const createMentorComment = async (
  data: IMentorCommentRequest,
): Promise<IMentorCommentCreatedResponse> => {
  await validateWithSchema(
    data,
    mentorCommentRequestSchema,
    "/mentor/comments",
  );

  return requestWithValidation<IMentorCommentCreatedResponse>(
    {
      url: "/mentor/comments",
      method: "POST",
      data,
    },
    mentorCommentCreatedSchema,
    "/mentor/comments",
  );
};

export const useAssignMentor = () =>
  useMutation<IMentorAssignmentResponse, DetailsError, IAssignMentorRequest>({
    mutationKey: [assignMentorKey],
    mutationFn: assignMentor,
  });

export const useGetMentorTeams = () =>
  useQuery<IMentorAssignmentListResponse, DetailsError>({
    queryKey: [getMentorTeamsKey],
    queryFn: getMentorTeams,
  });

export const useGetMentorCalls = () =>
  useQuery<IMentorCallListResponse, DetailsError>({
    queryKey: [getMentorCallsKey],
    queryFn: getMentorCalls,
  });

export const useCreateMentorCall = () => {
  const queryClient = useQueryClient();

  return useMutation<IMentorCallCreatedResponse, DetailsError, IScheduleCallRequest>({
    mutationKey: [createMentorCallKey],
    mutationFn: createMentorCall,
    onSuccess: (data, variables) => {
      const createdCall = {
        id: data.callId,
        teamId: variables.teamId,
        startsAt: variables.startsAt,
        endsAt: variables.endsAt,
        link: variables.link,
        notes: variables.notes,
      };

      queryClient.setQueryData<IMentorCallListResponse>(
        [getMentorCallsKey],
        (current) => ({
          calls: [...(current?.calls ?? []), createdCall],
        }),
      );
      queryClient.setQueryData<IMentorCallListResponse>(
        [getTeamMentorCallsKey, variables.teamId],
        (current) =>
          current
            ? {
                calls: [...(current.calls ?? []), createdCall],
              }
            : current,
      );
    },
  });
};

export const useGetTeamMentorCalls = (teamId: number, enabled = true) =>
  useQuery<IMentorCallListResponse, DetailsError>({
    queryKey: [getTeamMentorCallsKey, teamId],
    queryFn: () => getTeamMentorCalls({ teamId }),
    enabled,
  });

export const useGetMentorStageSubmission = (
  stageSubmissionId: number,
  enabled = true,
) =>
  useQuery<IStageSubmissionResponse, DetailsError>({
    queryKey: [getMentorStageSubmissionKey, stageSubmissionId],
    queryFn: () => getMentorStageSubmission({ stageSubmissionId }),
    enabled,
  });

export const useGetStageSubmissionMentorComments = (
  stageSubmissionId: number,
  enabled = true,
) =>
  useQuery<IMentorCommentListResponse, DetailsError>({
    queryKey: [getStageSubmissionMentorCommentsKey, stageSubmissionId],
    queryFn: () => getStageSubmissionMentorComments({ stageSubmissionId }),
    enabled,
  });

export const useCreateMentorComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IMentorCommentCreatedResponse,
    DetailsError,
    IMentorCommentRequest
  >({
    mutationKey: [createMentorCommentKey],
    mutationFn: createMentorComment,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IMentorCommentListResponse>(
        [getStageSubmissionMentorCommentsKey, variables.stageSubmissionId],
        (current) => ({
          comments: [
            ...(current?.comments ?? []),
            {
              id: data.commentId,
              stageSubmissionId: variables.stageSubmissionId,
              text: variables.text,
              createdAt: new Date().toISOString(),
            },
          ],
        }),
      );
    },
  });
};

export * from "../model/mentor.types";
