import { MetadataRoute } from "next";

import { fetchPublicApi } from "@/shared/api/publicApi";
import { getAbsoluteUrl } from "@/shared/config/seo";

export const revalidate = 3600;

type ContestInfo = {
  id?: number;
  status?: string;
};

type ContestListInfo = {
  contests?: ContestInfo[];
};

type PublicContest = ContestInfo & {
  id: number;
};

type StageInfo = {
  id?: number;
};

type StageListInfo = {
  stages?: StageInfo[];
};

type PublicStage = StageInfo & {
  id: number;
};

const hasPublicContestId = (contest: ContestInfo): contest is PublicContest =>
  Boolean(contest.id) && contest.status !== "DRAFT";

const hasStageId = (stage: StageInfo): stage is PublicStage =>
  Boolean(stage.id);

const fetchPublicContests = async () => {
  const data = await fetchPublicApi<ContestListInfo>("/contests");

  return data?.contests?.filter(hasPublicContestId) ?? [];
};

const fetchPublicContestStages = async (contestId: number) => {
  const data = await fetchPublicApi<StageListInfo>(
    `/contests/${contestId}/stages`,
  );

  return data?.stages?.filter(hasStageId) ?? [];
};

const sitemapEntry = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap[number] => ({
  url: getAbsoluteUrl(path),
  lastModified: new Date(),
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = [
    sitemapEntry("/home-page", 1, "weekly"),
    sitemapEntry("/contests", 0.9, "daily"),
  ];

  const contests = await fetchPublicContests();
  const contestEntries = contests.map((contest) =>
    sitemapEntry(`/contests/${contest.id}`, 0.8, "daily"),
  );

  const contestStageEntries = await Promise.all(
    contests.map(async (contest) => {
      const stages = await fetchPublicContestStages(contest.id);

      return stages.map((stage) =>
        sitemapEntry(
          `/contests/${contest.id}/stages/${stage.id}`,
          0.6,
          "weekly",
        ),
      );
    }),
  );

  return [...staticEntries, ...contestEntries, ...contestStageEntries.flat()];
}
