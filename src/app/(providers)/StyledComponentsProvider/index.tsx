"use client";

import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { themeLight } from "../../(theme)/styledComponentsTheme";

export const StyledComponentsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  return <ThemeProvider theme={themeLight}>{children}</ThemeProvider>;
};
