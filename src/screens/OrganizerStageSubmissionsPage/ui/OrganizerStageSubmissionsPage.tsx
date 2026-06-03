"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useGetContest } from "@/entities/contest";
import { useGetOrganizerStageSubmissions } from "@/entities/project";
import { useBreadcrumbStore } from "@/widgets/Breadcrumb";
import { Button } from "@/shared/components";
import {
  SActions,
  SItemMeta,
  SItemTitle,
  SList,
  SListItem,
  SPanelHeader,
  SPanelText,
  SPanelTitle,
  SPanelWide,
  SStatus,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

const SUBMISSION_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Черновик",
  SUBMITTED: "Отправлено",
};

export const OrganizerStageSubmissionsPage = () => {
  const params = useParams<{ contestId?: string; stageId?: string }>();
  const contestId = Number(params.contestId);
  const stageId = Number(params.stageId);
  const isStageIdValid = Number.isFinite(stageId) && stageId > 0;

  const contest = useGetContest(contestId);
  const submissions = useGetOrganizerStageSubmissions(stageId, isStageIdValid);

  const stage = submissions.data?.stage;
  const items = submissions.data?.submissions ?? [];

  const setLabels = useBreadcrumbStore((s) => s.setLabels);
  const clearLabels = useBreadcrumbStore((s) => s.clearLabels);
  useEffect(() => {
    if (contest.data?.title || stage?.title) {
      setLabels({
        contestTitle: contest.data?.title,
        stageTitle: stage?.title,
      });
    }
    return () => clearLabels();
  }, [contest.data?.title, stage?.title]);

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          Решения участников: {stage?.title ?? `этап #${stageId || "-"}`}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Все отправленные решения этапа для пространства организатора.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SPanelWide>
        <SPanelHeader>
          <div>
            <SPanelTitle>Решения ({items.length})</SPanelTitle>
            <SPanelText>Полей этапа: {stage?.fields?.length ?? 0}</SPanelText>
          </div>
          <SActions>
            <Link
              href={`/organizer/contests/${contestId}/stages/${stageId}/fields`}
            >
              <Button color="gray">Назад к этапу</Button>
            </Link>
          </SActions>
        </SPanelHeader>

        {!isStageIdValid && (
          <SPanelText>В адресе нет корректного stageId.</SPanelText>
        )}
        {submissions.isError && (
          <SPanelText>Не удалось загрузить решения участников.</SPanelText>
        )}

        <SList>
          {items.map((submission) => {
            const id = submission.id ?? submission.summary?.submissionId;
            const status = submission.status ?? submission.summary?.status;
            const title =
              submission.summary?.solutionTitle || `Решение #${id ?? "-"}`;

            return (
              <SListItem
                key={id ?? `${submission.summary?.projectId}-${title}`}
              >
                <div>
                  <SItemTitle>{title}</SItemTitle>
                  <SItemMeta>
                    Submission ID: {id ?? "-"} · Project ID:{" "}
                    {submission.summary?.projectId ?? "-"} · Значений:{" "}
                    {submission.values?.length ?? 0}
                  </SItemMeta>
                  <SItemMeta>
                    Contest ID: {submission.summary?.contestId ?? contestId} ·
                    Stage ID: {submission.summary?.stageId ?? stageId}
                  </SItemMeta>
                </div>
                <SActions>
                  <SStatus>
                    {SUBMISSION_STATUS_LABELS[status ?? ""] ?? status ?? "-"}
                  </SStatus>
                  {id && (
                    <Link href={`/organizer/stage-submissions/${id}`}>
                      <Button>Открыть</Button>
                    </Link>
                  )}
                </SActions>
              </SListItem>
            );
          })}
          {!items.length && !submissions.isPending && (
            <SPanelText>Отправленных решений пока нет.</SPanelText>
          )}
        </SList>
      </SPanelWide>
    </SWorkspacePage>
  );
};
