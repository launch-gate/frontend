import { Form } from "antd";
import { FC } from "react";

import { SInput } from "./input.styles";
import { InputProps } from "../model/input.types";

export const Input: FC<InputProps> = ({ validateStatus, help, ...props }) => {
  return (
    <Form.Item validateStatus={validateStatus} help={help}>
      <SInput {...props} />
    </Form.Item>
  );
};
