import { useMemo } from "react";

import { IContestInfoResponse, useGetContests } from "@/entities/contest";
import {
  CompetitionCard,
  competitionFilterStore,
} from "@/entities/competition";
import { InfinityListProps, VirtualizedList } from "@/shared/components";

export const CompetitionsList = () => {
  const search = competitionFilterStore(
    (state) => state.competitionState.search,
  );
  const contests = useGetContests();

  const filteredContests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const list = contests.data?.contests ?? [];

    if (!normalizedSearch) return list;

    return list.filter((contest) =>
      [contest.title, contest.description, contest.contacts]
        .filter(Boolean)
        .some(
          (value) => value?.toLowerCase().includes(normalizedSearch) ?? false,
        ),
    );
  }, [contests.data?.contests, search]);

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
