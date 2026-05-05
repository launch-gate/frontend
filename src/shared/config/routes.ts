export const routes = {
  HOME_PAGE: "/",
  AUTH_PAGE: "/auth",
  PROFILE_PAGE: "/profile",
  CREATE_PAGE: "/create",
  COMPETITIONS_PAGE: "/contests",
  COMPETITION_PAGE: "/contests/:contestId",
};

export const publicRoutes = [
  routes.HOME_PAGE,
  routes.AUTH_PAGE,
  routes.PROFILE_PAGE,
  routes.CREATE_PAGE,
  routes.COMPETITIONS_PAGE,
  routes.COMPETITION_PAGE,
];

export type RouteValue = (typeof routes)[keyof typeof routes];
