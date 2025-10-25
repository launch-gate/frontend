import { useGetCompetitionsList } from "@/entities/competition/api";
import {
  CompetitionCard,
  competitionFilterStore,
} from "@/entities/competition";

export const CompetitionsList = () => {
  const filters = competitionFilterStore().getFilters();
  // const getCompetitionsList = useGetCompetitionsList(filters.find);

  return (
    /*<VirtualizedList
      data={getCompetitionsList.data}
      isError={getCompetitionsList.isError}
      isFetching={getCompetitionsList.isFetching}
      isPending={getCompetitionsList.isPending}
      fetchNextPage={getCompetitionsList.fetchNextPage}
      itemContent={itemContent}
      itemLoadingContent={itemLoadingContent}
      gap={0}
      isNotFound={!!getCompetitionsList.data}
    />*/ <div style={{ display: "grid", gap: 20, paddingBottom: 20 }}>
      <CompetitionCard />
      <CompetitionCard />
      <CompetitionCard />
      <CompetitionCard />
      <CompetitionCard />
      <CompetitionCard />
    </div>
  );
};
