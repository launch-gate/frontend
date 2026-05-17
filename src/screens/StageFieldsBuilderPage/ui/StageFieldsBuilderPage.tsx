"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  SubmissionFieldType,
  normalizeFileFormats,
  useCreateStageField,
  useDeleteStageField,
  useGetOrganizerFieldFormats,
  useGetOrganizerStageFields,
  useGetOrganizerContestStages,
  useGetOrganizerStage,
  useUpdateStageField,
} from "@/entities/stage";
import { useGetContest } from "@/entities/contest";
import { useBreadcrumbStore } from "@/widgets/Breadcrumb";
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
  SRequiredMark,
  SSelect,
  SStatus,
  STextarea,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";
import { SStageNav } from "@/screens/AppWorkspace/ui/workspace.styles";

const FIELD_TYPE_LABELS: Partial<Record<SubmissionFieldType, string>> = {
  TEXT: "Текст",
  LINK: "Ссылка",
  GITHUB_REPOSITORY: "GitHub репозиторий",
  NUMBER: "Число",
  FILE: "Файл",
  FILES: "Несколько файлов",
  PHOTO: "Фото",
  VIDEO: "Видео",
};

const UPLOAD_TYPES: SubmissionFieldType[] = ["FILE", "FILES", "PHOTO", "VIDEO"];

const isUploadField = (type: SubmissionFieldType) =>
  UPLOAD_TYPES.includes(type);

const emptyForm = () => ({
  title: "",
  type: "TEXT" as SubmissionFieldType,
  required: false,
  participantHint: "",
  exampleValue: "",
  expertNote: "",
  criteriaDescription: "",
  fileFormats: "",
  maxFileSizeMb: "",
});

