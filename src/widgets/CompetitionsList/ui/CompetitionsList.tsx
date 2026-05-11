import { useMemo } from "react";

import { IContestInfoResponse, useGetContests } from "@/entities/contest";
import {
  CompetitionCard,
  competitionFilterStore,
} from "@/entities/competition";
import { InfinityListProps, VirtualizedList } from "@/shared/components";

import {
  SSkeletonCard,
  SSkeletonLeft,
  SSkeletonLine,
  SSkeletonRight,
  SStateBox,
  SStateText,
  SStateTitle,
} from "./competitionsList.styles";

const DURATION_MS: Record<string, number> = {
  week: 7 * 86_400_000,
  "2weeks": 14 * 86_400_000,
  month: 30 * 86_400_000,
};

const SkeletonCard = ({ index }: { index: number }) => (
  <SSkeletonCard>
    <SSkeletonLeft />
    <SSkeletonRight>
      <SSkeletonLine $width="60%" $height="14px" />
      <SSkeletonLine $width="85%" $height="22px" />
      <SSkeletonLine $width="40%" $height="14px" />
      <SSkeletonLine $width="100%" $height="14px" />
      <SSkeletonLine $width="90%" $height="14px" />
    </SSkeletonRight>
  </SSkeletonCard>
);

export const CompetitionsList = () => {
  const { search, statuses, participationMode, duration, durationRange } =
    competitionFilterStore((state) => state.competitionState);
  const contests = useGetContests();

  const filteredContests = useMemo(() => {
    let list = (contests.data?.contests ?? []).filter(
      (contest) => contest.status !== "DRAFT",
    );

    const normalizedSearch = search.trim().toLowerCase();
    if (normalizedSearch) {
      list = list.filter((contest) =>
        [contest.title, contest.description, contest.contacts]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedSearch)),
      );
    }

    if (participationMode) {
      list = list.filter(
        (contest) => contest.participationMode === participationMode,
      );
    }

    if (statuses.length > 0) {
      list = list.filter(
        (contest) => contest.status && statuses.includes(contest.status),
      );
    }

    if (duration && duration !== "custom") {
      const maxMs = DURATION_MS[duration];
      list = list.filter((contest) => {
        if (!contest.startsAt || !contest.endsAt) return true;
        const diff =
          new Date(contest.endsAt).getTime() -
          new Date(contest.startsAt).getTime();
        return diff <= maxMs;
      });
    }

    if (duration === "custom" && durationRange[0] && durationRange[1]) {
      list = list.filter((contest) => {
        if (!contest.startsAt) return true;
        const start = new Date(contest.startsAt).getTime();
        return start >= durationRange[0]! && start <= durationRange[1]!;
      });
    }

    return list;
  }, [contests.data?.contests, search, statuses, participationMode, duration, durationRange]);

  const itemContent: InfinityListProps<
    IContestInfoResponse,
    unknown
  >["itemContent"] = (_, props) => <CompetitionCard {...props} />;

  const itemLoadingContent: InfinityListProps<
    IContestInfoResponse,
    unknown
  >["itemLoadingContent"] = (key) => <SkeletonCard key={key} index={key} />;

  return (
    <VirtualizedList
      data={filteredContests}
      isError={contests.isError}
      isFetching={contests.isFetching}
      isPending={contests.isPending}
      itemContent={itemContent}
      itemLoadingContent={itemLoadingContent}
      itemLoadingSize={4}
      emptyComponent={
        <SStateBox>
          <SStateTitle>Конкурсы не найдены</SStateTitle>
          <SStateText>
            Попробуйте изменить параметры поиска или сбросить фильтры
          </SStateText>
        </SStateBox>
      }
      errorComponent={
        <SStateBox>
          <SStateTitle>Не удалось загрузить конкурсы</SStateTitle>
          <SStateText>
            Проверьте подключение к интернету и попробуйте снова
          </SStateText>
        </SStateBox>
      }
    />
  );
};
