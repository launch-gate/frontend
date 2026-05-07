"use client";

import Link from "next/link";
import { useState } from "react";

import { useAssignExpert, useCreateAiReview } from "@/entities/evaluation";
import { useAssignMentor } from "@/entities/mentor";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";
import {
  SActions,
  SField,
  SFormGrid,
  SInput,
  SPanelText,
  SPanelTitle,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

export const OrganizerEvaluationsPage = () => {
  const assignExpert = useAssignExpert();
  const createAiReview = useCreateAiReview();
  const assignMentor = useAssignMentor();

  const [submissionId, setSubmissionId] = useState(0);
  const [expertUserId, setExpertUserId] = useState(0);
  const [aiSubmissionId, setAiSubmissionId] = useState(0);
  const [teamId, setTeamId] = useState(0);
  const [mentorUserId, setMentorUserId] = useState(0);
  const [actionResult, setActionResult] = useState<string | null>(null);

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Назначения экспертов и менторов</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Панель организатора для назначения экспертов на submission, запуска AI
          review и назначения менторов на команды.
        </SWorkspaceSubtitle>
        <SActions>
          <Link href={routes.ORGANIZER_PAGE}>
            <Button>Конкурсы</Button>
          </Link>
          <Link href={routes.EXPERT_PAGE}>
            <Button>Кабинет эксперта</Button>
          </Link>
          <Link href={routes.MENTOR_PAGE}>
            <Button>Кабинет ментора</Button>
          </Link>
        </SActions>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Эксперт на submission</SPanelTitle>
          <SFormGrid>
            <SField>
              Submission ID
              <SInput
                type="number"
                value={submissionId}
                onChange={(event) => setSubmissionId(Number(event.target.value))}
              />
            </SField>
            <SField>
              Expert user ID
              <SInput
                type="number"
                value={expertUserId}
                onChange={(event) => setExpertUserId(Number(event.target.value))}
              />
            </SField>
          </SFormGrid>
          <SActions>
            <Button
              color="violet"
              loading={assignExpert.isPending}
              disabled={!submissionId || !expertUserId}
              onClick={() =>
                assignExpert.mutate(
                  { submissionId, expertUserId },
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
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>AI review</SPanelTitle>
          <SField>
            Submission ID
            <SInput
              type="number"
              value={aiSubmissionId}
              onChange={(event) => setAiSubmissionId(Number(event.target.value))}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={createAiReview.isPending}
              disabled={!aiSubmissionId}
              onClick={() =>
                createAiReview.mutate(
                  { submissionId: aiSubmissionId },
                  {
                    onSuccess: (data) =>
                      setActionResult(`AI review создан: #${data.aiReviewId ?? "-"}`),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Запустить
            </Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Ментор на команду</SPanelTitle>
          <SFormGrid>
            <SField>
              Team ID
              <SInput
                type="number"
                value={teamId}
                onChange={(event) => setTeamId(Number(event.target.value))}
              />
            </SField>
            <SField>
              Mentor user ID
              <SInput
                type="number"
                value={mentorUserId}
                onChange={(event) => setMentorUserId(Number(event.target.value))}
              />
            </SField>
          </SFormGrid>
          <SActions>
            <Button
              color="violet"
              loading={assignMentor.isPending}
              disabled={!teamId || !mentorUserId}
              onClick={() =>
                assignMentor.mutate(
                  { teamId, mentorUserId },
                  {
                    onSuccess: (data) =>
                      setActionResult(`Ментор назначен: #${data.id ?? "-"}`),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Назначить
            </Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Результат</SPanelTitle>
          <SPanelText>{actionResult ?? "Действий пока не было."}</SPanelText>
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
