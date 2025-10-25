import { FormItemProps } from "antd";
import { TextAreaProps as AntdTextAreaProps } from "antd/es/input";

export type TextAreaPropss = AntdTextAreaProps &
  Pick<FormItemProps, "validateStatus" | "help">;
