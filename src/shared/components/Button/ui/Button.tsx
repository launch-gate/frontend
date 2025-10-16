import { FC } from "react";

import { ButtonProps } from "../model/button.types";
import { SButton } from "./button.styles";

export const Button: FC<ButtonProps> = ({ color = "black", ...props }) => {
  return <SButton $color={color} {...props} />;
};
