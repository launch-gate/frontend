import { FC, PropsWithChildren } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { TanstackClientProvider } from "./QueryClientProvider";
import { StyledComponentsProvider } from "./StyledComponentsProvider";

export const WithProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledComponentsProvider>
      <TanstackClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TanstackClientProvider>
    </StyledComponentsProvider>
  );
};
