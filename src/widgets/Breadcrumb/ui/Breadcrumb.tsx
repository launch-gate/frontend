"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { getBreadcrumbItems } from "../lib/getBreadcrumbItems";
import { SBreadcrumb } from "./breadcrumb.styles";

export const Breadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbs = getBreadcrumbItems({ pathname });
  const showBreadcrumbs = breadcrumbs?.length;

  if (!showBreadcrumbs) return null;

  return <SBreadcrumb items={breadcrumbs} />;
};
