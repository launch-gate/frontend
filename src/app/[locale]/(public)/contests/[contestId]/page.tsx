import { HydrationBoundary } from "@tanstack/react-query";

import { ContestPublicPage } from "@/screens/ContestPublicPage";
import { prefetchContestPublicPage } from "@/screens/ContestPublicPage/lib/prefetchContestPublicPage";
import { fetchPublicApi } from "@/shared/api/publicApi";
import {
  BRAND_NAME,
  cleanSeoText,
  createPageMetadata,
  getLocalizedPageSeo,
  truncateSeoText,
} from "@/shared/config/seo";

type PageProps = {
  params: Promise<{ contestId: string }>;
};

type ContestSeoInfo = {
  title?: string;
  description?: string;
};

const fetchContestSeo = (contestId: string) =>
  fetchPublicApi<ContestSeoInfo>(`/contests/${contestId}`);

export async function generateMetadata({ params }: PageProps) {
  const { contestId } = await params;
  const pageSeo = await getLocalizedPageSeo("seo.pages.contest", {
    index: true,
    follow: true,
  });
  const contest = await fetchContestSeo(contestId);
  const title = cleanSeoText(contest?.title);
  const description = truncateSeoText(
    cleanSeoText(contest?.description, pageSeo.description),
  );

  return createPageMetadata({
    ...pageSeo,
    path: `/contests/${contestId}`,
    title: title ? `${title} | ${BRAND_NAME}` : pageSeo.title,
    description,
  });
}

export default async function ContestPublic({ params }: PageProps) {
  const { contestId } = await params;
  const contestState = await prefetchContestPublicPage(Number(contestId));

  return (
    <HydrationBoundary state={contestState}>
      <ContestPublicPage />
    </HydrationBoundary>
  );
}
