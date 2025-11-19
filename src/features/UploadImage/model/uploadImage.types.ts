export interface IUpload {
  fileUrl: string;
  deleteFileUrl: string;
}

export interface UploadImageProps {
  upload: IUpload | null;
  setUpload: (upload: IUpload | null) => void;
}
