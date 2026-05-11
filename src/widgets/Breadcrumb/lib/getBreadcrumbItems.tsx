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

const organizerPageItem = {
  title: <Link href={routes.ORGANIZER_PAGE}>Панель организатора</Link>,
};

export const getBreadcrumbItems = ({
  pathname,
  contestTitle,
  stageTitle,
}: GetBreadcrumbProps): BreadcrumbProps["items"] => {
  const exact = exactRoutesMap[pathname as RouteValue];
  if (exact) return exact;

  // /organizer/contests/:contestId/stages/:stageId/fields
  const organizerFieldsMatch = pathname.match(
    /^\/organizer\/contests\/(\d+)\/stages\/(\d+)\/fields/,
  );
  if (organizerFieldsMatch) {
    return [
      homePageBreadcrumbItem,
      organizerPageItem,
      {
        title: (
          <Link href={`/organizer/contests/${organizerFieldsMatch[1]}?tab=stages`}>
            {contestTitle ?? "Конкурс"}
          </Link>
        ),
      },
      { title: stageTitle ?? "Поля этапа" },
    ];
  }

  // /organizer/contests/:contestId
  const organizerContestMatch = pathname.match(/^\/organizer\/contests\/(\d+)/);
  if (organizerContestMatch) {
    return [
      homePageBreadcrumbItem,
      organizerPageItem,
      { title: contestTitle ?? "Конкурс" },
    ];
  }

  // /contests/:contestId/stages/:stageId
  const stageMatch = pathname.match(/^\/contests\/(\d+)\/stages\/\d+/);
  if (stageMatch) {
    return [
      homePageBreadcrumbItem,
      { title: <Link href={routes.COMPETITIONS_PAGE}>Конкурсы</Link> },
      {
        title: (
          <Link href={`/contests/${stageMatch[1]}`}>
            {contestTitle ?? "Конкурс"}
          </Link>
        ),
      },
      { title: stageTitle ?? "Этап" },
    ];
  }

  if (
    pathname.startsWith("/contests/") ||
    pathname.startsWith("/competition/")
  ) {
    return [
      homePageBreadcrumbItem,
      { title: <Link href={routes.COMPETITIONS_PAGE}>Конкурсы</Link> },
      { title: contestTitle ?? "Участвовать в конкурсе" },
    ];
  }

  return [];
};
