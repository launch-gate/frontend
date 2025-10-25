import React, { FC } from "react";
import { TextAreaProps } from "antd/es/input";

import { STextArea } from "./textArea.styles";

export const TextArea: FC<TextAreaProps> = ({
  size = "middle",
  autoCorrect = false,
  ...props
}) => {
  return <STextArea size={size} {...props} />;
};
