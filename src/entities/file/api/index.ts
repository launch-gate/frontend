import { useMutation, useQuery } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import {
  IDownloadUrlResponse,
  IFileResponse,
  IUploadFileRequest,
} from "../model/file.types";
import { toUploadFileFormData } from "../model/file.converters";
import { downloadUrlSchema, fileSchema } from "../model/file.validation";

export const uploadFileKey = "uploadFile";
export const getFileDownloadUrlKey = "getFileDownloadUrl";

export interface IFileIdVariables {
  fileId: number;
}

export const uploadFile = (data: IUploadFileRequest): Promise<IFileResponse> =>
  requestWithValidation<IFileResponse>(
    {
      url: "/files",
      method: "POST",
      data: toUploadFileFormData(data),
      headers: { "Content-Type": "multipart/form-data" },
    },
    fileSchema,
    "/files",
  );

export const getFileDownloadUrl = ({
  fileId,
}: IFileIdVariables): Promise<IDownloadUrlResponse> =>
  requestWithValidation<IDownloadUrlResponse>(
    {
      url: `/files/${fileId}/download-url`,
      method: "GET",
    },
    downloadUrlSchema,
    "/files/{fileId}/download-url",
  );

export const useUploadFile = () =>
  useMutation<IFileResponse, DetailsError, IUploadFileRequest>({
    mutationKey: [uploadFileKey],
    mutationFn: uploadFile,
  });

export const useGetFileDownloadUrl = (fileId: number, enabled = true) =>
  useQuery<IDownloadUrlResponse, DetailsError>({
    queryKey: [getFileDownloadUrlKey, fileId],
    queryFn: () => getFileDownloadUrl({ fileId }),
    enabled,
  });

export * from "../model/file.types";
export * from "../model/file.converters";
