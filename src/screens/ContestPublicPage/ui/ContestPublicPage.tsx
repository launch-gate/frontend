"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import {
  useGetContest,
  useGetContestParticipants,
  useRegisterContest,
} from "@/entities/contest";
import { useCreateProject } from "@/entities/project";
import {
  useCreateContestTeam,
  useGetContestTeams,
  useJoinTeamByInvite,
  useRegisterTeamContest,
  useRequestJoinTeam,
} from "@/entities/team";
import { useGetContestStages } from "@/entities/stage";
import { Button } from "@/shared/components";
import {
  SActions,
  SDataBox,
  SField,
  SFormGrid,
  SInput,
  SItemMeta,
  SItemTitle,
  SList,
  SListItem,
  SPanelTitle,
  SStatus,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

export const ContestPublicPage = () => {
  const params = useParams();
  const contestId = Number(params.contestId);

  const contest = useGetContest(contestId);
  const stages = useGetContestStages(contestId);
  const participants = useGetContestParticipants(contestId);
  const teams = useGetContestTeams(contestId);
  const registerContest = useRegisterContest();
  const registerTeamContest = useRegisterTeamContest();
  const createTeam = useCreateContestTeam();
  const joinByInvite = useJoinTeamByInvite();
  const requestJoin = useRequestJoinTeam();
  const createProject = useCreateProject();

  const [teamName, setTeamName] = useState("Rocket Team");
  const [inviteToken, setInviteToken] = useState("");
  const [teamId, setTeamId] = useState(1);

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>
          {contest.data?.title ?? `Конкурс #${contestId}`}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Публичная информация, регистрация, этапы, участники и команды.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Участие</SPanelTitle>
          <SDataBox>{JSON.stringify(contest.data ?? null, null, 2)}</SDataBox>
          <SActions>
            <Button
              color="violet"
              loading={registerContest.isPending}
              onClick={() => registerContest.mutate({ contestId })}
            >
              Зарегистрироваться
            </Button>
            <Button
              loading={registerTeamContest.isPending}
              onClick={() => registerTeamContest.mutate({ contestId })}
            >
              Регистрация команды
            </Button>
            <Button
              color="gray"
              loading={createProject.isPending}
              onClick={() =>
                createProject.mutate({
                  contestId,
                  teamId: contest.data?.participationMode === "TEAM" ? teamId : undefined,
                })
              }
            >
              Создать проект
            </Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Этапы</SPanelTitle>
          <SList>
            {(stages.data?.stages ?? []).map((stage) => (
              <SListItem key={stage.id}>
                <div>
                  <SItemTitle>{stage.title ?? `Этап #${stage.id}`}</SItemTitle>
                  <SItemMeta>
                    Deadline: {stage.deadlineAt ?? "-"} · Полей:{" "}
                    {stage.fields?.length ?? 0}
                  </SItemMeta>
                </div>
                <SStatus>{stage.scoreScale ?? "-"}</SStatus>
              </SListItem>
            ))}
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Команды</SPanelTitle>
          <SFormGrid>
            <SField>
              Название команды
              <SInput
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </SField>
            <SField>
              Team ID
              <SInput
                type="number"
                value={teamId}
                onChange={(e) => setTeamId(Number(e.target.value))}
              />
            </SField>
          </SFormGrid>
          <SField>
            Invite token
            <SInput
              value={inviteToken}
              onChange={(e) => setInviteToken(e.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={createTeam.isPending}
              onClick={() =>
                createTeam.mutate(
                  { contestId, data: { name: teamName } },
                  { onSuccess: () => teams.refetch() },
                )
              }
            >
              Создать команду
            </Button>
            <Button
              loading={requestJoin.isPending}
              onClick={() => requestJoin.mutate({ teamId })}
            >
              Запрос на вход
            </Button>
            <Button
              loading={joinByInvite.isPending}
              onClick={() => joinByInvite.mutate({ inviteToken })}
            >
              Войти по invite
            </Button>
          </SActions>
          <SList>
            {(teams.data?.teams ?? []).map((team) => (
              <SListItem key={team.id}>
                <div>
                  <SItemTitle>{team.name ?? `Команда #${team.id}`}</SItemTitle>
                  <SItemMeta>
                    Leader: {team.leaderId ?? "-"} · Участников:{" "}
                    {team.memberIds?.length ?? 0}
                  </SItemMeta>
                </div>
                <SStatus>#{team.id}</SStatus>
              </SListItem>
            ))}
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Участники</SPanelTitle>
          <SList>
            {(participants.data?.participants ?? []).map((participant) => (
              <SListItem key={participant.userId}>
                <div>
                  <SItemTitle>
                    {participant.fullName ?? `Участник #${participant.userId}`}
                  </SItemTitle>
                  <SItemMeta>
                    {participant.nickname ?? "-"} · {participant.registeredAt ?? "-"}
                  </SItemMeta>
                </div>
              </SListItem>
            ))}
          </SList>
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
