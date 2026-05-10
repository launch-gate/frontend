import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { IGetExpertReviewsResponse } from "./getExpertReviews.types";
import { getExpertReviewsResponseSchema } from "./getExpertReviews.validation";

export const getExpertReviewsKey = "getExpertReviews";

export const getExpertReviews = (): Promise<IGetExpertReviewsResponse> =>
  requestWithValidation<IGetExpertReviewsResponse>(
    {
      url: "/expert/reviews",
      method: "GET",
    },
    getExpertReviewsResponseSchema,
    "/expert/reviews",
  );

export const useGetExpertReviews = () =>
  useQuery<IGetExpertReviewsResponse, DetailsError>({
    queryKey: [getExpertReviewsKey],
    queryFn: getExpertReviews,
  });

export * from "./getExpertReviews.types";
export * from "./getExpertReviews.validation";
