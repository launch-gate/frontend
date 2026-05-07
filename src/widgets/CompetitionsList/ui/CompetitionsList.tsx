import { useMemo } from "react";

import { IContestInfoResponse, useGetContests } from "@/entities/contest";
import {
  CompetitionCard,
  competitionFilterStore,
} from "@/entities/competition";
import { InfinityListProps, VirtualizedList } from "@/shared/components";

const DURATION_MS: Record<string, number> = {
  week: 7 * 86_400_000,
  "2weeks": 14 * 86_400_000,
  month: 30 * 86_400_000,
};

export const CompetitionsList = () => {
  const { search, statuses, duration, durationRange } = competitionFilterStore(
    (state) => state.competitionState,
  );
  const contests = useGetContests();

  const filteredContests = useMemo(() => {
    let list = contests.data?.contests ?? [];

    // Поиск по тексту
    const normalizedSearch = search.trim().toLowerCase();
    if (normalizedSearch) {
      list = list.filter((contest) =>
        [contest.title, contest.description, contest.contacts]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedSearch)),
      );
    }

    // Фильтр по статусу
    if (statuses.length > 0) {
      list = list.filter(
        (contest) => contest.status && statuses.includes(contest.status),
      );
    }

    // Фильтр по предустановленной длительности
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

    // Фильтр по произвольному периоду
    if (duration === "custom" && durationRange[0] && durationRange[1]) {
      list = list.filter((contest) => {
        if (!contest.startsAt) return true;
        const start = new Date(contest.startsAt).getTime();
        return start >= durationRange[0]! && start <= durationRange[1]!;
      });
    }

    return list;
  }, [contests.data?.contests, search, statuses, duration, durationRange]);

  const itemContent: InfinityListProps<
    IContestInfoResponse,
    unknown
  >["itemContent"] = (_, props) => <CompetitionCard {...props} />;

  const itemLoadingContent: InfinityListProps<
    IContestInfoResponse,
    unknown
  >["itemLoadingContent"] = (key) => <div key={key}>Загрузка...</div>;

  return (
    <VirtualizedList
      data={filteredContests}
      isError={contests.isError}
      isFetching={contests.isFetching}
      isPending={contests.isPending}
      itemContent={itemContent}
      itemLoadingContent={itemLoadingContent}
      emptyComponent={<div>Конкурсы не найдены.</div>}
      errorComponent={<div>Не удалось загрузить список конкурсов.</div>}
    />
  );
};
