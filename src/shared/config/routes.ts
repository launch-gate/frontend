export const routes = {
  HOME_PAGE: "/",
  AUTH_PAGE: "/auth",
  PROFILE_PAGE: "/profile",
  COMPETITIONS_PAGE: "/contests",
  COMPETITION_PAGE: "/contests/:contestId",
  STAGE_PAGE: "/contests/:contestId/stages/:stageId",

  ORGANIZER_PAGE: "/organizer",
  ORGANIZER_EVALUATIONS_PAGE: "/organizer/evaluations",
  ORGANIZER_CONTEST_PAGE: "/organizer/contests/:contestId",
  ORGANIZER_CONTEST_ANALYTICS_PAGE: "/organizer/contests/:contestId/analytics",
  MENTOR_PAGE: "/mentor",
  TEAM_MENTOR_PAGE: "/teams/:teamId/mentor",
  EXPERT_PAGE: "/expert",
  EXPERT_REVIEW_PAGE: "/expert/reviews/:assignmentId",
};

export const publicRoutes = [
  routes.HOME_PAGE,
  routes.AUTH_PAGE,
  routes.PROFILE_PAGE,
  routes.COMPETITIONS_PAGE,
  routes.COMPETITION_PAGE,
  routes.ORGANIZER_PAGE,
  routes.ORGANIZER_EVALUATIONS_PAGE,
  routes.ORGANIZER_CONTEST_PAGE,
  routes.ORGANIZER_CONTEST_ANALYTICS_PAGE,
  routes.MENTOR_PAGE,
  routes.TEAM_MENTOR_PAGE,
  routes.EXPERT_PAGE,
  routes.EXPERT_REVIEW_PAGE,
];

export type RouteValue = (typeof routes)[keyof typeof routes];
