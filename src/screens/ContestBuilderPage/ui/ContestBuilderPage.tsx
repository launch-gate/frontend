"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import {
  OrganizerRole,
  useAddContestOrganizer,
  useDeleteOrganizerContest,
  useGetContest,
  useGetContestOrganizers,
  useGetOrganizerContestParticipants,
  usePublishOrganizerContest,
  useUpdateOrganizerContest,
} from "@/entities/contest";
import {
  ScoreScale,
  SubmissionFieldType,
  useCreateOrganizerContestStage,
  useCreateStageField,
  useCreateStageResource,
  useGetOrganizerContestStages,
  useGetOrganizerStageFields,
  useGetStageResources,
} from "@/entities/stage";
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

export const ContestBuilderPage = () => {
  const params = useParams();
  const contestId = Number(params.contestId);

  const contest = useGetContest(contestId);
  const stages = useGetOrganizerContestStages(contestId);
  const organizers = useGetContestOrganizers(contestId);
  const participants = useGetOrganizerContestParticipants(contestId);

  const updateContest = useUpdateOrganizerContest();
  const publishContest = usePublishOrganizerContest();
  const deleteContest = useDeleteOrganizerContest();
  const createStage = useCreateOrganizerContestStage();
  const addOrganizer = useAddContestOrganizer();

  const [title, setTitle] = useState("");
  const [rules, setRules] = useState("");
  const [stageTitle, setStageTitle] = useState("Problem validation");
  const [stageDeadlineAt, setStageDeadlineAt] = useState("2026-05-10T18:00:00Z");
  const [scoreScale, setScoreScale] = useState<ScoreScale>("POINTS_100");
  const [userId, setUserId] = useState(1);
  const [role, setRole] = useState<OrganizerRole>("EXPERT");
  const [stageId, setStageId] = useState(1);
  const [fieldTitle, setFieldTitle] = useState("Problem statement");
  const [fieldType, setFieldType] = useState<SubmissionFieldType>("TEXT");
  const [resourceTitle, setResourceTitle] = useState("Pitch deck template");
  const [resourceLink, setResourceLink] = useState("https://example.com/template");

  const fields = useGetOrganizerStageFields(stageId);
  const resources = useGetStageResources(stageId);
  const createField = useCreateStageField();
  const createResource = useCreateStageResource();

  const handleUpdateContest = () => {
    updateContest.mutate(
      {
        contestId,
        data: {
          title: title || contest.data?.title || "Contest",
          rules,
          participationMode: contest.data?.participationMode ?? "TEAM",
          description: contest.data?.description,
          registrationEndsAt: contest.data?.registrationEndsAt,
          teamBuildingEndsAt: contest.data?.teamBuildingEndsAt,
          startsAt: contest.data?.startsAt,
          endsAt: contest.data?.endsAt,
          contacts: contest.data?.contacts,
          minTeamSize: contest.data?.minTeamSize,
          maxTeamSize: contest.data?.maxTeamSize,
        },
      },
      { onSuccess: () => contest.refetch() },
    );
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Конструктор конкурса #{contestId}</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Общие настройки, публикация, роли, участники, этапы, поля формы и
          материалы.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Настройки</SPanelTitle>
          <SField>
            Название
            <SInput
              placeholder={contest.data?.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </SField>
          <SField>
            Правила
            <STextarea value={rules} onChange={(e) => setRules(e.target.value)} />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={updateContest.isPending}
              onClick={handleUpdateContest}
            >
              Сохранить
            </Button>
            <Button
              loading={publishContest.isPending}
              onClick={() =>
                publishContest.mutate({ contestId }, { onSuccess: () => contest.refetch() })
              }
            >
              Опубликовать
            </Button>
            <Button
              color="gray"
              loading={deleteContest.isPending}
              onClick={() => deleteContest.mutate({ contestId })}
            >
              Удалить
            </Button>
          </SActions>
          <SDataBox>{JSON.stringify(contest.data ?? null, null, 2)}</SDataBox>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Этапы</SPanelTitle>
          <SFormGrid>
            <SField>
              Название этапа
              <SInput
                value={stageTitle}
                onChange={(e) => setStageTitle(e.target.value)}
              />
            </SField>
            <SField>
              Шкала
              <SSelect
                value={scoreScale}
                onChange={(e) => setScoreScale(e.target.value as ScoreScale)}
              >
                <option value="POINTS_10">10 баллов</option>
                <option value="POINTS_100">100 баллов</option>
                <option value="PASS_FAIL">Зачет</option>
                <option value="STARS_5">5 звезд</option>
              </SSelect>
            </SField>
            <SField>
              Deadline UTC
              <SInput
                value={stageDeadlineAt}
                onChange={(e) => setStageDeadlineAt(e.target.value)}
              />
            </SField>
          </SFormGrid>
          <SActions>
            <Button
              color="violet"
              loading={createStage.isPending}
              onClick={() =>
                createStage.mutate(
                  {
                    contestId,
                    data: {
                      title: stageTitle,
                      deadlineAt: stageDeadlineAt,
                      scoreScale,
                    },
                  },
                  { onSuccess: () => stages.refetch() },
                )
              }
            >
              Добавить этап
            </Button>
          </SActions>
          <SList>
            {(stages.data?.stages ?? []).map((stage) => (
              <SListItem key={stage.id}>
                <div>
                  <SItemTitle>{stage.title ?? `Этап #${stage.id}`}</SItemTitle>
                  <SItemMeta>
                    #{stage.id} · {stage.deadlineAt ?? "-"} ·{" "}
                    {stage.scoreScale ?? "-"}
                  </SItemMeta>
                </div>
                <SStatus>{stage.fields?.length ?? 0} полей</SStatus>
              </SListItem>
            ))}
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Организаторы и роли</SPanelTitle>
          <SFormGrid>
            <SField>
              User ID
              <SInput
                type="number"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
              />
            </SField>
            <SField>
              Роль
              <SSelect
                value={role}
                onChange={(e) => setRole(e.target.value as OrganizerRole)}
              >
                <option value="ADMIN">Admin</option>
                <option value="EXPERT">Expert</option>
                <option value="MENTOR">Mentor</option>
              </SSelect>
            </SField>
          </SFormGrid>
          <SActions>
            <Button
              color="violet"
              loading={addOrganizer.isPending}
              onClick={() =>
                addOrganizer.mutate(
                  { contestId, data: { userId, role } },
                  { onSuccess: () => organizers.refetch() },
                )
              }
            >
              Добавить роль
            </Button>
          </SActions>
          <SList>
            {(organizers.data?.organizers ?? []).map((organizer) => (
              <SListItem key={organizer.id}>
                <div>
                  <SItemTitle>Пользователь #{organizer.userId}</SItemTitle>
                  <SItemMeta>Роль: {organizer.role ?? "-"}</SItemMeta>
                </div>
                <SStatus>#{organizer.id}</SStatus>
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
                    {participant.email ?? "-"} · {participant.registeredAt ?? "-"}
                  </SItemMeta>
                </div>
              </SListItem>
            ))}
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Поля формы этапа</SPanelTitle>
          <SFormGrid>
            <SField>
              Stage ID
              <SInput
                type="number"
                value={stageId}
                onChange={(e) => setStageId(Number(e.target.value))}
              />
            </SField>
            <SField>
              Тип поля
              <SSelect
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value as SubmissionFieldType)}
              >
                <option value="TEXT">Text</option>
                <option value="LINK">Link</option>
                <option value="FILE">File</option>
                <option value="FILES">Files</option>
                <option value="SELECT">Select</option>
                <option value="NUMBER">Number</option>
              </SSelect>
            </SField>
          </SFormGrid>
          <SField>
            Название поля
            <SInput
              value={fieldTitle}
              onChange={(e) => setFieldTitle(e.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={createField.isPending}
              onClick={() =>
                createField.mutate(
                  { stageId, data: { title: fieldTitle, type: fieldType } },
                  { onSuccess: () => fields.refetch() },
                )
              }
            >
              Добавить поле
            </Button>
            <Button onClick={() => fields.refetch()}>Обновить</Button>
          </SActions>
          <SDataBox>{JSON.stringify(fields.data ?? null, null, 2)}</SDataBox>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Ресурсы этапа</SPanelTitle>
          <SField>
            Название
            <SInput
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
            />
          </SField>
          <SField>
            Ссылка
            <SInput
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={createResource.isPending}
              onClick={() =>
                createResource.mutate(
                  {
                    stageId,
                    data: {
                      title: resourceTitle,
                      type: "LINK",
                      linkUrl: resourceLink,
                    },
                  },
                  { onSuccess: () => resources.refetch() },
                )
              }
            >
              Добавить ресурс
            </Button>
            <Button onClick={() => resources.refetch()}>Обновить</Button>
          </SActions>
          <SDataBox>{JSON.stringify(resources.data ?? null, null, 2)}</SDataBox>
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
