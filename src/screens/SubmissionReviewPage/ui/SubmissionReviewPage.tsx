"use client";

import { useParams } from "next/navigation";

import { useGetOrganizerStageSubmission } from "@/entities/project";
import {
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

export const SubmissionReviewPage = () => {
  const params = useParams<{ submissionId?: string }>();
  const submissionId = Number(params.submissionId);
  const isSubmissionIdValid = Number.isFinite(submissionId) && submissionId > 0;
  const submission = useGetOrganizerStageSubmission(
    submissionId,
    isSubmissionIdValid,
  );

  const values = submission.data?.values ?? [];

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          Stage submission #{isSubmissionIdValid ? submissionId : "-"}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Организаторский просмотр сдачи: данные этапа, статус и сохранённые
          значения формы.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Сводка</SPanelTitle>
          {!isSubmissionIdValid && (
            <SPanelText>В адресе нет корректного submissionId.</SPanelText>
          )}
          {submission.isError && <SPanelText>Не удалось загрузить submission.</SPanelText>}
          <SList>
            <SListItem>
              <div>
                <SItemTitle>
                  {submission.data?.stage?.title ??
                    `Этап #${submission.data?.stage?.id ?? "-"}`}
                </SItemTitle>
                <SItemMeta>
                  Полей: {submission.data?.stage?.fields?.length ?? 0} · Значений:{" "}
                  {values.length}
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
