import { SegmentedProps } from "antd";
import { FC } from "react";

import { SSegmented } from "./segmented.styles";

export const Segmented: FC<SegmentedProps> = ({ ...props }) => {
  return <SSegmented {...props} />;
};
