import { useMutation } from "@tanstack/react-query";

import { DetailsError, requestWithValidation } from "@/shared/api";

import { toUploadFileFormData } from "../../model/file.converters";
import { IUploadFileResponse, IUploadFileVariables } from "./uploadFile.types";
import { uploadFileResponseSchema } from "./uploadFile.validation";

export const uploadFileKey = "uploadFile";

export const uploadFile = (
  data: IUploadFileVariables,
): Promise<IUploadFileResponse> =>
  requestWithValidation<IUploadFileResponse>(
    {
      url: "/files",
      method: "POST",
      data: toUploadFileFormData(data),
      headers: { "Content-Type": "multipart/form-data" },
    },
    uploadFileResponseSchema,
    "/files",
  );

export const useUploadFile = () =>
  useMutation<IUploadFileResponse, DetailsError, IUploadFileVariables>({
    mutationKey: [uploadFileKey],
    mutationFn: uploadFile,
  });

export * from "./uploadFile.types";
export * from "./uploadFile.validation";
