"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import {
  OrganizerRole,
  useAddContestOrganizer,
  useDeleteContestOrganizer,
  useDeleteOrganizerContest,
  useGetContestOrganizers,
  useGetOrganizerContestParticipants,
  usePublishOrganizerContest,
  useUpdateOrganizerContest,
  useGetContest,
} from "@/entities/contest";
import { useAssignExpert, useCreateAiReview } from "@/entities/evaluation";
import { useAssignMentor } from "@/entities/mentor";
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
import { useGetContestTeams } from "@/entities/team";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";
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

import { STab, STabs } from "./contestBuilderPage.styles";

type Tab =
  | "main"
  | "stages"
  | "team"
  | "participants"
  | "mentoring"
  | "expertise";

const TABS: { key: Tab; label: string }[] = [
  { key: "main", label: "Основное" },
  { key: "stages", label: "Этапы" },
  { key: "team", label: "Команда" },
  { key: "participants", label: "Участники" },
  { key: "mentoring", label: "Менторинг" },
  { key: "expertise", label: "Экспертиза" },
];

const scoreScaleOptions: { value: ScoreScale; label: string }[] = [
  { value: "POINTS_10", label: "0–10 баллов" },
  { value: "POINTS_100", label: "0–100 баллов" },
  { value: "PASS_FAIL", label: "Зачёт / Незачёт" },
  { value: "STARS_5", label: "1–5 звёзд" },
];

const roleOptions: { value: OrganizerRole; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "EXPERT", label: "Expert" },
  { value: "MENTOR", label: "Mentor" },
];

const fieldTypeOptions: { value: SubmissionFieldType; label: string }[] = [
  { value: "TEXT", label: "Текст" },
  { value: "LINK", label: "Ссылка" },
  { value: "FILE", label: "Файл" },
  { value: "FILES", label: "Файлы" },
  { value: "SELECT", label: "Выбор" },
  { value: "NUMBER", label: "Число" },
];

