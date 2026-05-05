"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { useSaveProjectStageValue, useSubmitProjectStage } from "@/entities/project";
import {
  useGetContestStage,
  useGetContestStageFields,
  useGetStageResources,
} from "@/entities/stage";
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

const formatDateTime = (date?: string) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const StageSubmissionPage = () => {
  const params = useParams<{ projectId?: string; stageId?: string }>();
  const projectId = Number(params.projectId);
  const stageId = Number(params.stageId);
  const isValid = [projectId, stageId].every(
    (value) => Number.isFinite(value) && value > 0,
  );

  const stage = useGetContestStage(stageId, isValid);
  const fields = useGetContestStageFields(stageId, isValid);
  const resources = useGetStageResources(stageId, isValid);
  const saveValue = useSaveProjectStageValue();
  const submitStage = useSubmitProjectStage();

  const [fieldId, setFieldId] = useState(0);
  const [valueText, setValueText] = useState("");
  const [fileIds, setFileIds] = useState("");
  const [actionResult, setActionResult] = useState<string | null>(null);

  const fieldList = useMemo(
    () => [...(fields.data?.fields ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [fields.data?.fields],
  );
  const selectedFieldId = fieldId || fieldList[0]?.id || 0;

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          Сдача этапа {stage.data?.title ?? `#${stageId || "-"}`}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Форма участника: поля этапа, ресурсы, сохранение draft-значений и
          финальная отправка.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Этап</SPanelTitle>
          {!isValid && <SPanelText>В адресе нет корректных projectId/stageId.</SPanelText>}
          <SList>
            <SListItem>
              <div>
                <SItemTitle>{stage.data?.title ?? "Этап"}</SItemTitle>
                <SItemMeta>
                  Дедлайн: {formatDateTime(stage.data?.deadlineAt)} · Полей:{" "}
                  {fieldList.length}
                </SItemMeta>
              </div>
              <SStatus>{stage.data?.scoreScale ?? "-"}</SStatus>
            </SListItem>
          </SList>
          {stage.data?.description && <SPanelText>{stage.data.description}</SPanelText>}
          {stage.data?.rules && <SPanelText>{stage.data.rules}</SPanelText>}
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Сохранить значение</SPanelTitle>
          <SFormGrid>
            <SField>
              Поле
              <SSelect
                value={selectedFieldId}
                onChange={(event) => setFieldId(Number(event.target.value))}
              >
                {fieldList.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.title ?? `Поле #${field.id}`}
                  </option>
                ))}
              </SSelect>
            </SField>
            <SField>
              File IDs
              <SInput
                value={fileIds}
                onChange={(event) => setFileIds(event.target.value)}
                placeholder="55,56"
              />
            </SField>
          </SFormGrid>
          <SField>
            Текстовое значение
            <STextarea
              value={valueText}
              onChange={(event) => setValueText(event.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={saveValue.isPending}
              disabled={!selectedFieldId}
              onClick={() =>
                saveValue.mutate(
                  {
                    projectId,
                    stageId,
                    data: {
                      fieldId: selectedFieldId,
                      valueText: valueText.trim() || undefined,
                      fileIds: fileIds.trim() || undefined,
                    },
                  },
                  {
                    onSuccess: (data) =>
                      setActionResult(`Draft сохранён: #${data.id ?? "-"}`),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Сохранить draft
            </Button>
            <Button
              loading={submitStage.isPending}
              onClick={() =>
                submitStage.mutate(
                  { projectId, stageId },
                  {
                    onSuccess: (data) =>
                      setActionResult(`Submission отправлен: #${data.id ?? "-"}`),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Отправить
            </Button>
          </SActions>
          {actionResult && <SPanelText>{actionResult}</SPanelText>}
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Поля формы</SPanelTitle>
          <SList>
            {fieldList.map((field) => (
              <SListItem key={field.id}>
                <div>
                  <SItemTitle>{field.title ?? `Поле #${field.id}`}</SItemTitle>
                  <SItemMeta>
                    {field.type ?? "-"} · {field.required ? "обязательное" : "необязательное"}
                  </SItemMeta>
                </div>
                <SStatus>#{field.id ?? "-"}</SStatus>
              </SListItem>
            ))}
            {!fieldList.length && !fields.isPending && (
              <SPanelText>Поля формы ещё не настроены.</SPanelText>
            )}
          </SList>
        </SWorkspacePanel>

        <SPanelWide>
          <SPanelTitle>Ресурсы этапа</SPanelTitle>
          <SList>
            {(resources.data?.resources ?? []).map((resource) => (
              <SListItem key={resource.id}>
                <div>
                  <SItemTitle>{resource.title ?? `Ресурс #${resource.id}`}</SItemTitle>
                  <SItemMeta>
                    {resource.type ?? "-"} · {resource.description ?? resource.linkUrl ?? "-"}
                  </SItemMeta>
                </div>
                <SStatus>#{resource.id ?? "-"}</SStatus>
              </SListItem>
            ))}
            {!(resources.data?.resources ?? []).length && !resources.isPending && (
              <SPanelText>Ресурсы не добавлены.</SPanelText>
            )}
          </SList>
        </SPanelWide>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
