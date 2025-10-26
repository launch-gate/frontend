import { BreadcrumbProps } from "antd";
import Link from "next/link";

import { routes, RouteValue } from "@/shared/config";

import { GetBreadcrumbProps } from "../model/breadcrumb.types";

const homePageBreadcrumbItem = {
  title: <Link href={routes.HOME_PAGE}>Главная</Link>,
};
const getSecondLevelBreadcrumb = (title: string) => [
  homePageBreadcrumbItem,
  { title },
];

const exactRoutesMap: Partial<Record<RouteValue, BreadcrumbProps["items"]>> = {
  [routes.CREATE_PAGE]: getSecondLevelBreadcrumb("Организовать конкурс"),
};

export const getBreadcrumbItems = ({
  pathname,
}: GetBreadcrumbProps): BreadcrumbProps["items"] => {
  const exact = exactRoutesMap[pathname as RouteValue];
  if (exact) return exact;
  if (pathname.startsWith("/competition/")) {
    return getSecondLevelBreadcrumb("Участвовать в конкурсе");
  }
  return [];
};
