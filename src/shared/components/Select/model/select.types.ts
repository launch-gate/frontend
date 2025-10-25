import { FormItemProps, SelectProps as AntdSelectProps } from "antd";

export type SelectProps = AntdSelectProps &
  Pick<FormItemProps, "validateStatus" | "help">;
