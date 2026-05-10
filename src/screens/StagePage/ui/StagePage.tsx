"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useGetContestStage } from "@/entities/stage";
import { IFieldParticipantResponse, IResourceResponse } from "@/entities/stage";
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
  SFieldBadge,
  SFieldCard,
  SFieldExample,
  SFieldHeader,
  SFieldHint,
  SFieldMeta,
  SFieldTitle,
  SGrid,
  SMetaGrid,
  SMetaItem,
  SMetaLabel,
  SMetaValue,
  SResourceCard,
  SResourceDesc,
  SResourceLink,
  SResourceTitle,
} from "./stagePage.styles";

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

const resourceTypeLabels: Record<string, string> = {
  TEXT: "Описание",
  LINK: "Ссылка",
  FILE: "Файл",
};

const formatDateTime = (date?: string) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const FieldCard = ({ field }: { field: IFieldParticipantResponse }) => (
  <SFieldCard>
    <SFieldHeader>
      <SFieldTitle>{field.title ?? "Без названия"}</SFieldTitle>
      <div style={{ display: "flex", gap: 6 }}>
        <SFieldBadge>{fieldTypeLabels[field.type ?? ""] ?? field.type}</SFieldBadge>
        <SFieldBadge $required={field.required}>
          {field.required ? "Обязательно" : "Необязательно"}
        </SFieldBadge>
      </div>
    </SFieldHeader>
    {field.participantHint && <SFieldHint>💡 {field.participantHint}</SFieldHint>}
    {field.exampleValue && <SFieldExample>Пример: {field.exampleValue}</SFieldExample>}
    {field.fileFormats && (
      <SFieldMeta>Форматы: {field.fileFormats} · Макс. {field.maxFileSizeMb} МБ</SFieldMeta>
    )}
    {field.options && (() => {
      try {
        const opts: string[] = JSON.parse(field.options);
        return <SFieldMeta>Варианты: {opts.join(", ")}</SFieldMeta>;
      } catch {
        return null;
      }
    })()}
  </SFieldCard>
);

const ResourceCard = ({ resource }: { resource: IResourceResponse }) => (
  <SResourceCard>
    <SResourceTitle>
      {resourceTypeLabels[resource.type ?? ""] ?? resource.type}
      {resource.title ? ` · ${resource.title}` : ""}
    </SResourceTitle>
    {resource.description && <SResourceDesc>{resource.description}</SResourceDesc>}
    {resource.linkUrl && (
      <SResourceLink href={resource.linkUrl} target="_blank" rel="noopener noreferrer">
        {resource.linkUrl}
      </SResourceLink>
    )}
  </SResourceCard>
);

export const StagePage = () => {
  const params = useParams<{ contestId?: string; stageId?: string }>();
  const stageId = Number(params.stageId);
  const contestId = Number(params.contestId);
  const isValid = Number.isFinite(stageId) && stageId > 0;

  const stage = useGetContestStage(stageId, isValid);

  const fields = [...(stage.data?.fields ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const resources = [...(stage.data?.resources ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  if (!isValid) {
    return (
      <SWorkspacePage>
        <SWorkspaceHeader>
          <SWorkspaceTitle>Этап не найден</SWorkspaceTitle>
        </SWorkspaceHeader>
      </SWorkspacePage>
    );
  }

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href={`/contests/${contestId}`}>
            <Button type="text" color="gray">← Назад к конкурсу</Button>
          </Link>
        </div>
        <SWorkspaceTitle>
          {stage.data?.title ?? `Этап #${stageId}`}
        </SWorkspaceTitle>
        {stage.data?.description && (
          <SWorkspaceSubtitle>{stage.data.description}</SWorkspaceSubtitle>
        )}
      </SWorkspaceHeader>

      {stage.isError && (
        <SPanelText>Не удалось загрузить этап.</SPanelText>
      )}

      {stage.data && (
        <SWorkspaceGrid>
          {/* Основная информация */}
          <SWorkspacePanel>
            <SPanelTitle>Информация</SPanelTitle>
            <SMetaGrid>
              <SMetaItem>
                <SMetaLabel>Дедлайн</SMetaLabel>
                <SMetaValue>{formatDateTime(stage.data.deadlineAt)}</SMetaValue>
              </SMetaItem>
              <SMetaItem>
                <SMetaLabel>Шкала оценивания</SMetaLabel>
                <SMetaValue>
                  {stage.data.scoreScale
                    ? (scoreScaleLabels[stage.data.scoreScale] ?? stage.data.scoreScale)
                    : "—"}
                </SMetaValue>
              </SMetaItem>
              <SMetaItem>
                <SMetaLabel>Порядковый номер</SMetaLabel>
                <SMetaValue>Этап {(stage.data.order ?? 0) + 1}</SMetaValue>
              </SMetaItem>
              <SMetaItem>
                <SMetaLabel>Отборочный</SMetaLabel>
                <SMetaValue>{stage.data.eliminating ? "Да" : "Нет"}</SMetaValue>
              </SMetaItem>
            </SMetaGrid>
            {stage.data.rules && (
              <>
                <SPanelTitle style={{ marginTop: 8 }}>Правила</SPanelTitle>
                <SPanelText>{stage.data.rules}</SPanelText>
              </>
            )}
          </SWorkspacePanel>

          {/* Поля заявки */}
          <SWorkspacePanel>
            <SPanelTitle>
              Поля заявки ({fields.length})
            </SPanelTitle>
            {fields.length > 0 ? (
              <SGrid>
                {fields.map((field) => (
                  <FieldCard key={field.id} field={field} />
                ))}
              </SGrid>
            ) : (
              <SPanelText>Поля не заданы.</SPanelText>
            )}
          </SWorkspacePanel>

          {/* Материалы */}
          {resources.length > 0 && (
            <SWorkspacePanel>
              <SPanelTitle>Материалы ({resources.length})</SPanelTitle>
              <SGrid>
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </SGrid>
            </SWorkspacePanel>
          )}
        </SWorkspaceGrid>
      )}
    </SWorkspacePage>
  );
};
