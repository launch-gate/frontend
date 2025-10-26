import React, { FC } from "react";
import { TabsProps } from "antd";

import { STabs } from "./tabs.styles";

export const Tabs: FC<TabsProps> = ({ ...props }) => {
  return <STabs {...props} />;
};
