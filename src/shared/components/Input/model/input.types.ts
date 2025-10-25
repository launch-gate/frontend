import { FormItemProps, InputProps as AntdInputProps } from "antd";

export type InputProps = AntdInputProps &
  Pick<FormItemProps, "validateStatus" | "help">;
