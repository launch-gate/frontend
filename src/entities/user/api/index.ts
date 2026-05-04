import { useMutation, useQuery } from "@tanstack/react-query";

import {
  DetailsError,
  requestWithValidation,
  validateWithSchema,
} from "@/shared/api";

import {
  IUpdateProfileRequest,
  IUserProfileResponse,
} from "../model/user.types";
import {
  updateProfileSchema,
  userProfileSchema,
} from "../model/user.validation";

export const getUserProfileKey = "getUserProfile";
export const updateUserProfileKey = "updateUserProfile";

export const getUserProfile = (): Promise<IUserProfileResponse> =>
  requestWithValidation<IUserProfileResponse>(
    {
      url: "/user/profile",
      method: "GET",
    },
    userProfileSchema,
    "/user/profile",
  );

export const updateUserProfile = async (
  data: IUpdateProfileRequest,
): Promise<IUserProfileResponse> => {
  await validateWithSchema(data, updateProfileSchema, "/user/profile");

  return requestWithValidation<IUserProfileResponse>(
    {
      url: "/user/profile",
      method: "PATCH",
      data,
    },
    userProfileSchema,
    "/user/profile",
  );
};

export const useGetUserProfile = () =>
  useQuery<IUserProfileResponse, DetailsError>({
    queryKey: [getUserProfileKey],
    queryFn: getUserProfile,
  });

export const useUpdateUserProfile = () =>
  useMutation<IUserProfileResponse, DetailsError, IUpdateProfileRequest>({
    mutationKey: [updateUserProfileKey],
    mutationFn: updateUserProfile,
  });

export * from "../model/user.types";
