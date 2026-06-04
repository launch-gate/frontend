"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import {
  IAiReviewResponse,
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
import {
  SAiAnswer,
  SAiBadge,
  SAiCriterionBadges,
  SAiCriterionCard,
  SAiCriterionHeader,
  SAiCriterionTitle,
  SAiEvidence,
  SAiFieldBadges,
  SAiFieldBody,
  SAiFieldCard,
  SAiFieldMeta,
  SAiFieldsList,
  SAiFieldTitleBlock,
  SAiFieldToggle,
  SAiReviewHeader,
} from "./submissionReviewPage.styles";

const AI_REVIEW_STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Проверено",
  COMPLETED_WITH_WARNINGS: "Проверено с предупреждениями",
  UNSUPPORTED_FORMAT: "Формат не поддерживается",
  SKIPPED_NO_CRITERIA: "Пропущено: нет критериев",
  SKIPPED_NO_DATA: "Пропущено: нет данных",
  SKIPPED: "Пропущено",
  FAILED: "Ошибка",
};

export const SubmissionReviewPage = () => {
  const params = useParams<{ submissionId?: string }>();
  const submissionId = Number(params.submissionId);
  const isSubmissionIdValid = Number.isFinite(submissionId) && submissionId > 0;

  const submission = useGetOrganizerStageSubmission(
    submissionId,
    isSubmissionIdValid,
  );
  const aiReview = useGetAiReview(submissionId, isSubmissionIdValid);
  const createAiReview = useCreateAiReview();
  const assignExpert = useAssignExpert();

  const [expertUserId, setExpertUserId] = useState("");
  const [createdReview, setCreatedReview] = useState<IAiReviewResponse | null>(
    null,
  );
  const [actionResult, setActionResult] = useState<string | null>(null);
  const [expandedFieldIds, setExpandedFieldIds] = useState<number[]>([]);
  const [autoExpandedReviewId, setAutoExpandedReviewId] = useState<
    number | null
  >(null);

  const values = submission.data?.values ?? [];
  const fields = submission.data?.stage?.fields ?? [];
  const review = createdReview ?? aiReview.data?.review ?? null;
  const completedFields = useMemo(
    () =>
      review?.fields
        ?.filter((field) => field.status === "COMPLETED")
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? [],
    [review?.fields],
  );

  const getFieldTitle = (fieldId?: number) => {
    const field = fields.find((f) => f.id === fieldId);
    return field?.title ?? `Поле #${fieldId ?? "-"}`;
  };

  useEffect(() => {
    if (!completedFields.length) return;
    const reviewId = review?.id ?? null;
    if (reviewId === null || autoExpandedReviewId === reviewId) return;
    const firstFieldId = completedFields[0].fieldId ?? 0;
    if (firstFieldId) setExpandedFieldIds([firstFieldId]);
    setAutoExpandedReviewId(reviewId);
  }, [autoExpandedReviewId, completedFields, review?.id]);

  const toggleAiField = (fieldId?: number) => {
    if (!fieldId) return;
    setExpandedFieldIds((current) =>
      current.includes(fieldId)
        ? current.filter((id) => id !== fieldId)
        : [...current, fieldId],
    );
  };

  const formatConfidence = (confidence?: number) => {
    if (confidence === undefined || confidence === null) return "-";
    return `${Math.round(confidence * 100)}%`;
  };

  const handleRunAiReview = () =>
    createAiReview.mutate(
      { submissionId },
      {
        onSuccess: (data) => {
          setCreatedReview(data);
          setActionResult("AI-ревью готово.");
          aiReview.refetch();
        },
        onError: (error) => setActionResult(error.message),
      },
    );

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          Решение #{isSubmissionIdValid ? submissionId : "-"}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Организаторский просмотр сдачи: данные этапа, статус, значения формы,
          AI-ревью и назначение эксперта.
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
                  <SItemMeta>
                    {value.valueText || value.fileIds || "-"}
                  </SItemMeta>
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
          <SPanelTitle>AI-ревью</SPanelTitle>
          {aiReview.isError && !aiReview.isPending && !review && (
            <SPanelText>
              Не удалось загрузить сохраненный результат AI-ревью.
            </SPanelText>
          )}
          {!aiReview.isPending && !review && (
            <SActions>
              <SPanelText>
                AI-ревью для этого решения еще не запускалось.
              </SPanelText>
              <Button
                color="violet"
                loading={createAiReview.isPending}
                disabled={!isSubmissionIdValid}
                onClick={handleRunAiReview}
              >
                Запустить AI-ревью
              </Button>
            </SActions>
          )}
          {review && (
            <SAiFieldsList>
              <SAiReviewHeader>
                <div>
                  <SItemTitle>Результат проверки</SItemTitle>
                  <SItemMeta>
                    Review ID: {review.id ?? "-"} · Submission ID:{" "}
                    {review.submissionId ?? submissionId} · Обновлено:{" "}
                    {review.updatedAt
                      ? new Intl.DateTimeFormat("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(review.updatedAt))
                      : "-"}
                  </SItemMeta>
                </div>
                <SActions>
                  <SStatus>
                    {AI_REVIEW_STATUS_LABELS[review.status ?? ""] ??
                      review.status ??
                      "-"}
                  </SStatus>
                  <Button
                    color="violet"
                    loading={createAiReview.isPending}
                    disabled={!isSubmissionIdValid}
                    onClick={handleRunAiReview}
                  >
                    Запустить повторно
                  </Button>
                </SActions>
              </SAiReviewHeader>
              {completedFields.map((fieldResult, idx) => (
                <SAiFieldCard key={fieldResult.fieldId ?? idx}>
                  <SAiFieldToggle
                    type="button"
                    onClick={() => toggleAiField(fieldResult.fieldId)}
                  >
                    <SAiFieldTitleBlock>
                      <SItemTitle>
                        {fieldResult.title ??
                          `Поле #${fieldResult.fieldId ?? idx}`}
                      </SItemTitle>
                      <SAiFieldMeta>
                        {fieldResult.type ?? "Тип поля не указан"} ·{" "}
                        {(fieldResult.criteria ?? []).length} критериев
                        {fieldResult.message ? ` · ${fieldResult.message}` : ""}
                      </SAiFieldMeta>
                    </SAiFieldTitleBlock>
                    <SAiFieldBadges>
                      <SAiBadge $tone="success">
                        {AI_REVIEW_STATUS_LABELS[fieldResult.status ?? ""] ??
                          fieldResult.status ??
                          "-"}
                      </SAiBadge>
                      <SAiBadge>
                        {expandedFieldIds.includes(fieldResult.fieldId ?? 0)
                          ? "Свернуть"
                          : "Раскрыть"}
                      </SAiBadge>
                    </SAiFieldBadges>
                  </SAiFieldToggle>

                  {expandedFieldIds.includes(fieldResult.fieldId ?? 0) && (
                    <SAiFieldBody>
                      {(fieldResult.criteria ?? [])
                        .slice()
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        .map((cr, ci) => (
                          <SAiCriterionCard key={cr.criterionId ?? ci}>
                            <SAiCriterionHeader>
                              <SAiCriterionTitle>
                                {cr.description ?? `Критерий ${ci + 1}`}
                              </SAiCriterionTitle>
                              <SAiCriterionBadges>
                                <SAiBadge $tone="score">
                                  {cr.score !== undefined && cr.score !== null
                                    ? `${cr.score}/10`
                                    : "Без оценки"}
                                </SAiBadge>
                                <SAiBadge>
                                  Confidence {formatConfidence(cr.confidence)}
                                </SAiBadge>
                                <SAiBadge $tone="success">
                                  {AI_REVIEW_STATUS_LABELS[cr.status ?? ""] ??
                                    cr.status ??
                                    "-"}
                                </SAiBadge>
                              </SAiCriterionBadges>
                            </SAiCriterionHeader>
                            <SAiAnswer>
                              {cr.answer || "AI не вернул текстовый ответ."}
                            </SAiAnswer>
                            {(cr.evidence ?? [])
                              .filter(
                                (evidence) => evidence.quote || evidence.why,
                              )
                              .map((evidence, evidenceIndex) => (
                                <SAiEvidence key={evidenceIndex}>
                                  {evidence.quote && (
                                    <div>
                                      Фрагмент {evidenceIndex + 1}:{" "}
                                      {evidence.quote}
                                    </div>
                                  )}
                                  {evidence.why && (
                                    <div>Пояснение: {evidence.why}</div>
                                  )}
                                </SAiEvidence>
                              ))}
                          </SAiCriterionCard>
                        ))}
                    </SAiFieldBody>
                  )}
                </SAiFieldCard>
              ))}
              {!completedFields.length && (
                <SPanelText>
                  В AI-ревью нет полей со статусом COMPLETED.
                </SPanelText>
              )}
            </SAiFieldsList>
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
