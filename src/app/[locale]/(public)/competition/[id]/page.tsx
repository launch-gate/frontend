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
  params: Promise<{ id: string }>;
};

type ContestSeoInfo = {
  title?: string;
  description?: string;
};

const fetchContestSeo = (contestId: string) =>
  fetchPublicApi<ContestSeoInfo>(`/contests/${contestId}`);

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const pageSeo = await getLocalizedPageSeo("seo.pages.legacyContest", {
    index: false,
    follow: true,
  });
  const contest = await fetchContestSeo(id);
  const title = cleanSeoText(contest?.title);
  const description = truncateSeoText(
    cleanSeoText(contest?.description, pageSeo.description),
  );

  return createPageMetadata({
    ...pageSeo,
    path: `/competition/${id}`,
    canonicalPath: `/contests/${id}`,
    title: title ? `${title} | ${BRAND_NAME}` : pageSeo.title,
    description,
  });
}

export default async function Competition({ params }: PageProps) {
  const { id } = await params;
  const contestState = await prefetchContestPublicPage(Number(id));

  return (
    <HydrationBoundary state={contestState}>
      <ContestPublicPage />
    </HydrationBoundary>
  );
}
