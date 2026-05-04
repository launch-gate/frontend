export interface IUploadFileRequest {
  file: File | Blob;
  filename?: string;
}

export interface IFileResponse {
  id?: number;
  originalFilename?: string;
  contentType?: string;
  sizeBytes?: number;
}

export interface IDownloadUrlResponse {
  url?: string;
}
