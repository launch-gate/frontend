import { IUploadFileRequest } from "./file.types";

export const toUploadFileFormData = ({
  file,
  filename,
}: IUploadFileRequest): FormData => {
  const formData = new FormData();
  formData.append("file", file, filename);

  return formData;
};
