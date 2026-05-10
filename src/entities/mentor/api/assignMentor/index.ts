import { useMutation } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import {
  IAssignMentorResponse,
  IAssignMentorVariables,
} from "./assignMentor.types";
import {
  assignMentorRequestValidationSchema,
  assignMentorResponseSchema,
} from "./assignMentor.validation";

export const assignMentorKey = "assignMentor";

export const assignMentor = async (
  data: IAssignMentorVariables,
): Promise<IAssignMentorResponse> => {
  await validateWithSchema(
    data,
    assignMentorRequestValidationSchema,
    "/organizer/mentors/assignments",
  );

  return requestWithValidation<IAssignMentorResponse>(
    {
      url: "/organizer/mentors/assignments",
      method: "POST",
      data,
    },
    assignMentorResponseSchema,
    "/organizer/mentors/assignments",
  );
};

export const useAssignMentor = () =>
  useMutation<IAssignMentorResponse, DetailsError, IAssignMentorVariables>({
    mutationKey: [assignMentorKey],
    mutationFn: assignMentor,
  });

export * from "./assignMentor.types";
export * from "./assignMentor.validation";
