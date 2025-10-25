import React, { FC } from "react";
import { CheckboxProps } from "antd";

import { SCheckbox } from "./checkbox.styles";

export const Checkbox: FC<CheckboxProps> = ({ ...props }) => {
  return <SCheckbox {...props} />;
};
