import { useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IFileIdVariables,
  IGetFileDownloadUrlResponse,
} from "./getFileDownloadUrl.types";
import { getFileDownloadUrlResponseSchema } from "./getFileDownloadUrl.validation";

export const getFileDownloadUrlKey = "getFileDownloadUrl";

export const getFileDownloadUrl = ({
  fileId,
}: IFileIdVariables): Promise<IGetFileDownloadUrlResponse> =>
  requestWithValidation<IGetFileDownloadUrlResponse>(
    {
      url: `/files/${fileId}/download-url`,
      method: "GET",
    },
    getFileDownloadUrlResponseSchema,
    "/files/{fileId}/download-url",
  );

export const useGetFileDownloadUrl = (fileId: number, enabled = true) =>
  useQuery<IGetFileDownloadUrlResponse, DetailsError>({
    queryKey: [getFileDownloadUrlKey, fileId],
    queryFn: () => getFileDownloadUrl({ fileId }),
    enabled,
  });

export * from "./getFileDownloadUrl.types";
export * from "./getFileDownloadUrl.validation";
