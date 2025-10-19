import { StepsProps } from "antd";
import { FC } from "react";

import { SSteps } from "./steps.styles";

export const Steps: FC<StepsProps> = ({ ...props }) => {
  return <SSteps {...props} />;
};
