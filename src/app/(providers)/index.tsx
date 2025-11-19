"use client";

import { FC, PropsWithChildren } from "react";

import { ToastBarProvider } from "@/shared/components";

import { ThemeProvider } from "./ThemeProvider";
import { TanstackClientProvider } from "./QueryClientProvider";
import { StyledComponentsProvider } from "./StyledComponentsProvider";

export const WithProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledComponentsProvider>
      <TanstackClientProvider>
        <ToastBarProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ToastBarProvider>
      </TanstackClientProvider>
    </StyledComponentsProvider>
  );
};
