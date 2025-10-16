import { FC, PropsWithChildren } from "react";

import { ThemeProvider } from "@/app/(providers)/ThemeProvider";

import { StyledComponentsProvider } from "./StyledComponentsProvider";

export const WithProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledComponentsProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StyledComponentsProvider>
  );
};
