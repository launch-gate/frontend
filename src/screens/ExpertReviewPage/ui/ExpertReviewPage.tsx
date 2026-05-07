"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

import {
  useGetExpertReviewSubmission,
  usePublishExpertReview,
  useSaveExpertReviewDraft,
} from "@/entities/evaluation";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";
import {
  SActions,
  SField,
  SFormGrid,
  SInput,
  SItemMeta,
  SItemTitle,
  SList,
  SListItem,
  SPanelText,
  SPanelTitle,
  SPanelWide,
  SStatus,
  STextarea,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

export const ExpertReviewPage = () => {
  const params = useParams<{ assignmentId?: string }>();
  const assignmentId = Number(params.assignmentId);
  const isAssignmentIdValid = Number.isFinite(assignmentId) && assignmentId > 0;

  const submission = useGetExpertReviewSubmission(
    assignmentId,
    isAssignmentIdValid,
  );
  const saveDraft = useSaveExpertReviewDraft();
  const publishReview = usePublishExpertReview();

  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [actionResult, setActionResult] = useState<string | null>(null);

  const values = submission.data?.values ?? [];

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Проверка #{isAssignmentIdValid ? assignmentId : "-"}</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Просмотр submission, сохранение draft-оценки и публикация итоговой
          экспертной проверки.
        </SWorkspaceSubtitle>
        <SActions>
          <Link href={routes.EXPERT_PAGE}>
            <Button>Кабинет эксперта</Button>
          </Link>
        </SActions>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Submission</SPanelTitle>
          {!isAssignmentIdValid && (
            <SPanelText>В адресе нет корректного assignmentId.</SPanelText>
          )}
          <SList>
            <SListItem>
              <div>
                <SItemTitle>
                  {submission.data?.stage?.title ??
                    `Этап #${submission.data?.stage?.id ?? "-"}`}
                </SItemTitle>
                <SItemMeta>
                  Submission #{submission.data?.id ?? "-"} · Значений: {values.length}
                </SItemMeta>
              </div>
              <SStatus>{submission.data?.status ?? "-"}</SStatus>
            </SListItem>
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Оценка</SPanelTitle>
          <SFormGrid>
            <SField>
              Баллы
              <SInput
                type="number"
                value={score}
                onChange={(event) => setScore(event.target.value)}
              />
            </SField>
          </SFormGrid>
          <SField>
            Комментарий
            <STextarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={saveDraft.isPending}
              onClick={() =>
                saveDraft.mutate(
                  {
                    assignmentId,
                    data: {
                      score: score ? Number(score) : undefined,
                      comment: comment.trim() || undefined,
                    },
                  },
                  {
                    onSuccess: (data) =>
                      setActionResult(`Draft сохранён: ${data.status ?? "-"}`),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Сохранить draft
            </Button>
            <Button
              loading={publishReview.isPending}
              onClick={() =>
                publishReview.mutate(
                  { assignmentId },
                  {
                    onSuccess: (data) =>
                      setActionResult(`Проверка опубликована: ${data.status ?? "-"}`),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Опубликовать
            </Button>
          </SActions>
          {actionResult && <SPanelText>{actionResult}</SPanelText>}
        </SWorkspacePanel>

        <SPanelWide>
          <SPanelTitle>Значения формы</SPanelTitle>
          <SList>
            {values.map((value) => (
              <SListItem key={value.id ?? value.fieldId}>
                <div>
                  <SItemTitle>Поле #{value.fieldId ?? "-"}</SItemTitle>
                  <SItemMeta>{value.valueText || value.fileIds || "-"}</SItemMeta>
                </div>
                <SStatus>#{value.id ?? "-"}</SStatus>
              </SListItem>
            ))}
            {!values.length && !submission.isPending && (
              <SPanelText>Значения формы отсутствуют.</SPanelText>
            )}
          </SList>
        </SPanelWide>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
