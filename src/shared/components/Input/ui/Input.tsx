import { InputProps } from "antd";
import { FC } from "react";

import { SInput } from "./input.styles";

export const Input: FC<InputProps> = ({ ...props }) => {
  return <SInput {...props} />;
};
