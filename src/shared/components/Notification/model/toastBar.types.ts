import { ArgsProps } from "antd/es/notification/interface";

interface ToastBarButtonProps {
  buttonText: string;
  onClick: () => void;
}

export interface IToastBarItem extends ArgsProps {
  message: string;
  description?: string;
  button?: ToastBarButtonProps;
}

export type IToastBarContext = { notify: (args: IToastBarItem) => void };
