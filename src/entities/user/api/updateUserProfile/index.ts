import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import { getUserProfileKey } from "../getUserProfile";
import {
  IUpdateUserProfileResponse,
  IUpdateUserProfileVariables,
} from "./updateUserProfile.types";
import {
  updateUserProfileRequestSchema,
  updateUserProfileResponseSchema,
} from "./updateUserProfile.validation";

export const updateUserProfileKey = "updateUserProfile";

export const updateUserProfile = async (
  data: IUpdateUserProfileVariables,
): Promise<IUpdateUserProfileResponse> => {
  await validateWithSchema(
    data,
    updateUserProfileRequestSchema,
    "/user/profile",
  );

  return requestWithValidation<IUpdateUserProfileResponse>(
    {
      url: "/user/profile",
      method: "PATCH",
      data,
    },
    updateUserProfileResponseSchema,
    "/user/profile",
  );
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateUserProfileResponse,
    DetailsError,
    IUpdateUserProfileVariables
  >({
    mutationKey: [updateUserProfileKey],
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.setQueryData([getUserProfileKey], data);
    },
  });
};

export * from "./updateUserProfile.types";
export * from "./updateUserProfile.validation";
