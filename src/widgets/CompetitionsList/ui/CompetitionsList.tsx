import { useGetCompetitionsList } from "@/entities/competition/api";
import { competitionFilterStore } from "@/entities/competition";
import { VirtualizedList } from "@/shared/components";

export const CompetitionsList = () => {
  const filters = competitionFilterStore().getFilters();
  const getCompetitionsList = useGetCompetitionsList(filters.find);

  return (
    <VirtualizedList
      data={getCompetitionsList.data}
      isError={getCompetitionsList.isError}
      isFetching={getCompetitionsList.isFetching}
      isPending={getCompetitionsList.isPending}
      fetchNextPage={getCompetitionsList.fetchNextPage}
      itemContent={itemContent}
      itemLoadingContent={itemLoadingContent}
      gap={0}
      isNotFound={!!getCompetitionsList.data}
    />
  );
};
