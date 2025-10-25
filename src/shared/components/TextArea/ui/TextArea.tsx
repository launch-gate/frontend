import React, { FC } from "react";
import { Form } from "antd";

import { STextArea } from "./textArea.styles";
import { TextAreaPropss } from "../model/textArea.types";

export const TextArea: FC<TextAreaPropss> = ({
  size = "middle",
  validateStatus,
  help,
  ...props
}) => {
  return (
    <Form.Item validateStatus={validateStatus} help={help}>
      <STextArea size={size} {...props} />
    </Form.Item>
  );
};