export const StageFieldsBuilderPage = () => {
  const params = useParams<{ contestId?: string; stageId?: string }>();
  const contestId = Number(params.contestId);
  const stageId = Number(params.stageId);
  const isStageIdValid = Number.isFinite(stageId) && stageId > 0;

  const fields = useGetOrganizerStageFields(stageId);
  const formats = useGetOrganizerFieldFormats();
  const stage = useGetOrganizerStage(stageId);
  const contest = useGetContest(contestId);
  const allStages = useGetOrganizerContestStages(contestId);

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
  const createField = useCreateStageField();
  const updateField = useUpdateStageField();
  const deleteField = useDeleteStageField();

  const [form, setForm] = useState(emptyForm());
  const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
  const [actionResult, setActionResult] = useState<string | null>(null);

  const formatsByCategory = (formats.data?.formats ?? []).reduce<
    Record<string, string[]>
  >((acc, item) => {
    const cat = item.category ?? "Другие";
    if (!acc[cat]) acc[cat] = [];
    if (item.format) acc[cat].push(item.format);
    return acc;
  }, {});

  const startEdit = (fieldId: number) => {
    const field = (fields.data?.fields ?? []).find((f) => f.id === fieldId);
    if (!field) return;
    setEditingFieldId(fieldId);
    setForm({
      title: field.title ?? "",
      type: (field.type as SubmissionFieldType) ?? "TEXT",
      required: field.required ?? false,
      participantHint: field.participantHint ?? "",
      exampleValue: field.exampleValue ?? "",
      expertNote: field.expertNote ?? "",
      criteriaDescription: field.criteriaDescription ?? "",
      fileFormats: normalizeFileFormats(field.fileFormats) ?? "",
      maxFileSizeMb: field.maxFileSizeMb ? String(field.maxFileSizeMb) : "",
    });
  };

  const resetForm = () => {
    setEditingFieldId(null);
    setForm(emptyForm());
    setActionResult(null);
  };

  useEffect(() => {
    if (!editingFieldId) return;
    const field = (fields.data?.fields ?? []).find(
      (f) => f.id === editingFieldId,
    );
    if (!field) resetForm();
  }, [fields.data]);

  const buildData = () => ({
    title: form.title.trim(),
    type: form.type,
    required: form.required,
    participantHint: form.participantHint.trim() || undefined,
    exampleValue: form.exampleValue.trim() || undefined,
    expertNote: form.expertNote.trim() || undefined,
    criteriaDescription: form.criteriaDescription.trim() || undefined,
    fileFormats:
      isUploadField(form.type) && form.fileFormats.trim()
        ? form.fileFormats.trim()
        : undefined,
    maxFileSizeMb:
      isUploadField(form.type) && form.maxFileSizeMb
        ? Number(form.maxFileSizeMb)
        : undefined,
  });

  const handleSave = () => {
    if (!form.title.trim()) return;

    if (editingFieldId) {
      updateField.mutate(
        { stageId, fieldId: editingFieldId, data: buildData() },
        {
          onSuccess: () => {
            setActionResult("Поле обновлено.");
            resetForm();
          },
          onError: (e) => setActionResult(e.message),
        },
      );
    } else {
      createField.mutate(
        { stageId, data: buildData() },
        {
          onSuccess: (data) => {
            setActionResult(`Поле создано: #${data.id ?? "-"}`);
            resetForm();
          },
          onError: (e) => setActionResult(e.message),
        },
      );
    }
  };

  const handleDelete = (fieldId: number) => {
    deleteField.mutate(
      { stageId, fieldId },
      {
        onSuccess: () => setActionResult(`Поле #${fieldId} удалено.`),
        onError: (e) => setActionResult(e.message),
      },
    );
    if (editingFieldId === fieldId) resetForm();
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          Поля этапа{" "}
          {stage.data?.title
            ? `«${stage.data.title}»`
            : `#${isStageIdValid ? stageId : "-"}`}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Создание, редактирование и удаление полей формы сабмишена
        </SWorkspaceSubtitle>
        <SWorkspaceSubtitle>
          Настройка подсказок, критериев оценки и допустимых форматов файлов
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>
            {editingFieldId
              ? `Редактировать поле #${editingFieldId}`
              : "Новое поле"}
          </SPanelTitle>
          <SFormGrid>
            <SField>
              <span>
                Название <SRequiredMark>*</SRequiredMark>
              </span>
              <SInput
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={"Название поля"}
              />
            </SField>
            <SField>
              <span>
                Тип <SRequiredMark>*</SRequiredMark>
              </span>
              <SSelect
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as SubmissionFieldType,
                  })
                }
              >
                {(Object.keys(FIELD_TYPE_LABELS) as SubmissionFieldType[]).map(
                  (t) => (
                    <option key={t} value={t}>
                      {FIELD_TYPE_LABELS[t]}
                    </option>
                  ),
                )}
              </SSelect>
            </SField>
            <SField>
              <span>
                Обязательное <SRequiredMark>*</SRequiredMark>
              </span>
              <SSelect
                value={form.required ? "true" : "false"}
                onChange={(e) =>
                  setForm({ ...form, required: e.target.value === "true" })
                }
              >
                <option value="false">Нет</option>
                <option value="true">Да</option>
              </SSelect>
            </SField>
            <SField>
              Подсказка участнику
              <SInput
                value={form.participantHint}
                onChange={(e) =>
                  setForm({ ...form, participantHint: e.target.value })
                }
                placeholder="Текст под полем"
              />
            </SField>
          </SFormGrid>
          <SField>
            Пример значения
            <SInput
              value={form.exampleValue}
              onChange={(e) =>
                setForm({ ...form, exampleValue: e.target.value })
              }
              placeholder="Например: https://github.com/..."
            />
          </SField>
          <SField>
            Заметка для эксперта
            <STextarea
              value={form.expertNote}
              onChange={(e) => setForm({ ...form, expertNote: e.target.value })}
              placeholder="Видна только организатору и экспертам"
            />
          </SField>
          <SField>
            Критерии проверки
            <STextarea
              value={form.criteriaDescription}
              onChange={(e) =>
                setForm({ ...form, criteriaDescription: e.target.value })
              }
              placeholder="Описание критериев"
            />
          </SField>

          {isUploadField(form.type) && (
            <SFormGrid>
              <SField>
                Допустимые форматы (через запятую)
                <SInput
                  value={form.fileFormats}
                  onChange={(e) =>
                    setForm({ ...form, fileFormats: e.target.value })
                  }
                  placeholder="PDF,DOCX,JPG"
                />
              </SField>
              <SField>
                Макс. размер файла (МБ)
                <SInput
                  type="number"
                  value={form.maxFileSizeMb}
                  onChange={(e) =>
                    setForm({ ...form, maxFileSizeMb: e.target.value })
                  }
                  placeholder="10"
                />
              </SField>
            </SFormGrid>
          )}

          {isUploadField(form.type) &&
            (formats.data?.formats ?? []).length > 0 && (
              <SField>
                Доступные форматы
                <SList>
                  {Object.entries(formatsByCategory).map(([cat, fmts]) => (
                    <SListItem key={cat}>
                      <div>
                        <SItemTitle>{cat}</SItemTitle>
                        <SItemMeta>{fmts.join(", ")}</SItemMeta>
                      </div>
                    </SListItem>
                  ))}
                </SList>
              </SField>
            )}

          <SActions>
            <Button
              color="violet"
              loading={createField.isPending || updateField.isPending}
              disabled={!form.title.trim() || !isStageIdValid}
              onClick={handleSave}
            >
              {editingFieldId ? "Сохранить" : "Добавить поле"}
            </Button>
            {editingFieldId && (
              <Button type="text" color="gray" onClick={resetForm}>
                Отмена
              </Button>
            )}
          </SActions>
          {actionResult && <SPanelText>{actionResult}</SPanelText>}
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>
            Поля этапа ({fields.data?.fields?.length ?? 0})
          </SPanelTitle>
          {!isStageIdValid && (
            <SPanelText>В адресе нет корректного stageId.</SPanelText>
          )}
          <SList>
            {(fields.data?.fields ?? []).map((field) => (
              <SListItem key={field.id}>
                <div>
                  <SItemTitle>
                    {field.title ?? `Поле #${field.id}`}
                    {field.required && <SRequiredMark> *</SRequiredMark>}
                  </SItemTitle>
                  <SItemMeta>
                    {FIELD_TYPE_LABELS[field.type as SubmissionFieldType] ??
                      field.type}
                    {field.fileFormats
                      ? ` · ${normalizeFileFormats(field.fileFormats)}`
                      : ""}
                    {field.maxFileSizeMb
                      ? ` · max ${field.maxFileSizeMb}MB`
                      : ""}
                  </SItemMeta>
                  {field.type === "SELECT" &&
                    field.options &&
                    typeof field.options === "string" && (
                      <SItemMeta>Варианты: {field.options}</SItemMeta>
                    )}
                  {field.participantHint && (
                    <SItemMeta>Подсказка: {field.participantHint}</SItemMeta>
                  )}
                  {field.expertNote && (
                    <SItemMeta>Заметка эксперта: {field.expertNote}</SItemMeta>
                  )}
                  {field.criteriaDescription && (
                    <SItemMeta>Критерии: {field.criteriaDescription}</SItemMeta>
                  )}
                </div>
                <SActions>
                  <SStatus>#{field.id}</SStatus>
                  <Button
                    type="text"
                    onClick={() => field.id && startEdit(field.id)}
                  >
                    Изменить
                  </Button>
                  <Button
                    type="text"
                    color="gray"
                    loading={deleteField.isPending}
                    onClick={() => field.id && handleDelete(field.id)}
                  >
                    Удалить
                  </Button>
                </SActions>
              </SListItem>
            ))}
            {!(fields.data?.fields ?? []).length && !fields.isPending && (
              <SPanelText>
                Полей пока нет. Добавьте первое поле выше.
              </SPanelText>
            )}
          </SList>
        </SWorkspacePanel>
      </SWorkspaceGrid>

      {(() => {
        const sortedStages = [...(allStages.data?.stages ?? [])].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        );
        const currentIndex = sortedStages.findIndex((s) => s.id === stageId);
        const prevStage =
          currentIndex > 0 ? sortedStages[currentIndex - 1] : null;
        const nextStage =
          currentIndex >= 0 && currentIndex < sortedStages.length - 1
            ? sortedStages[currentIndex + 1]
            : null;
        const backHref = `/organizer/contests/${contestId}?tab=stages`;

        return (
          <SStageNav>
            {prevStage ? (
              <Link
                href={`/organizer/contests/${contestId}/stages/${prevStage.id}/fields`}
              >
                <Button color="gray">
                  ← {prevStage.title ?? `Этап ${(prevStage.order ?? 0) + 1}`}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            <Link href={backHref}>
              <Button color="gray">Назад к этапам</Button>
            </Link>
            {nextStage ? (
              <Link
                href={`/organizer/contests/${contestId}/stages/${nextStage.id}/fields`}
              >
                <Button color="gray">
                  {nextStage.title ?? `Этап ${(nextStage.order ?? 0) + 1}`} →
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </SStageNav>
        );
      })()}
    </SWorkspacePage>
  );
};
