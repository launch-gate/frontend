"use client";

import { FC, PropsWithChildren } from "react";

import { Header } from "@/widgets/Header";

import { SPageContent } from "./publicLayout.styles";

export const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <SPageContent>{children}</SPageContent>
    </>
  );
};
