"use client";

import { FC, PropsWithChildren } from "react";

import { Header } from "@/widgets/Header";
import { Breadcrumb } from "@/widgets/Breadcrumb";

import { SPageContent } from "./publicLayout.styles";

export const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <SPageContent>{children}</SPageContent>
    </>
  );
};
