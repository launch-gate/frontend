import { ButtonProps as AntdButtonProps } from "antd";

export type ButtonColorType =
  | "black"
  | "violet"
  | "gray"
  | "white"
  | "transparentWhite";

export interface ButtonProps extends Omit<AntdButtonProps, "color"> {
  color?: ButtonColorType;
}

export interface SButtonProps extends Omit<ButtonProps, "color"> {
  $color: ButtonColorType;
}
