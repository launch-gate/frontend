export const routes = {
  HOME_PAGE: "/",
  CREATE_PAGE: "/create",
  COMPETITIONS_PAGE: "/competition",
  COMPETITION_PAGE: "/competitions/:id",
};

export const publicRoutes = [
  routes.HOME_PAGE,
  routes.CREATE_PAGE,
  routes.COMPETITIONS_PAGE,
  routes.COMPETITION_PAGE,
];

export type RouteValue = (typeof routes)[keyof typeof routes];
