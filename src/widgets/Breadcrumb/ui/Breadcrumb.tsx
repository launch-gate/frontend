"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { useBreadcrumbStore } from "../model/breadcrumb.store";
import { getBreadcrumbItems } from "../lib/getBreadcrumbItems";
import { SBreadcrumb } from "./breadcrumb.styles";

export const Breadcrumb = () => {
  const pathname = usePathname();
  const { contestTitle, stageTitle } = useBreadcrumbStore();

  const breadcrumbs = getBreadcrumbItems({ pathname, contestTitle, stageTitle });
  const showBreadcrumbs = breadcrumbs?.length;

  if (!showBreadcrumbs) return null;

  return <SBreadcrumb items={breadcrumbs} />;
};
