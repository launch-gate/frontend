"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useGetContest, useGetContestParticipants } from "@/entities/contest";
import { useBreadcrumbStore } from "@/widgets/Breadcrumb";
import {
  useGetContestStage,
  useGetContestStages,
  normalizeFileFormats,
  IFieldParticipantResponse,
  IResourceResponse,
} from "@/entities/stage";
import {
  useCreateProject,
  useGetMyProjects,
  useSaveProjectStageValue,
  useSubmitProjectStage,
} from "@/entities/project";
import { useGetContestTeams } from "@/entities/team";
import { useGetUserProfile } from "@/entities/user";
import { Button } from "@/shared/components";
import {
  SPanelText,
  SPanelTitle,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

import {
  SAccessBlock,
  SAccessText,
  SAccessTitle,
  SDeadlineBadge,
  SEliminatingBadge,
  SFieldBadge,
  SFieldCard,
  SFieldExample,
  SFieldHeader,
  SFieldHint,
  SFieldMeta,
  SFieldTitle,
  SFormField,
  SFormHint,
  SFormInput,
  SFormLabel,
  SFormSection,
  SFormSelect,
  SFormTextarea,
  SGrid,
  SMetaGrid,
  SMetaItem,
  SMetaLabel,
  SMetaValue,
  SResourceCard,
  SResourceDesc,
  SResourceLink,
  SResourceTitle,
  SStageNav,
  SStageNavLabel,
  SSubmitRow,
  SSubmittedBadge,
} from "./stagePage.styles";

/* ─── helpers ────────────────────────────────────────────────────────────── */

const scoreScaleLabels: Record<string, string> = {
  POINTS_10: "0–10 баллов",
  POINTS_100: "0–100 баллов",
  PASS_FAIL: "Зачёт / Незачёт",
  STARS_5: "1–5 звёзд",
};

const fieldTypeLabels: Record<string, string> = {
  TEXT: "Текст",
  LINK: "Ссылка",
  FILE: "Файл",
  FILES: "Файлы",
  VIDEO: "Видео",
  PHOTO: "Фото",
  SELECT: "Выбор",
  NUMBER: "Число",
};

const formatDateTime = (date?: string | null) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const isDeadlinePassed = (deadlineAt?: string | null) => {
  if (!deadlineAt) return false;
  return new Date(deadlineAt).getTime() < Date.now();
};

/* ─── ResourceCard ────────────────────────────────────────────────────────── */

const ResourceCard = ({ resource }: { resource: IResourceResponse }) => (
  <SResourceCard>
    {resource.title && <SResourceTitle>{resource.title}</SResourceTitle>}
    {resource.description && (
      <SResourceDesc>{resource.description}</SResourceDesc>
    )}
    {resource.linkUrl && (
      <SResourceLink
        href={resource.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {resource.linkUrl}
      </SResourceLink>
    )}
  </SResourceCard>
);

/* ─── SubmissionField ─────────────────────────────────────────────────────── */

interface SubmissionFieldProps {
  field: IFieldParticipantResponse;
  value: string;
  disabled: boolean;
  onChange: (val: string) => void;
  onBlur: () => void;
}

const SubmissionField = ({
  field,
  value,
  disabled,
  onChange,
  onBlur,
}: SubmissionFieldProps) => {
  const opts = useMemo<string[]>(() => {
    if (field.type !== "SELECT" || !field.options) return [];
    try {
      return JSON.parse(field.options);
    } catch {
      return [];
    }
  }, [field.type, field.options]);

  return (
    <SFormField>
      <SFormLabel>
        {field.title ?? "Поле"}
        {field.required && <span style={{ color: "#d93025" }}> *</span>}
        <SFieldBadge style={{ marginLeft: 8 }}>
          {fieldTypeLabels[field.type ?? ""] ?? field.type}
        </SFieldBadge>
      </SFormLabel>

      {field.participantHint && (
        <SFormHint>💡 {field.participantHint}</SFormHint>
      )}
      {field.exampleValue && (
        <SFormHint style={{ fontStyle: "italic" }}>
          Пример: {field.exampleValue}
        </SFormHint>
      )}

      {field.type === "SELECT" ? (
        <SFormSelect
          value={value}
          disabled={disabled}
          $disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        >
          <option value="">— Выберите вариант —</option>
          {opts.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </SFormSelect>
      ) : field.type === "TEXT" ? (
        <SFormTextarea
          value={value}
          disabled={disabled}
          $disabled={disabled}
          placeholder="Введите текст..."
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <SFormInput
          value={value}
          disabled={disabled}
          $disabled={disabled}
          placeholder={
            field.type === "LINK" || field.type === "VIDEO"
              ? "https://..."
              : field.type === "NUMBER"
                ? "Введите число..."
                : "Введите значение..."
          }
          type={field.type === "NUMBER" ? "number" : "text"}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )}

      {normalizeFileFormats(field.fileFormats) && (
        <SFormHint>
          Форматы: {normalizeFileFormats(field.fileFormats)}
          {field.maxFileSizeMb ? ` · Макс. ${field.maxFileSizeMb} МБ` : ""}
        </SFormHint>
      )}
    </SFormField>
  );
};

/* ─── StagePage ───────────────────────────────────────────────────────────── */

export const StagePage = () => {
  const params = useParams<{ contestId?: string; stageId?: string }>();
  const router = useRouter();
  const stageId = Number(params.stageId);
  const contestId = Number(params.contestId);
  const isValid =
    Number.isFinite(stageId) &&
    stageId > 0 &&
    Number.isFinite(contestId) &&
    contestId > 0;

  /* ─── data ─────────────────────────────────────────────────────────────── */

  const profile = useGetUserProfile();
  const contest = useGetContest(contestId);
  const stage = useGetContestStage(stageId, isValid);
  const stageList = useGetContestStages(contestId, isValid);
  const participants = useGetContestParticipants(contestId, isValid);
  const teams = useGetContestTeams(contestId, isValid);
  const myProjects = useGetMyProjects();

  /* ─── mutations ─────────────────────────────────────────────────────────── */

  const createProject = useCreateProject();
  const saveValue = useSaveProjectStageValue();
  const submitStage = useSubmitProjectStage();

  /* ─── derived state ─────────────────────────────────────────────────────── */

  const userId = profile.data?.id;
  const isOrganizer = profile.data?.accountType === "ORGANIZER";

  const isParticipant = useMemo(
    () =>
      participants.data?.participants?.some((p) => p.userId === userId) ??
      false,
    [participants.data, userId],
  );

  const participationMode = contest.data?.participationMode;

  const myTeam = useMemo(() => {
    if (participationMode !== "TEAM") return null;
    return (
      teams.data?.teams?.find(
        (t) =>
          (t.leaderId != null && t.leaderId === userId) ||
          (t.memberIds?.includes(userId!) ?? false),
      ) ?? null
    );
  }, [teams.data, userId, participationMode]);

  const isTeamLeader = myTeam?.leaderId === userId;

  const project = useMemo(
    () =>
      myProjects.data?.activeProjects?.find((p) => p.contestId === contestId) ??
      null,
    [myProjects.data, contestId],
  );

  const submission = useMemo(
    () => project?.stages?.find((s) => s.stage?.id === stageId) ?? null,
    [project, stageId],
  );

  const isSubmitted = submission?.status === "SUBMITTED";

  const deadlinePassed = isDeadlinePassed(stage.data?.deadlineAt);

  /* ─── sorted stage list for navigation ─────────────────────────────────── */

  const sortedStages = useMemo(
    () =>
      [...(stageList.data?.stages ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      ),
    [stageList.data],
  );

  const currentIndex = sortedStages.findIndex((s) => s.id === stageId);
  const prevStage = currentIndex > 0 ? sortedStages[currentIndex - 1] : null;
  const nextStage =
    currentIndex >= 0 && currentIndex < sortedStages.length - 1
      ? sortedStages[currentIndex + 1]
      : null;

  /* ─── form state ─────────────────────────────────────────────────────────── */

  const fields = useMemo(
    () =>
      [...(stage.data?.fields ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      ),
    [stage.data],
  );

  const resources = useMemo(
    () =>
      [...(stage.data?.resources ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      ),
    [stage.data],
  );

  const [fieldValues, setFieldValues] = useState<Record<number, string>>({});
  const initializedRef = useRef(false);

  // Initialize values from existing submission
  const setLabels = useBreadcrumbStore((s) => s.setLabels);
  const clearLabels = useBreadcrumbStore((s) => s.clearLabels);
  useEffect(() => {
    if (contest.data?.title || stage.data?.title) {
      setLabels({
        contestTitle: contest.data?.title,
        stageTitle: stage.data?.title,
      });
    }
    return () => clearLabels();
  }, [contest.data?.title, stage.data?.title]);

  useEffect(() => {
    if (initializedRef.current) return;
    if (!submission?.values) return;
    initializedRef.current = true;
    const init: Record<number, string> = {};
    for (const v of submission.values) {
      if (v.fieldId != null) init[v.fieldId] = v.valueText ?? "";
    }
    setFieldValues(init);
  }, [submission]);

  /* ─── auto-project creation ─────────────────────────────────────────────── */

  const shouldCreateProject =
    isValid &&
    !isOrganizer &&
    isParticipant &&
    !profile.isPending &&
    !myProjects.isPending &&
    project === null &&
    !createProject.isPending &&
    !createProject.isSuccess &&
    (participationMode === "INDIVIDUAL" ||
      (participationMode === "TEAM" && myTeam != null));

  const createProjectAttempted = useRef(false);

  useEffect(() => {
    if (!shouldCreateProject) return;
    if (createProjectAttempted.current) return;
    createProjectAttempted.current = true;
    createProject.mutate({
      contestId,
      ...(participationMode === "TEAM" && myTeam ? { teamId: myTeam.id } : {}),
    });
  }, [shouldCreateProject]);

  /* ─── save on blur ────────────────────────────────────────────────────────── */

  const handleBlur = (fieldId: number) => {
    if (!project?.id || isSubmitted || deadlinePassed) return;
    const valueText = fieldValues[fieldId] ?? "";
    saveValue.mutate({
      projectId: project.id,
      stageId,
      data: { fieldId, valueText },
    });
  };

  /* ─── submit validation ─────────────────────────────────────────────────── */

  const canSubmit = useMemo(() => {
    if (!project?.id || isSubmitted || deadlinePassed) return false;
    return fields
      .filter((f) => f.required)
      .every((f) => {
        const val = fieldValues[f.id ?? -1];
        return val != null && val.trim() !== "";
      });
  }, [fields, fieldValues, project, isSubmitted, deadlinePassed]);

  const handleSubmit = () => {
    if (!project?.id || !canSubmit) return;
    submitStage.mutate({ projectId: project.id, stageId });
  };

  /* ─── invalid page ────────────────────────────────────────────────────────── */

  if (!isValid) {
    return (
      <SWorkspacePage>
        <SWorkspaceHeader>
          <SWorkspaceTitle>Этап не найден</SWorkspaceTitle>
        </SWorkspaceHeader>
      </SWorkspacePage>
    );
  }

  /* ─── render ──────────────────────────────────────────────────────────────── */

  const stageData = stage.data;

  const showForm =
    !isOrganizer &&
    isParticipant &&
    !myProjects.isPending &&
    (participationMode === "INDIVIDUAL" ||
      (participationMode === "TEAM" && myTeam != null));

  const contestTitle = contest.data?.title ?? `Конкурс #${contestId}`;
  const stageTitle = stageData?.title ?? `Этап #${stageId}`;

  return (
    <SWorkspacePage>
      {/* Header */}
      <SWorkspaceHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <SWorkspaceTitle>{stageTitle}</SWorkspaceTitle>
          {stageData?.eliminating && (
            <SEliminatingBadge>Отборочный</SEliminatingBadge>
          )}
        </div>
        {stageData?.description && (
          <SWorkspaceSubtitle>{stageData.description}</SWorkspaceSubtitle>
        )}
      </SWorkspaceHeader>

      {stage.isError && <SPanelText>Не удалось загрузить этап.</SPanelText>}

      {stageData && (
        <SWorkspaceGrid>
          {/* Stage info — left col, row 1 */}
          <SWorkspacePanel style={{ gridColumn: 1 }}>
            <SPanelTitle>Информация об этапе</SPanelTitle>
            <SMetaGrid>
              <SMetaItem>
                <SMetaLabel>Дедлайн</SMetaLabel>
                <SMetaValue
                  style={deadlinePassed ? { color: "#d93025" } : undefined}
                >
                  {formatDateTime(stageData.deadlineAt)}
                </SMetaValue>
              </SMetaItem>
              <SMetaItem>
                <SMetaLabel>Шкала оценивания</SMetaLabel>
                <SMetaValue>
                  {stageData.scoreScale
                    ? (scoreScaleLabels[stageData.scoreScale] ??
                      stageData.scoreScale)
                    : "—"}
                </SMetaValue>
              </SMetaItem>
              <SMetaItem>
                <SMetaLabel>Порядковый номер</SMetaLabel>
                <SMetaValue>Этап {(stageData.order ?? 0) + 1}</SMetaValue>
              </SMetaItem>
              <SMetaItem>
                <SMetaLabel>Отборочный</SMetaLabel>
                <SMetaValue>{stageData.eliminating ? "Да" : "Нет"}</SMetaValue>
              </SMetaItem>
            </SMetaGrid>

            {deadlinePassed && (
              <SDeadlineBadge>⏰ Дедлайн истёк</SDeadlineBadge>
            )}

            {stageData.rules && (
              <>
                <SPanelTitle style={{ marginTop: 8 }}>Правила</SPanelTitle>
                <SPanelText>{stageData.rules}</SPanelText>
              </>
            )}
          </SWorkspacePanel>

          {/* Fields overview — right col, spans rows 1–2 */}
          {fields.length > 0 && (
            <SWorkspacePanel style={{ gridColumn: 2, gridRow: "1 / 3" }}>
              <SPanelTitle>Поля заявки ({fields.length})</SPanelTitle>
              <SGrid>
                {fields.map((field) => (
                  <SFieldCard key={field.id}>
                    <SFieldHeader>
                      <SFieldTitle>{field.title ?? "Без названия"}</SFieldTitle>
                      <div style={{ display: "flex", gap: 6 }}>
                        <SFieldBadge>
                          {fieldTypeLabels[field.type ?? ""] ?? field.type}
                        </SFieldBadge>
                        <SFieldBadge $required={field.required}>
                          {field.required ? "Обязательно" : "Необязательно"}
                        </SFieldBadge>
                      </div>
                    </SFieldHeader>
                    {field.participantHint && (
                      <SFieldHint>💡 {field.participantHint}</SFieldHint>
                    )}
                    {field.exampleValue && (
                      <SFieldExample>Пример: {field.exampleValue}</SFieldExample>
                    )}
                    {normalizeFileFormats(field.fileFormats) && (
                      <SFieldMeta>
                        Форматы: {normalizeFileFormats(field.fileFormats)}
                        {field.maxFileSizeMb ? ` · Макс. ${field.maxFileSizeMb} МБ` : ""}
                      </SFieldMeta>
                    )}
                  </SFieldCard>
                ))}
              </SGrid>
            </SWorkspacePanel>
          )}

          {/* Resources — left col, row 2 */}
          {resources.length > 0 && (
            <SWorkspacePanel style={{ gridColumn: 1 }}>
              <SPanelTitle>Материалы</SPanelTitle>
              <SGrid>
                {resources.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </SGrid>
            </SWorkspacePanel>
          )}

          {/* Not authenticated */}
          {!profile.isPending && !profile.data && (
            <SWorkspacePanel>
              <SAccessBlock>
                <SAccessTitle>Войдите, чтобы подать заявку</SAccessTitle>
                <SAccessText>
                  Авторизуйтесь, чтобы зарегистрироваться в конкурсе и заполнить заявку.
                </SAccessText>
                <Link href="/login">
                  <Button type="primary" color="violet">Войти</Button>
                </Link>
              </SAccessBlock>
            </SWorkspacePanel>
          )}

          {/* Authenticated but not registered in contest */}
          {!isOrganizer && profile.data && !participants.isPending && !isParticipant && (
            <SWorkspacePanel>
              <SAccessBlock>
                <SAccessTitle>Вы не зарегистрированы в конкурсе</SAccessTitle>
                <SAccessText>
                  Чтобы подать заявку на этот этап, сначала зарегистрируйтесь в конкурсе.
                </SAccessText>
                <Link href={`/contests/${contestId}`}>
                  <Button type="primary" color="violet">Зарегистрироваться</Button>
                </Link>
              </SAccessBlock>
            </SWorkspacePanel>
          )}

          {/* Team contest but no team */}
          {!isOrganizer &&
            isParticipant &&
            participationMode === "TEAM" &&
            !teams.isPending &&
            myTeam === null && (
              <SWorkspacePanel>
                <SAccessBlock>
                  <SAccessTitle>У вас нет команды</SAccessTitle>
                  <SAccessText>
                    Для подачи заявки вступите в команду или создайте свою.
                  </SAccessText>
                  <Link href={`/contests/${contestId}`}>
                    <Button type="primary">К командам</Button>
                  </Link>
                </SAccessBlock>
              </SWorkspacePanel>
            )}

          {/* Submission form */}
          {showForm && (
            <SWorkspacePanel style={{ gridColumn: "1 / -1" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <SPanelTitle>Заявка</SPanelTitle>
                {isSubmitted && <SSubmittedBadge>✓ Подано</SSubmittedBadge>}
                {!isSubmitted && deadlinePassed && (
                  <SDeadlineBadge>
                    Дедлайн истёк — подача закрыта
                  </SDeadlineBadge>
                )}
              </div>

              {fields.length === 0 ? (
                <SPanelText>Поля заявки не заданы.</SPanelText>
              ) : (
                <SFormSection>
                  {fields.map((field) => (
                    <SubmissionField
                      key={field.id}
                      field={field}
                      value={fieldValues[field.id ?? -1] ?? ""}
                      disabled={isSubmitted || deadlinePassed || !project?.id}
                      onChange={(val) =>
                        setFieldValues((prev) => ({
                          ...prev,
                          [field.id ?? -1]: val,
                        }))
                      }
                      onBlur={() => field.id != null && handleBlur(field.id)}
                    />
                  ))}
                </SFormSection>
              )}

              {!isSubmitted && !deadlinePassed && (
                <SSubmitRow>
                  <Button
                    type="primary"
                    disabled={!canSubmit || submitStage.isPending}
                    onClick={handleSubmit}
                  >
                    {submitStage.isPending ? "Отправка..." : "Отправить заявку"}
                  </Button>
                  {!canSubmit && (
                    <SPanelText style={{ margin: 0 }}>
                      Заполните все обязательные поля
                    </SPanelText>
                  )}
                </SSubmitRow>
              )}
            </SWorkspacePanel>
          )}
        </SWorkspaceGrid>
      )}

      {/* Stage navigation */}
      {sortedStages.length > 1 && (
        <SStageNav>
          {prevStage ? (
            <Link href={`/contests/${contestId}/stages/${prevStage.id}`}>
              <Button type="default" color="gray">
                ← {prevStage.title ?? `Этап ${(prevStage.order ?? 0) + 1}`}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextStage ? (
            <Link href={`/contests/${contestId}/stages/${nextStage.id}`}>
              <Button type="default" color="gray">
                {nextStage.title ?? `Этап ${(nextStage.order ?? 0) + 1}`} →
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </SStageNav>
      )}
    </SWorkspacePage>
  );
};
