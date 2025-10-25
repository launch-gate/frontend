import React, { FC } from "react";
import { SelectProps } from "antd";

import { SSelect } from "./select.styles";

export const Select: FC<SelectProps> = ({ ...props }) => {
  return <SSelect {...props} />;
};
