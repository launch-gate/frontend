"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

import {
  useGetStageSubmissionMentorComments,
  useGetTeamMentorCalls,
} from "@/entities/mentor";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";
import {
  SActions,
  SField,
  SInput,
  SItemMeta,
  SItemTitle,
  SList,
  SListItem,
  SPanelText,
  SPanelTitle,
  SStatus,
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

export const TeamMentorPage = () => {
  const params = useParams<{ teamId?: string }>();
  const teamId = Number(params.teamId);
  const isTeamIdValid = Number.isFinite(teamId) && teamId > 0;
  const calls = useGetTeamMentorCalls(teamId, isTeamIdValid);

  const [stageSubmissionId, setStageSubmissionId] = useState(0);
  const comments = useGetStageSubmissionMentorComments(
    stageSubmissionId,
    !!stageSubmissionId,
  );

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Команда #{isTeamIdValid ? teamId : "-"}</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Созвоны команды с ментором и комментарии ментора по stage submission.
        </SWorkspaceSubtitle>
        <SActions>
          <Link href={routes.MENTOR_PAGE}>
            <Button>Кабинет ментора</Button>
          </Link>
        </SActions>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Созвоны</SPanelTitle>
          {!isTeamIdValid && <SPanelText>В адресе нет корректного teamId.</SPanelText>}
          <SList>
            {(calls.data?.calls ?? []).map((call) => (
              <SListItem key={call.id}>
                <div>
                  <SItemTitle>{call.link ?? `Созвон #${call.id}`}</SItemTitle>
                  <SItemMeta>
                    {formatDateTime(call.startsAt)} - {formatDateTime(call.endsAt)}
                  </SItemMeta>
                </div>
                <SStatus>#{call.id ?? "-"}</SStatus>
              </SListItem>
            ))}
            {!(calls.data?.calls ?? []).length && !calls.isPending && (
              <SPanelText>Созвоны не найдены.</SPanelText>
            )}
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Комментарии к submission</SPanelTitle>
          <SField>
            Stage submission ID
            <SInput
              type="number"
              value={stageSubmissionId}
              onChange={(event) => setStageSubmissionId(Number(event.target.value))}
            />
          </SField>
          <SList>
            {(comments.data?.comments ?? []).map((comment) => (
              <SListItem key={comment.id}>
                <div>
                  <SItemTitle>{comment.text ?? "-"}</SItemTitle>
                  <SItemMeta>
                    Mentor #{comment.mentorId ?? "-"} · {formatDateTime(comment.createdAt)}
                  </SItemMeta>
                </div>
              </SListItem>
            ))}
            {!(comments.data?.comments ?? []).length &&
              !!stageSubmissionId &&
              !comments.isPending && (
                <SPanelText>Комментариев для этой сдачи нет.</SPanelText>
              )}
          </SList>
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
