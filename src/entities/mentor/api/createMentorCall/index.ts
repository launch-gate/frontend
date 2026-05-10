import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getMentorCallsKey } from "../getMentorCalls";
import { getTeamMentorCallsKey } from "../getTeamMentorCalls";
import { IMentorCallListResponse } from "../../model/mentor.types";
import {
  ICreateMentorCallResponse,
  ICreateMentorCallVariables,
} from "./createMentorCall.types";
import {
  createMentorCallRequestSchema,
  createMentorCallResponseSchema,
} from "./createMentorCall.validation";

export const createMentorCallKey = "createMentorCall";

export const createMentorCall = async (
  data: ICreateMentorCallVariables,
): Promise<ICreateMentorCallResponse> => {
  await validateWithSchema(
    data,
    createMentorCallRequestSchema,
    "/mentor/calls",
  );

  return requestWithValidation<ICreateMentorCallResponse>(
    {
      url: "/mentor/calls",
      method: "POST",
      data,
    },
    createMentorCallResponseSchema,
    "/mentor/calls",
  );
};

export const useCreateMentorCall = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateMentorCallResponse,
    DetailsError,
    ICreateMentorCallVariables
  >({
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

export * from "./createMentorCall.types";
export * from "./createMentorCall.validation";
