import { VirtuosoProps } from "react-virtuoso";
import { ReactElement, ReactNode } from "react";

export interface InfinityListProps<D, C> extends VirtuosoProps<D, C> {
  fetchNextPage?: () => void;
  isPending: boolean;
  isError: boolean;
  isFetching?: boolean;
  isNotFound?: boolean;
  itemLoadingContent: (key: number) => ReactNode;
  emptyComponent?: ReactElement;
  errorComponent?: ReactElement;
  scrollStateKey?: string;
  itemLoadingSize?: number;
  scrollParent?: HTMLDivElement;
  gap?: number;
}
