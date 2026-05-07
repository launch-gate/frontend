"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import {
  ContestStatus,
  ParticipationMode,
  useGetContest,
  useGetContestParticipants,
  useRegisterContest,
} from "@/entities/contest";
import { useCreateProject } from "@/entities/project";
import { useGetContestStages } from "@/entities/stage";
import {
  useCreateContestTeam,
  useGetContestTeams,
  useJoinTeamByInvite,
  useRegisterTeamContest,
  useRequestJoinTeam,
} from "@/entities/team";
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

const statusLabels: Record<ContestStatus, string> = {
  DRAFT: "Черновик",
  FINISHED: "Завершён",
  PUBLISHED: "Опубликован",
  RUNNING: "Идёт",
};

const participationModeLabels: Record<ParticipationMode, string> = {
  INDIVIDUAL: "Индивидуальный конкурс",
  TEAM: "Командный конкурс",
};

const formatDate = (date?: string) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

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

export const ContestPublicPage = () => {
  const params = useParams<{ contestId?: string; id?: string }>();
  const contestId = Number(params.contestId ?? params.id);
  const isContestIdValid = Number.isFinite(contestId) && contestId > 0;

  const contest = useGetContest(contestId);
  const stages = useGetContestStages(contestId, isContestIdValid);
  const participants = useGetContestParticipants(contestId, isContestIdValid);
  const teams = useGetContestTeams(contestId, isContestIdValid);
  const registerContest = useRegisterContest();
  const registerTeamContest = useRegisterTeamContest();
  const createTeam = useCreateContestTeam();
  const joinByInvite = useJoinTeamByInvite();
  const requestJoin = useRequestJoinTeam();
  const createProject = useCreateProject();

  const [teamName, setTeamName] = useState("");
  const [inviteToken, setInviteToken] = useState("");
  const [teamId, setTeamId] = useState(0);
  const [actionResult, setActionResult] = useState<string | null>(null);

  const stageList = useMemo(
    () =>
      [...(stages.data?.stages ?? [])].sort(
        (stageA, stageB) => (stageA.order ?? 0) - (stageB.order ?? 0),
      ),
    [stages.data?.stages],
  );
  const participantList = participants.data?.participants ?? [];
  const teamList = teams.data?.teams ?? [];
  const isTeamContest = contest.data?.participationMode === "TEAM";

  const handleError = (error: Error) => {
    setActionResult(error.message || "Запрос завершился ошибкой.");
  };

  if (!isContestIdValid) {
    return (
      <SWorkspacePage>
        <SWorkspaceHeader>
          <SWorkspaceTitle>Конкурс не найден</SWorkspaceTitle>
          <SWorkspaceSubtitle>
            В адресе страницы нет корректного идентификатора конкурса.
          </SWorkspaceSubtitle>
        </SWorkspaceHeader>
      </SWorkspacePage>
    );
  }

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          {contest.data?.title ?? `Конкурс #${contestId}`}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          {contest.data?.description ??
            "Публичная страница конкурса: регистрация, этапы, участники и команды."}
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SPanelWide>
          <SPanelTitle>О конкурсе</SPanelTitle>
          {contest.isError ? (
            <SPanelText>Не удалось загрузить конкурс.</SPanelText>
          ) : (
            <>
              <SList>
                <SListItem>
                  <div>
                    <SItemTitle>
                      {contest.data?.participationMode
                        ? participationModeLabels[
                            contest.data.participationMode
                          ]
                        : "Формат участия не указан"}
                    </SItemTitle>
                    <SItemMeta>
                      Регистрация до {formatDate(contest.data?.registrationEndsAt)}
                      {" · "}
                      Командообразование до{" "}
                      {formatDate(contest.data?.teamBuildingEndsAt)}
                    </SItemMeta>
                  </div>
                  <SStatus>
                    {contest.data?.status
                      ? statusLabels[contest.data.status]
                      : "Статус неизвестен"}
                  </SStatus>
                </SListItem>
                <SListItem>
                  <div>
                    <SItemTitle>Сроки проведения</SItemTitle>
                    <SItemMeta>
                      {formatDate(contest.data?.startsAt)} -{" "}
                      {formatDate(contest.data?.endsAt)}
                    </SItemMeta>
                  </div>
                  <SStatus>#{contest.data?.id ?? contestId}</SStatus>
                </SListItem>
              </SList>
              <SPanelText>
                Контакты организатора: {contest.data?.contacts || "-"}
              </SPanelText>
            </>
          )}
        </SPanelWide>

        <SWorkspacePanel>
          <SPanelTitle>Участие</SPanelTitle>
          <SPanelText>
            Для индивидуального конкурса доступна прямая регистрация. Для
            командного можно создать команду, войти по invite token или
            отправить запрос на вступление.
          </SPanelText>
          {isTeamContest && (
            <>
              <SFormGrid>
                <SField>
                  Название команды
                  <SInput
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                  />
                </SField>
                <SField>
                  Team ID
                  <SInput
                    type="number"
                    value={teamId}
                    onChange={(event) => setTeamId(Number(event.target.value))}
                  />
                </SField>
              </SFormGrid>
              <SField>
                Invite token
                <SInput
                  value={inviteToken}
                  onChange={(event) => setInviteToken(event.target.value)}
                />
              </SField>
            </>
          )}
          <SActions>
            <Button
              color="violet"
              loading={registerContest.isPending}
              onClick={() =>
                registerContest.mutate(
                  { contestId },
                  {
                    onSuccess: (data) => {
                      setActionResult(
                        `Регистрация создана: #${data.registrationId ?? "-"}`,
                      );
                    },
                    onError: handleError,
                  },
                )
              }
            >
              Зарегистрироваться
            </Button>
            {isTeamContest && (
              <>
                <Button
                  loading={registerTeamContest.isPending}
                  onClick={() =>
                    registerTeamContest.mutate(
                      { contestId },
                      {
                        onSuccess: (data) => {
                          setActionResult(
                            `Командная регистрация создана: #${
                              data.registrationId ?? "-"
                            }`,
                          );
                        },
                        onError: handleError,
                      },
                    )
                  }
                >
                  Регистрация команды
                </Button>
                <Button
                  color="gray"
                  loading={createTeam.isPending}
                  disabled={!teamName.trim()}
                  onClick={() =>
                    createTeam.mutate(
                      { contestId, data: { name: teamName.trim() } },
                      {
                        onSuccess: (data) => {
                          setActionResult(
                            `Команда создана: #${data.id ?? "-"}`,
                          );
                        },
                        onError: handleError,
                      },
                    )
                  }
                >
                  Создать команду
                </Button>
                <Button
                  color="gray"
                  loading={requestJoin.isPending}
                  disabled={!teamId}
                  onClick={() =>
                    requestJoin.mutate(
                      { teamId },
                      {
                        onSuccess: (data) =>
                          setActionResult(
                            `Запрос на вступление: #${
                              data.joinRequestId ?? "-"
                            }`,
                          ),
                        onError: handleError,
                      },
                    )
                  }
                >
                  Запрос на вход
                </Button>
                <Button
                  color="gray"
                  loading={joinByInvite.isPending}
                  disabled={!inviteToken.trim()}
                  onClick={() =>
                    joinByInvite.mutate(
                      { inviteToken: inviteToken.trim() },
                      {
                        onSuccess: (data) => {
                          setActionResult(
                            `Вы присоединились к команде #${data.id ?? "-"}`,
                          );
                        },
                        onError: handleError,
                      },
                    )
                  }
                >
                  Войти по invite
                </Button>
              </>
            )}
            <Button
              color="gray"
              loading={createProject.isPending}
              onClick={() =>
                createProject.mutate(
                  {
                    contestId,
                    teamId: isTeamContest && teamId ? teamId : undefined,
                  },
                  {
                    onSuccess: (data) =>
                      setActionResult(`Проект создан: #${data.id ?? "-"}`),
                    onError: handleError,
                  },
                )
              }
            >
              Создать проект
            </Button>
          </SActions>
          {actionResult && <SPanelText>{actionResult}</SPanelText>}
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Этапы</SPanelTitle>
          <SList>
            {stageList.map((stage) => (
              <SListItem key={stage.id}>
                <div>
                  <SItemTitle>
                    {stage.title ?? `Этап #${stage.id ?? "-"} `}
                  </SItemTitle>
                  <SItemMeta>
                    Дедлайн: {formatDateTime(stage.deadlineAt)} · Полей:{" "}
                    {stage.fields?.length ?? 0} · Ресурсов:{" "}
                    {stage.resources?.length ?? 0}
                  </SItemMeta>
                </div>
                <SStatus>{stage.scoreScale ?? "-"}</SStatus>
              </SListItem>
            ))}
            {!stageList.length && !stages.isPending && (
              <SPanelText>Этапы ещё не опубликованы.</SPanelText>
            )}
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Участники</SPanelTitle>
          <SList>
            {participantList.map((participant) => (
              <SListItem key={participant.userId}>
                <div>
                  <SItemTitle>
                    {participant.fullName ??
                      `Участник #${participant.userId ?? "-"}`}
                  </SItemTitle>
                  <SItemMeta>
                    {participant.nickname ?? "-"} ·{" "}
                    {formatDateTime(participant.registeredAt)}
                  </SItemMeta>
                </div>
              </SListItem>
            ))}
            {!participantList.length && !participants.isPending && (
              <SPanelText>Пока нет зарегистрированных участников.</SPanelText>
            )}
          </SList>
        </SWorkspacePanel>

        {isTeamContest && (
          <SWorkspacePanel>
            <SPanelTitle>Команды</SPanelTitle>
            <SList>
              {teamList.map((team) => (
                <SListItem key={team.id}>
                  <div>
                    <SItemTitle>
                      {team.name ?? `Команда #${team.id ?? "-"}`}
                    </SItemTitle>
                    <SItemMeta>
                      Leader: {team.leaderId ?? "-"} · Участников:{" "}
                      {team.memberIds?.length ?? 0}
                    </SItemMeta>
                  </div>
                  <SStatus>#{team.id ?? "-"}</SStatus>
                </SListItem>
              ))}
              {!teamList.length && !teams.isPending && (
                <SPanelText>Команды ещё не созданы.</SPanelText>
              )}
            </SList>
          </SWorkspacePanel>
        )}
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
