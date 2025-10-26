import {
  useGetCompetitionsList,
  IGetCreateCompetition,
} from "@/entities/competition/api";
import {
  CompetitionCard,
  competitionFilterStore,
} from "@/entities/competition";
import { InfinityListProps, VirtualizedList } from "@/shared/components";

export const CompetitionsList = () => {
  const filters = competitionFilterStore().getFilters();
  const getCompetitionsList = useGetCompetitionsList(filters.search);

  const itemContent: InfinityListProps<
    IGetCreateCompetition,
    unknown
  >["itemContent"] = (_, props) => <CompetitionCard {...props} />;
  const itemLoadingContent: InfinityListProps<
    IGetCreateCompetition,
    unknown
  >["itemLoadingContent"] = (key) => <div>Loading...</div>;
  return (
    <VirtualizedList
      data={getCompetitionsList.data || []}
      isError={getCompetitionsList.isError}
      isFetching={getCompetitionsList.isFetching}
      isPending={getCompetitionsList.isPending}
      fetchNextPage={getCompetitionsList.fetchNextPage}
      itemContent={itemContent}
      itemLoadingContent={itemLoadingContent}
      isNotFound={!!getCompetitionsList.data}
    />
  );
};
