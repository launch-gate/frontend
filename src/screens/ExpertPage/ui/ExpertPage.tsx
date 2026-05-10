"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ReviewStatus, useGetExpertReviews } from "@/entities/evaluation";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";
import {
  SActions,
  SItemMeta,
  SItemTitle,
  SList,
  SListItem,
  SPanelText,
  SPanelTitle,
  SSelect,
  SStatus,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

type ReviewFilter = ReviewStatus | "ALL";

export const ExpertPage = () => {
  const reviews = useGetExpertReviews();
  const [filter, setFilter] = useState<ReviewFilter>("ALL");

  const assignments = useMemo(() => {
    const list = reviews.data?.assignments ?? [];
    if (filter === "ALL") return list;
    return list.filter((assignment) => assignment.status === filter);
  }, [filter, reviews.data?.assignments]);

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Кабинет эксперта</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Назначенные проверки, фильтр по статусу и переход к конкретной сдаче
          для draft-оценки и публикации.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Фильтр</SPanelTitle>
          <SSelect
            value={filter}
            onChange={(event) => setFilter(event.target.value as ReviewFilter)}
          >
            <option value="ALL">Все</option>
            <option value="NEW">Новые</option>
            <option value="DRAFT">Draft</option>
            <option value="COMPLETED">Завершённые</option>
          </SSelect>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Назначения</SPanelTitle>
          <SList>
            {assignments.map((assignment) => (
              <SListItem key={assignment.id}>
                <div>
                  <SItemTitle>Проверка #{assignment.id ?? "-"}</SItemTitle>
                  <SItemMeta>
                    Submission #{assignment.submissionId ?? "-"} · Stage #
                    {assignment.stageId ?? "-"} · Expert #
                    {assignment.expertId ?? "-"}
                  </SItemMeta>
                </div>
                <SActions>
                  <SStatus>{assignment.status ?? "NEW"}</SStatus>
                  {assignment.id && (
                    <Link href={`/expert/reviews/${assignment.id}`}>
                      <Button>Открыть</Button>
                    </Link>
                  )}
                </SActions>
              </SListItem>
            ))}
            {!assignments.length && !reviews.isPending && (
              <SPanelText>Назначенных проверок нет.</SPanelText>
            )}
          </SList>
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
