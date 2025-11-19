import { UploadProps } from "antd";
import { FC } from "react";

import { SUpload } from "./upload.styles";

export const Upload: FC<UploadProps> = ({ ...props }) => {
  return <SUpload {...props} />;
};
