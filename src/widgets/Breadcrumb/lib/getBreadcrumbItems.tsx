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
  [routes.COMPETITIONS_PAGE]: getSecondLevelBreadcrumb("Конкурсы"),
};

export const getBreadcrumbItems = ({
  pathname,
}: GetBreadcrumbProps): BreadcrumbProps["items"] => {
  const exact = exactRoutesMap[pathname as RouteValue];
  if (exact) return exact;

  const stageMatch = pathname.match(/^\/contests\/(\d+)\/stages\/\d+/);
  if (stageMatch) {
    return [
      homePageBreadcrumbItem,
      { title: <Link href={routes.COMPETITIONS_PAGE}>Конкурсы</Link> },
      { title: <Link href={`/contests/${stageMatch[1]}`}>Конкурс</Link> },
      { title: "Этап" },
    ];
  }

  if (
    pathname.startsWith("/contests/") ||
    pathname.startsWith("/competition/")
  ) {
    return [
      homePageBreadcrumbItem,
      { title: <Link href={routes.COMPETITIONS_PAGE}>Конкурсы</Link> },
      { title: "Участвовать в конкурсе" },
    ];
  }

  return [];
};
