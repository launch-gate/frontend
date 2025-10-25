import React, { FC } from "react";
import { Form } from "antd";

import { SSelect } from "./select.styles";
import { SelectProps } from "../model/select.types";

export const Select: FC<SelectProps> = ({ validateStatus, help, ...props }) => {
  return (
    <Form.Item validateStatus={validateStatus} help={help}>
      <SSelect {...props} />
    </Form.Item>
  );
};
