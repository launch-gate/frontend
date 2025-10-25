import React, { FC } from "react";

import { SSwitch, SSwitchContainer, SText } from "./switch.styles";
import { ISwitch } from "../model/switch.types";

export const Switch: FC<ISwitch> = ({ children, ...props }) => {
  return (
    <SSwitchContainer>
      <SSwitch {...props} />
      <SText>{children}</SText>
    </SSwitchContainer>
  );
};
