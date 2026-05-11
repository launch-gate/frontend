import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetOrganizerFieldFormatsResponse } from "./getOrganizerFieldFormats.types";
import { getOrganizerFieldFormatsResponseSchema } from "./getOrganizerFieldFormats.validation";

export const getOrganizerFieldFormatsKey = "getOrganizerFieldFormats";

export const getOrganizerFieldFormats =
  (): Promise<IGetOrganizerFieldFormatsResponse> =>
    requestWithValidation<IGetOrganizerFieldFormatsResponse>(
      {
        url: "/organizer/field-formats",
        method: "GET",
      },
      getOrganizerFieldFormatsResponseSchema,
      "/organizer/field-formats",
    );

export const useGetOrganizerFieldFormats = () =>
  useQuery<IGetOrganizerFieldFormatsResponse, DetailsError>({
    queryKey: [getOrganizerFieldFormatsKey],
    queryFn: getOrganizerFieldFormats,
  });

export * from "./getOrganizerFieldFormats.types";
export * from "./getOrganizerFieldFormats.validation";
