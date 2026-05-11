import { RouteValue } from "@/shared/config";

export interface GetBreadcrumbProps {
  pathname: RouteValue | string;
  contestTitle?: string;
  stageTitle?: string;
}
