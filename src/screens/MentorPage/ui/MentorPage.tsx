"use client";

import Link from "next/link";
import { useState } from "react";

import {
  useCreateMentorCall,
  useCreateMentorComment,
  useGetMentorCalls,
  useGetMentorStageSubmission,
  useGetMentorTeams,
  useGetStageSubmissionMentorComments,
} from "@/entities/mentor";
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

export const MentorPage = () => {
  const teams = useGetMentorTeams();
  const calls = useGetMentorCalls();
  const createCall = useCreateMentorCall();
  const createComment = useCreateMentorComment();

  const [teamId, setTeamId] = useState(0);
  const [startsAt, setStartsAt] = useState("2026-05-10T10:00:00Z");
  const [endsAt, setEndsAt] = useState("2026-05-10T11:00:00Z");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [stageSubmissionId, setStageSubmissionId] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [actionResult, setActionResult] = useState<string | null>(null);

  const submission = useGetMentorStageSubmission(
    stageSubmissionId,
    !!stageSubmissionId,
  );
  const comments = useGetStageSubmissionMentorComments(
    stageSubmissionId,
    !!stageSubmissionId,
  );

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Кабинет ментора</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Команды ментора, календарь созвонов, чтение submission команды и
          комментарии к сдачам
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Мои команды</SPanelTitle>
          <SList>
            {(teams.data?.assignments ?? []).map((assignment) => (
              <SListItem key={assignment.id}>
                <div>
                  <SItemTitle>Команда #{assignment.teamId ?? "-"}</SItemTitle>
                  <SItemMeta>
                    Конкурс #{assignment.contestId ?? "-"} · Ментор #
                    {assignment.mentorId ?? "-"}
                  </SItemMeta>
                </div>
                {assignment.teamId && (
                  <Link href={`/teams/${assignment.teamId}/mentor`}>
                    <Button>Открыть</Button>
                  </Link>
                )}
              </SListItem>
            ))}
            {!(teams.data?.assignments ?? []).length && !teams.isPending && (
              <SPanelText>Назначений на команды нет</SPanelText>
            )}
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Созвон</SPanelTitle>
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
              Ссылка
              <SInput
                value={link}
                onChange={(event) => setLink(event.target.value)}
              />
            </SField>
            <SField>
              Начало
              <SInput
                value={startsAt}
                onChange={(event) => setStartsAt(event.target.value)}
              />
            </SField>
            <SField>
              Конец
              <SInput
                value={endsAt}
                onChange={(event) => setEndsAt(event.target.value)}
              />
            </SField>
          </SFormGrid>
          <SField>
            Заметки
            <STextarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={createCall.isPending}
              disabled={!teamId}
              onClick={() =>
                createCall.mutate(
                  {
                    teamId,
                    startsAt,
                    endsAt,
                    link: link.trim() || undefined,
                    notes: notes.trim() || undefined,
                  },
                  {
                    onSuccess: (data) => {
                      setActionResult(`Созвон создан: #${data.callId ?? "-"}`);
                    },
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Запланировать
            </Button>
          </SActions>
        </SWorkspacePanel>

        <SPanelWide>
          <SPanelTitle>Календарь созвонов</SPanelTitle>
          <SList>
            {(calls.data?.calls ?? []).map((call) => (
              <SListItem key={call.id}>
                <div>
                  <SItemTitle>Команда #{call.teamId ?? "-"}</SItemTitle>
                  <SItemMeta>
                    {formatDateTime(call.startsAt)} -{" "}
                    {formatDateTime(call.endsAt)} · {call.link ?? "-"}
                  </SItemMeta>
                </div>
                <SStatus>#{call.id ?? "-"}</SStatus>
              </SListItem>
            ))}
            {!(calls.data?.calls ?? []).length && !calls.isPending && (
              <SPanelText>Созвоны не запланированы</SPanelText>
            )}
          </SList>
        </SPanelWide>

        <SWorkspacePanel>
          <SPanelTitle>Submission команды</SPanelTitle>
          <SField>
            Этап submission ID
            <SInput
              type="number"
              value={stageSubmissionId}
              onChange={(event) =>
                setStageSubmissionId(Number(event.target.value))
              }
            />
          </SField>
          <SList>
            <SListItem>
              <div>
                <SItemTitle>
                  {submission.data?.stage?.title ??
                    `Submission #${stageSubmissionId || "-"}`}
                </SItemTitle>
                <SItemMeta>
                  Значений: {submission.data?.values?.length ?? 0}
                </SItemMeta>
              </div>
              <SStatus>{submission.data?.status ?? "-"}</SStatus>
            </SListItem>
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Комментарии</SPanelTitle>
          <SField>
            Новый комментарий
            <STextarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={createComment.isPending}
              disabled={!stageSubmissionId || !commentText.trim()}
              onClick={() =>
                createComment.mutate(
                  { stageSubmissionId, text: commentText.trim() },
                  {
                    onSuccess: (data) => {
                      setActionResult(
                        `Комментарий создан: #${data.commentId ?? "-"}`,
                      );
                    },
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Добавить
            </Button>
          </SActions>
          <SList>
            {(comments.data?.comments ?? []).map((comment) => (
              <SListItem key={comment.id}>
                <div>
                  <SItemTitle>{comment.text ?? "-"}</SItemTitle>
                  <SItemMeta>
                    Mentor #{comment.mentorId ?? "-"} ·{" "}
                    {formatDateTime(comment.createdAt)}
                  </SItemMeta>
                </div>
              </SListItem>
            ))}
          </SList>
          {actionResult && <SPanelText>{actionResult}</SPanelText>}
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
