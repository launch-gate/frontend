"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useGetProject } from "@/entities/project";
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
import { Button } from "@/shared/components";

export const ProjectPage = () => {
  const params = useParams<{ projectId?: string }>();
  const projectId = Number(params.projectId);
  const isProjectIdValid = Number.isFinite(projectId) && projectId > 0;
  const project = useGetProject(projectId, isProjectIdValid);

  const submissions = project.data?.stages ?? [];

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Проект #{isProjectIdValid ? projectId : "-"}</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Рабочее пространство участника или команды: данные проекта, этапы и
          текущий статус сдач.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Данные проекта</SPanelTitle>
          {!isProjectIdValid && (
            <SPanelText>В адресе нет корректного projectId.</SPanelText>
          )}
          {project.isError && <SPanelText>Не удалось загрузить проект.</SPanelText>}
          <SList>
            <SListItem>
              <div>
                <SItemTitle>Конкурс</SItemTitle>
                <SItemMeta>#{project.data?.contestId ?? "-"}</SItemMeta>
              </div>
            </SListItem>
            <SListItem>
              <div>
                <SItemTitle>Команда</SItemTitle>
                <SItemMeta>{project.data?.teamId ?? "Индивидуальный проект"}</SItemMeta>
              </div>
            </SListItem>
            <SListItem>
              <div>
                <SItemTitle>Владелец</SItemTitle>
                <SItemMeta>#{project.data?.ownerParticipantId ?? "-"}</SItemMeta>
              </div>
            </SListItem>
          </SList>
        </SWorkspacePanel>

        <SPanelWide>
          <SPanelTitle>Этапы проекта</SPanelTitle>
          <SList>
            {submissions.map((submission) => (
              <SListItem key={submission.id ?? submission.stage?.id}>
                <div>
                  <SItemTitle>
                    {submission.stage?.title ??
                      `Этап #${submission.stage?.id ?? "-"}`}
                  </SItemTitle>
                  <SItemMeta>
                    Submission #{submission.id ?? "-"} · Значений:{" "}
                    {submission.values?.length ?? 0}
                  </SItemMeta>
                </div>
                <div>
                  <SStatus>{submission.status ?? "DRAFT"}</SStatus>
                  {submission.stage?.id && (
                    <Link href={`/projects/${projectId}/stages/${submission.stage.id}`}>
                      <Button>Открыть</Button>
                    </Link>
                  )}
                </div>
              </SListItem>
            ))}
            {!submissions.length && !project.isPending && (
              <SPanelText>Для проекта пока нет этапов.</SPanelText>
            )}
          </SList>
        </SPanelWide>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
