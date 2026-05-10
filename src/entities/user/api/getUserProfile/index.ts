import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetUserProfileResponse } from "./getUserProfile.types";
import { getUserProfileResponseSchema } from "./getUserProfile.validation";

export const getUserProfileKey = "getUserProfile";

export const getUserProfile = (): Promise<IGetUserProfileResponse> =>
  requestWithValidation<IGetUserProfileResponse>(
    {
      url: "/user/profile",
      method: "GET",
    },
    getUserProfileResponseSchema,
    "/user/profile",
  );

export const useGetUserProfile = (enabled = true) =>
  useQuery<IGetUserProfileResponse, DetailsError>({
    queryKey: [getUserProfileKey],
    queryFn: getUserProfile,
    enabled,
  });

export * from "./getUserProfile.types";
export * from "./getUserProfile.validation";