const formatDate = (date?: string) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const ContestBuilderPage = () => {
  const params = useParams();
  const contestId = Number(params.contestId);

  const [activeTab, setActiveTab] = useState<Tab>("main");

  // ── данные ──────────────────────────────────────────────────────────────
  const contest = useGetContest(contestId);
  const stages = useGetOrganizerContestStages(contestId);
  const organizers = useGetContestOrganizers(contestId);
  const participants = useGetOrganizerContestParticipants(contestId);
  const teams = useGetContestTeams(contestId, true);

  // ── мутации ─────────────────────────────────────────────────────────────
  const updateContest = useUpdateOrganizerContest();
  const publishContest = usePublishOrganizerContest();
  const deleteContest = useDeleteOrganizerContest();
  const createStage = useCreateOrganizerContestStage();
  const addOrganizer = useAddContestOrganizer();
  const deleteOrganizer = useDeleteContestOrganizer();
  const assignMentor = useAssignMentor();
  const assignExpert = useAssignExpert();
  const createAiReview = useCreateAiReview();

  // ── локальное состояние ─────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [rules, setRules] = useState("");

  const [stageTitle, setStageTitle] = useState("");
  const [stageDeadline, setStageDeadline] = useState("");
  const [scoreScale, setScoreScale] = useState<ScoreScale>("POINTS_100");
  const [selectedStageId, setSelectedStageId] = useState(0);
  const [fieldTitle, setFieldTitle] = useState("");
  const [fieldType, setFieldType] = useState<SubmissionFieldType>("TEXT");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");

  const [orgUserId, setOrgUserId] = useState("");
  const [orgRole, setOrgRole] = useState<OrganizerRole>("EXPERT");

  const [mentorTeamId, setMentorTeamId] = useState(0);
  const [mentorUserId, setMentorUserId] = useState("");

  const [expertSubmissionId, setExpertSubmissionId] = useState("");
  const [expertUserId, setExpertUserId] = useState("");
  const [aiSubmissionId, setAiSubmissionId] = useState("");

  const [actionResult, setActionResult] = useState<string | null>(null);

  const stageFields = useGetOrganizerStageFields(selectedStageId);
  const stageResources = useGetStageResources(selectedStageId);
  const createField = useCreateStageField();
  const createResource = useCreateStageResource();

  const hasStages = (stages.data?.stages?.length ?? 0) > 0;

  const handleResult = (msg: string) => setActionResult(msg);

  // ── вкладки ─────────────────────────────────────────────────────────────

  const renderMain = () => (
    <SWorkspacePanel>
      <SPanelTitle>Настройки конкурса</SPanelTitle>
      <SField>
        Название
        <SInput
          placeholder={contest.data?.title ?? "Введите название"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </SField>
      <SField>
        Правила
        <STextarea
          value={rules}
          placeholder={contest.data?.rules ?? "Введите правила"}
          onChange={(e) => setRules(e.target.value)}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
          }}
        />
      </SField>
      <SActions>
        <Button
          color="violet"
          loading={updateContest.isPending}
          onClick={() =>
            updateContest.mutate(
              {
                contestId,
                data: {
                  title: title || contest.data?.title || "Contest",
                  rules: rules || contest.data?.rules,
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
              { onSuccess: () => handleResult("Сохранено") },
            )
          }
        >
          Сохранить
        </Button>
        <Button
          loading={publishContest.isPending}
          disabled={!hasStages}
          title={!hasStages ? "Добавьте хотя бы один этап" : undefined}
          onClick={() =>
            publishContest.mutate(
              { contestId },
              { onSuccess: () => handleResult("Конкурс опубликован") },
            )
          }
        >
          Опубликовать
        </Button>
        <Button
          color="gray"
          loading={deleteContest.isPending}
          onClick={() => deleteContest.mutate({ contestId })}
        >
          Удалить конкурс
        </Button>
      </SActions>
      {actionResult && <SPanelText>{actionResult}</SPanelText>}
    </SWorkspacePanel>
  );

  const renderStages = () => (
    <>
      <SWorkspacePanel>
        <SPanelTitle>Создать этап</SPanelTitle>
        <SFormGrid>
          <SField>
            Название
            <SInput
              value={stageTitle}
              placeholder="Название этапа"
              onChange={(e) => setStageTitle(e.target.value)}
            />
          </SField>
          <SField>
            Шкала оценивания
            <SSelect
              value={scoreScale}
              onChange={(e) => setScoreScale(e.target.value as ScoreScale)}
            >
              {scoreScaleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SSelect>
          </SField>
          <SField>
            Дедлайн (UTC)
            <SInput
              value={stageDeadline}
              placeholder="2026-06-01T18:00:00Z"
              onChange={(e) => setStageDeadline(e.target.value)}
            />
          </SField>
        </SFormGrid>
        <SActions>
          <Button
            color="violet"
            loading={createStage.isPending}
            disabled={!stageTitle.trim()}
            onClick={() =>
              createStage.mutate(
                {
                  contestId,
                  data: {
                    title: stageTitle,
                    deadlineAt: stageDeadline,
                    scoreScale,
                  },
                },
                {
                  onSuccess: () => {
                    setStageTitle("");
                    setStageDeadline("");
                  },
                },
              )
            }
          >
            Добавить этап
          </Button>
        </SActions>
      </SWorkspacePanel>

      <SWorkspacePanel>
        <SPanelTitle>Этапы ({stages.data?.stages?.length ?? 0})</SPanelTitle>
        <SList>
          {(stages.data?.stages ?? []).map((stage) => (
            <SListItem key={stage.id}>
              <div>
                <SItemTitle>{stage.title ?? `Этап #${stage.id}`}</SItemTitle>
                <SItemMeta>
                  Дедлайн: {formatDate(stage.deadlineAt)} ·{" "}
                  {stage.scoreScale ?? "—"}
                  {stage.eliminating ? " · Отборочный" : ""}
                </SItemMeta>
              </div>
              <SStatus>{stage.fields?.length ?? 0} полей</SStatus>
            </SListItem>
          ))}
          {!hasStages && !stages.isPending && (
            <SPanelText>Этапы ещё не созданы.</SPanelText>
          )}
        </SList>
      </SWorkspacePanel>

      {/* Поля и ресурсы выбранного этапа */}
      <SWorkspacePanel>
        <SPanelTitle>Поля и ресурсы этапа</SPanelTitle>
        <SField>
          Выберите этап
          <SSelect
            value={selectedStageId || ""}
            onChange={(e) => setSelectedStageId(Number(e.target.value))}
          >
            <option value="">— выберите этап —</option>
            {(stages.data?.stages ?? []).map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.title ?? `Этап #${stage.id}`}
              </option>
            ))}
          </SSelect>
        </SField>

        {selectedStageId > 0 && (
          <>
            <SPanelTitle style={{ marginTop: 8 }}>Добавить поле</SPanelTitle>
            <SFormGrid>
              <SField>
                Тип
                <SSelect
                  value={fieldType}
                  onChange={(e) =>
                    setFieldType(e.target.value as SubmissionFieldType)
                  }
                >
                  {fieldTypeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </SSelect>
              </SField>
              <SField>
                Название поля
                <SInput
                  value={fieldTitle}
                  placeholder="Название поля"
                  onChange={(e) => setFieldTitle(e.target.value)}
                />
              </SField>
            </SFormGrid>
            <SActions>
              <Button
                color="violet"
                loading={createField.isPending}
                disabled={!fieldTitle.trim()}
                onClick={() =>
                  createField.mutate(
                    {
                      stageId: selectedStageId,
                      data: { title: fieldTitle, type: fieldType },
                    },
                    { onSuccess: () => setFieldTitle("") },
                  )
                }
              >
                Добавить поле
              </Button>
            </SActions>
            <SList>
              {(stageFields.data?.fields ?? []).map((f) => (
                <SListItem key={f.id}>
                  <div>
                    <SItemTitle>{f.title}</SItemTitle>
                    <SItemMeta>
                      {f.type}
                      {f.required ? " · Обязательное" : ""}
                    </SItemMeta>
                  </div>
                </SListItem>
              ))}
            </SList>

            <SPanelTitle style={{ marginTop: 8 }}>Добавить ресурс</SPanelTitle>
            <SFormGrid>
              <SField>
                Название
                <SInput
                  value={resourceTitle}
                  placeholder="Название ресурса"
                  onChange={(e) => setResourceTitle(e.target.value)}
                />
              </SField>
              <SField>
                Ссылка
                <SInput
                  value={resourceLink}
                  placeholder="https://..."
                  onChange={(e) => setResourceLink(e.target.value)}
                />
              </SField>
            </SFormGrid>
            <SActions>
              <Button
                color="violet"
                loading={createResource.isPending}
                disabled={!resourceTitle.trim() || !resourceLink.trim()}
                onClick={() =>
                  createResource.mutate(
                    {
                      stageId: selectedStageId,
                      data: {
                        title: resourceTitle,
                        type: "LINK",
                        linkUrl: resourceLink,
                      },
                    },
                    {
                      onSuccess: () => {
                        setResourceTitle("");
                        setResourceLink("");
                      },
                    },
                  )
                }
              >
                Добавить ресурс
              </Button>
            </SActions>
            <SList>
              {(stageResources.data?.resources ?? []).map((r) => (
                <SListItem key={r.id}>
                  <div>
                    <SItemTitle>{r.title}</SItemTitle>
                    <SItemMeta>
                      {r.type}
                      {r.linkUrl ? ` · ${r.linkUrl}` : ""}
                    </SItemMeta>
                  </div>
                </SListItem>
              ))}
            </SList>
          </>
        )}
      </SWorkspacePanel>
    </>
  );

  const renderTeam = () => (
    <SWorkspacePanel>
      <SPanelTitle>Добавить в команду</SPanelTitle>
      <SFormGrid>
        <SField>
          User ID
          <SInput
            type="number"
            value={orgUserId}
            placeholder="ID пользователя"
            onChange={(e) => setOrgUserId(e.target.value)}
          />
        </SField>
        <SField>
          Роль
          <SSelect
            value={orgRole}
            onChange={(e) => setOrgRole(e.target.value as OrganizerRole)}
          >
            {roleOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SSelect>
        </SField>
      </SFormGrid>
      <SActions>
        <Button
          color="violet"
          loading={addOrganizer.isPending}
          disabled={!orgUserId}
          onClick={() =>
            addOrganizer.mutate(
              { contestId, data: { userId: Number(orgUserId), role: orgRole } },
              { onSuccess: () => setOrgUserId("") },
            )
          }
        >
          Добавить
        </Button>
      </SActions>

      <SPanelTitle style={{ marginTop: 8 }}>
        Команда организаторов ({organizers.data?.organizers?.length ?? 0})
      </SPanelTitle>
      <SList>
        {(organizers.data?.organizers ?? []).map((org) => (
          <SListItem key={org.id}>
            <div>
              <SItemTitle>Пользователь #{org.userId}</SItemTitle>
              <SItemMeta>{org.role ?? "—"}</SItemMeta>
            </div>
            <SActions>
              {org.role !== "CREATOR" && (
                <Button
                  color="gray"
                  loading={deleteOrganizer.isPending}
                  onClick={() =>
                    deleteOrganizer.mutate({ contestId, organizerId: org.id! })
                  }
                >
                  Удалить
                </Button>
              )}
              {org.role === "CREATOR" && <SStatus>Creator</SStatus>}
            </SActions>
          </SListItem>
        ))}
        {!organizers.data?.organizers?.length && !organizers.isPending && (
          <SPanelText>Нет данных об организаторах.</SPanelText>
        )}
      </SList>
    </SWorkspacePanel>
  );

  const renderParticipants = () => (
    <SWorkspacePanel>
      <SPanelTitle>
        Участники ({participants.data?.participants?.length ?? 0})
      </SPanelTitle>
      <SList>
        {(participants.data?.participants ?? []).map((p) => (
          <SListItem key={p.userId}>
            <div>
              <SItemTitle>{p.fullName ?? `Участник #${p.userId}`}</SItemTitle>
              <SItemMeta>
                {[p.nickname, p.bio].filter(Boolean).join(" · ") ||
                  p.email ||
                  "—"}
              </SItemMeta>
            </div>
            <SStatus>
              {p.registeredAt ? formatDate(p.registeredAt) : "—"}
            </SStatus>
          </SListItem>
        ))}
        {!participants.data?.participants?.length &&
          !participants.isPending && (
            <SPanelText>Участников пока нет.</SPanelText>
          )}
      </SList>
    </SWorkspacePanel>
  );

  const renderMentoring = () => (
    <SWorkspacePanel>
      <SPanelTitle>Назначить ментора</SPanelTitle>
      <SFormGrid>
        <SField>
          Команда
          <SSelect
            value={mentorTeamId || ""}
            onChange={(e) => setMentorTeamId(Number(e.target.value))}
          >
            <option value="">— выберите команду —</option>
            {(teams.data?.teams ?? []).map((team) => (
              <option key={team.id} value={team.id}>
                {team.name ?? `Команда #${team.id}`}
              </option>
            ))}
          </SSelect>
        </SField>
        <SField>
          User ID ментора
          <SInput
            type="number"
            value={mentorUserId}
            placeholder="ID пользователя"
            onChange={(e) => setMentorUserId(e.target.value)}
          />
        </SField>
      </SFormGrid>
      <SActions>
        <Button
          color="violet"
          loading={assignMentor.isPending}
          disabled={!mentorTeamId || !mentorUserId}
          onClick={() =>
            assignMentor.mutate(
              { teamId: mentorTeamId, mentorUserId: Number(mentorUserId) },
              {
                onSuccess: () => {
                  handleResult("Ментор назначен");
                  setMentorUserId("");
                  setMentorTeamId(0);
                },
              },
            )
          }
        >
          Назначить
        </Button>
      </SActions>
      {actionResult && <SPanelText>{actionResult}</SPanelText>}

      <SPanelTitle style={{ marginTop: 8 }}>
        Команды конкурса ({teams.data?.teams?.length ?? 0})
      </SPanelTitle>
      <SList>
        {(teams.data?.teams ?? []).map((team) => (
          <SListItem key={team.id}>
            <div>
              <SItemTitle>{team.name ?? `Команда #${team.id}`}</SItemTitle>
              <SItemMeta>{team.memberIds?.length ?? 0} участников</SItemMeta>
            </div>
            <SStatus>#{team.id}</SStatus>
          </SListItem>
        ))}
        {!teams.data?.teams?.length && !teams.isPending && (
          <SPanelText>Команды ещё не созданы.</SPanelText>
        )}
      </SList>
    </SWorkspacePanel>
  );

  const renderExpertise = () => (
    <>
      <SWorkspacePanel>
        <SPanelTitle>Назначить эксперта на сабмишен</SPanelTitle>
        <SFormGrid>
          <SField>
            Submission ID
            <SInput
              type="number"
              value={expertSubmissionId}
              placeholder="ID сабмишена"
              onChange={(e) => setExpertSubmissionId(e.target.value)}
            />
          </SField>
          <SField>
            User ID эксперта
            <SInput
              type="number"
              value={expertUserId}
              placeholder="ID пользователя"
              onChange={(e) => setExpertUserId(e.target.value)}
            />
          </SField>
        </SFormGrid>
        <SActions>
          <Button
            color="violet"
            loading={assignExpert.isPending}
            disabled={!expertSubmissionId || !expertUserId}
            onClick={() =>
              assignExpert.mutate(
                {
                  submissionId: Number(expertSubmissionId),
                  expertUserId: Number(expertUserId),
                },
                {
                  onSuccess: () => {
                    handleResult("Эксперт назначен");
                    setExpertSubmissionId("");
                    setExpertUserId("");
                  },
                },
              )
            }
          >
            Назначить эксперта
          </Button>
        </SActions>
        {actionResult && <SPanelText>{actionResult}</SPanelText>}
      </SWorkspacePanel>

      <SWorkspacePanel>
        <SPanelTitle>AI-ревью сабмишена</SPanelTitle>
        <SField>
          Submission ID
          <SInput
            type="number"
            value={aiSubmissionId}
            placeholder="ID сабмишена"
            onChange={(e) => setAiSubmissionId(e.target.value)}
          />
        </SField>
        <SActions>
          <Button
            color="violet"
            loading={createAiReview.isPending}
            disabled={!aiSubmissionId}
            onClick={() =>
              createAiReview.mutate(
                { submissionId: Number(aiSubmissionId) },
                {
                  onSuccess: () => {
                    handleResult("AI-ревью запущено");
                    setAiSubmissionId("");
                  },
                },
              )
            }
          >
            Создать AI-ревью
          </Button>
        </SActions>
      </SWorkspacePanel>
    </>
  );

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href={routes.ORGANIZER_PAGE}>
            <Button type="text" color="gray">
              ← Все конкурсы
            </Button>
          </Link>
        </div>
        <SWorkspaceTitle>
          {contest.data?.title ?? `Конкурс #${contestId}`}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          {contest.data?.description ?? "Управление конкурсом"}
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <STabs>
        {TABS.map((tab) => (
          <STab
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </STab>
        ))}
      </STabs>

      <SWorkspaceGrid>
        {activeTab === "main" && renderMain()}
        {activeTab === "stages" && renderStages()}
        {activeTab === "team" && renderTeam()}
        {activeTab === "participants" && renderParticipants()}
        {activeTab === "mentoring" && renderMentoring()}
        {activeTab === "expertise" && renderExpertise()}
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
