"use client";

import React, { forwardRef, useRef } from "react";
import { Virtuoso, VirtuosoHandle, VirtuosoProps } from "react-virtuoso";

import { InfinityListProps } from "../model/virtualizedList.types";
import { SWrapper } from "./virtualizedList.styles";

const createComponents = <D, C>(
  gap: number,
): VirtuosoProps<D, C>["components"] => ({
  // eslint-disable-next-line react/display-name
  List: forwardRef(({ style, children }, ref) => (
    <div style={{ display: "grid", gridGap: gap, ...style }} ref={ref}>
      {children}
    </div>
  )),
});

/**
 *  @param data Массив для списка
 *  @param itemContent ReactNode элемента списка
 *  @param itemLoadingContent ReactNode скелетон элемента списка
 *  @param fetchNextPage Callback при прокрутке в конце списка
 *  @param isPending Первичная загрузка данных
 *  @param isFetching Дозагрузка данных
 *  @param endReached Функция вызова callback-функции fetchNextPage (по умолчанию вызывается при data >= 30)
 *  @param isNotFound Данные не найдены
 *  @param titleNotFound Заголовок компонента isNotFound
 *  @param isError Данные получены с ошибкой
 *  @param virtuosoProps
 * */

export const VirtualizedList = <D, C>({
  data,
  itemContent,
  fetchNextPage,
  isPending,
  isFetching,
  isNotFound,
  endReached,
  isError,
  itemLoadingContent,
  itemLoadingSize = 5,
  scrollStateKey: SCROLL_STATE_KEY = "VirtualizedListKey",
  scrollParent,
  emptyComponent,
  errorComponent,
  gap = 16,
  ...virtuosoProps
}: InfinityListProps<D, C>) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const isLoading = isPending || isFetching;
  const isEmptyData = !isLoading && !isError && !data?.length;
  const components = createComponents<D, C>(gap);

  const defaultEndReached = () => {
    if (typeof fetchNextPage !== "undefined") fetchNextPage();
  };
  const virtuosoEndReached =
    typeof endReached === "undefined" ? defaultEndReached : endReached;
  const customScrollParent = scrollParent || undefined;

  return (
    <SWrapper>
      {!!data?.length && (
        <Virtuoso<D, C>
          useWindowScroll={!scrollParent}
          customScrollParent={customScrollParent}
          style={{ height: "100vh" }}
          ref={virtuosoRef}
          data={data}
          itemContent={itemContent}
          components={components}
          endReached={virtuosoEndReached}
          overscan={{ main: 1000, reverse: 1000 }}
          {...virtuosoProps}
        />
      )}

      {isLoading &&
        Array.from({ length: itemLoadingSize }, (_, key) =>
          itemLoadingContent(key),
        )}

      {isEmptyData && emptyComponent}

      {isError && errorComponent}
    </SWrapper>
  );
};
