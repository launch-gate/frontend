"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import {
  useAssignExpert,
  useCreateAiReview,
  useGetAiReview,
} from "@/entities/evaluation";
import { useGetOrganizerStageSubmission } from "@/entities/project";
import { Button } from "@/shared/components";
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
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

const AI_REVIEW_STATUS_LABELS: Record<string, string> = {
  SUCCESS: "Проверено",
  UNSUPPORTED_FORMAT: "Формат не поддерживается",
  SKIPPED_NO_CRITERIA: "Пропущено: нет критериев",
  SKIPPED_NO_DATA: "Пропущено: нет данных",
  FAILED: "Ошибка",
};

export const SubmissionReviewPage = () => {
  const params = useParams<{ submissionId?: string }>();
  const submissionId = Number(params.submissionId);
  const isSubmissionIdValid = Number.isFinite(submissionId) && submissionId > 0;

  const submission = useGetOrganizerStageSubmission(submissionId, isSubmissionIdValid);
  const aiReview = useGetAiReview(submissionId, isSubmissionIdValid);
  const createAiReview = useCreateAiReview();
  const assignExpert = useAssignExpert();

  const [expertUserId, setExpertUserId] = useState("");
  const [actionResult, setActionResult] = useState<string | null>(null);

  const values = submission.data?.values ?? [];
  const fields = submission.data?.stage?.fields ?? [];

  const getFieldTitle = (fieldId?: number) => {
    const field = fields.find((f) => f.id === fieldId);
    return field?.title ?? `Поле #${fieldId ?? "-"}`;
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          Stage submission #{isSubmissionIdValid ? submissionId : "-"}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Организаторский просмотр сдачи: данные этапа, статус, значения формы,
          AI review и назначение эксперта.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Сводка</SPanelTitle>
          {!isSubmissionIdValid && (
            <SPanelText>В адресе нет корректного submissionId.</SPanelText>
          )}
          {submission.isError && (
            <SPanelText>Не удалось загрузить submission.</SPanelText>
          )}
          <SList>
            <SListItem>
              <div>
                <SItemTitle>
                  {submission.data?.stage?.title ??
                    `Этап #${submission.data?.stage?.id ?? "-"}`}
                </SItemTitle>
                <SItemMeta>
                  Полей: {fields.length} · Значений: {values.length}
                </SItemMeta>
              </div>
              <SStatus>{submission.data?.status ?? "-"}</SStatus>
            </SListItem>
          </SList>
        </SWorkspacePanel>

        <SPanelWide>
          <SPanelTitle>Значения</SPanelTitle>
          <SList>
            {values.map((value) => (
              <SListItem key={value.id ?? value.fieldId}>
                <div>
                  <SItemTitle>{getFieldTitle(value.fieldId)}</SItemTitle>
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

        <SPanelWide>
          <SPanelTitle>AI Review</SPanelTitle>
          {aiReview.isError && !aiReview.isPending && (
            <SActions>
              <SPanelText>AI Review ещё не запускался.</SPanelText>
              <Button
                color="violet"
                loading={createAiReview.isPending}
                disabled={!isSubmissionIdValid}
                onClick={() =>
                  createAiReview.mutate(
                    { submissionId },
                    {
                      onSuccess: () => {
                        setActionResult("AI Review запущен. Обновите страницу через несколько секунд.");
                        aiReview.refetch();
                      },
                      onError: (error) => setActionResult(error.message),
                    },
                  )
                }
              >
                Запустить AI Review
              </Button>
            </SActions>
          )}
          {aiReview.data && (
            <SList>
              {(aiReview.data.fieldResults ?? []).map((fieldResult, idx) => (
                <SListItem key={fieldResult.fieldId ?? idx}>
                  <div>
                    <SItemTitle>
                      {fieldResult.fieldTitle ?? `Поле #${fieldResult.fieldId ?? idx}`}
                    </SItemTitle>
                    {fieldResult.status === "SUCCESS" && fieldResult.result && (
                      <SItemMeta>{fieldResult.result}</SItemMeta>
                    )}
                    {(fieldResult.criteriaResults ?? []).map((cr, ci) => (
                      <SItemMeta key={ci}>
                        {cr.criterionDescription ?? `Критерий ${ci + 1}`}:{" "}
                        {cr.score !== undefined ? `${cr.score}` : ""}{" "}
                        {cr.comment ?? ""}
                      </SItemMeta>
                    ))}
                  </div>
                  <SStatus>
                    {AI_REVIEW_STATUS_LABELS[fieldResult.status ?? ""] ?? fieldResult.status ?? "-"}
                  </SStatus>
                </SListItem>
              ))}
              {!(aiReview.data.fieldResults ?? []).length && (
                <SPanelText>Результатов AI Review нет.</SPanelText>
              )}
            </SList>
          )}
        </SPanelWide>

        <SWorkspacePanel>
          <SPanelTitle>Назначить эксперта</SPanelTitle>
          <SFormGrid>
            <SField>
              Expert user ID
              <SInput
                type="number"
                value={expertUserId}
                onChange={(e) => setExpertUserId(e.target.value)}
              />
            </SField>
          </SFormGrid>
          <SActions>
            <Button
              color="violet"
              loading={assignExpert.isPending}
              disabled={!isSubmissionIdValid || !expertUserId}
              onClick={() =>
                assignExpert.mutate(
                  { submissionId, expertUserId: Number(expertUserId) },
                  {
                    onSuccess: (data) =>
                      setActionResult(`Эксперт назначен: #${data.id ?? "-"}`),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Назначить
            </Button>
          </SActions>
          {actionResult && <SPanelText>{actionResult}</SPanelText>}
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
