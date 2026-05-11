"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
import { useBreadcrumbStore } from "@/widgets/Breadcrumb";
import { useAssignMentor } from "@/entities/mentor";
import {
  ScoreScale,
  useCreateOrganizerContestStage,
  useDeleteOrganizerStage,
  useGetOrganizerContestStages,
  useUpdateOrganizerStage,
  getOrganizerContestStagesKey,
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

import {
  SIconButton,
  SIconRow,
  SStageActions,
  STab,
  STabs,
} from "./contestBuilderPage.styles";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const contestId = Number(params.contestId);

  const activeTab = (searchParams.get("tab") as Tab | null) ?? "main";

  const setActiveTab = (tab: Tab) => {
    router.replace(`/organizer/contests/${contestId}?tab=${tab}`, {
      scroll: false,
    });
  };

  // ── данные ──────────────────────────────────────────────────────────────
  const contest = useGetContest(contestId);
  const stages = useGetOrganizerContestStages(contestId);
  const organizers = useGetContestOrganizers(contestId);
  const participants = useGetOrganizerContestParticipants(contestId);
  const teams = useGetContestTeams(contestId, activeTab === "mentoring");

  // ── мутации ─────────────────────────────────────────────────────────────
  const queryClient = useQueryClient();

  const updateContest = useUpdateOrganizerContest();
  const publishContest = usePublishOrganizerContest();
  const deleteContest = useDeleteOrganizerContest();
  const createStage = useCreateOrganizerContestStage();
  const updateStage = useUpdateOrganizerStage();
  const deleteStage = useDeleteOrganizerStage();
  const addOrganizer = useAddContestOrganizer();
  const deleteOrganizer = useDeleteContestOrganizer();
  const assignMentor = useAssignMentor();
  const assignExpert = useAssignExpert();
  const createAiReview = useCreateAiReview();

  // ── локальное состояние ─────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [participationMode, setParticipationMode] = useState<
    "INDIVIDUAL" | "TEAM"
  >("TEAM");
  const [minTeamSize, setMinTeamSize] = useState("");
  const [maxTeamSize, setMaxTeamSize] = useState("");
  const [registrationEndsAt, setRegistrationEndsAt] = useState("");
  const [teamBuildingEndsAt, setTeamBuildingEndsAt] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const [editingStageId, setEditingStageId] = useState<number | null>(null);
  const [stageTitle, setStageTitle] = useState("");
  const [stageDescription, setStageDescription] = useState("");
  const [stageRules, setStageRules] = useState("");
  const [stageExtraInfo, setStageExtraInfo] = useState("");
  const [stageDeadline, setStageDeadline] = useState("");
  const [stageDeadlineTime, setStageDeadlineTime] = useState("00:00");
  const [stageEliminating, setStageEliminating] = useState(false);
  const [scoreScale, setScoreScale] = useState<ScoreScale>("POINTS_100");

  const [orgUserId, setOrgUserId] = useState("");
  const [orgRole, setOrgRole] = useState<OrganizerRole>("EXPERT");

  const [mentorTeamId, setMentorTeamId] = useState(0);
  const [mentorUserId, setMentorUserId] = useState("");

  const [expertSubmissionId, setExpertSubmissionId] = useState("");
  const [expertUserId, setExpertUserId] = useState("");
  const [aiSubmissionId, setAiSubmissionId] = useState("");

  const [actionResult, setActionResult] = useState<string | null>(null);

  const hasStages = (stages.data?.stages?.length ?? 0) > 0;

  const setLabels = useBreadcrumbStore((s) => s.setLabels);
  const clearLabels = useBreadcrumbStore((s) => s.clearLabels);
  useEffect(() => {
    if (contest.data?.title) setLabels({ contestTitle: contest.data.title });
    return () => clearLabels();
  }, [contest.data?.title]);

  useEffect(() => {
    if (!contest.data) return;
    setTitle(contest.data.title ?? "");
    setDescription(contest.data.description ?? "");
    setRules(contest.data.rules ?? "");
    setParticipationMode(contest.data.participationMode ?? "TEAM");
    setMinTeamSize(
      contest.data.minTeamSize ? String(contest.data.minTeamSize) : "",
    );
    setMaxTeamSize(
      contest.data.maxTeamSize ? String(contest.data.maxTeamSize) : "",
    );
    setRegistrationEndsAt((contest.data.registrationEndsAt ?? "").slice(0, 10));
    setTeamBuildingEndsAt((contest.data.teamBuildingEndsAt ?? "").slice(0, 10));
    setStartsAt((contest.data.startsAt ?? "").slice(0, 10));
    setEndsAt((contest.data.endsAt ?? "").slice(0, 10));
  }, [contest.data]);

  const handleResult = (msg: string) => setActionResult(msg);

  const resetStageForm = () => {
    setEditingStageId(null);
    setStageTitle("");
    setStageDescription("");
    setStageRules("");
    setStageExtraInfo("");
    setStageDeadline("");
    setStageDeadlineTime("00:00");
    setStageEliminating(false);
    setScoreScale("POINTS_100");
  };

  const startStageEdit = (stageId: number) => {
    const stage = (stages.data?.stages ?? []).find((s) => s.id === stageId);
    if (!stage) return;
    setEditingStageId(stageId);
    setStageTitle(stage.title ?? "");
    setStageDescription(stage.description ?? "");
    setStageRules(stage.rules ?? "");
    setStageExtraInfo(stage.extraInfo ?? "");
    if (stage.deadlineAt) {
      const msk = new Date(
        new Date(stage.deadlineAt).getTime() + 3 * 60 * 60 * 1000,
      );
      setStageDeadline(msk.toISOString().slice(0, 10));
      setStageDeadlineTime(msk.toISOString().slice(11, 16));
    } else {
      setStageDeadline("");
      setStageDeadlineTime("00:00");
    }
    setStageEliminating(stage.eliminating ?? false);
    setScoreScale(stage.scoreScale ?? "POINTS_100");
  };

  const invalidateStages = () =>
    queryClient.invalidateQueries({
      queryKey: [getOrganizerContestStagesKey, contestId],
    });

  // ── вкладки ─────────────────────────────────────────────────────────────

  const handleSave = () =>
    updateContest.mutate(
      {
        contestId,
        data: {
          title: title || contest.data?.title || "Contest",
          description: description || contest.data?.description || undefined,
          rules: rules || contest.data?.rules || undefined,
          participationMode:
            participationMode || (contest.data?.participationMode ?? "TEAM"),
          registrationEndsAt: registrationEndsAt
            ? `${registrationEndsAt}T00:00:00Z`
            : (contest.data?.registrationEndsAt ?? undefined),
          teamBuildingEndsAt: teamBuildingEndsAt
            ? `${teamBuildingEndsAt}T00:00:00Z`
            : (contest.data?.teamBuildingEndsAt ?? undefined),
          startsAt: startsAt
            ? `${startsAt}T00:00:00Z`
            : (contest.data?.startsAt ?? undefined),
          endsAt: endsAt
            ? `${endsAt}T00:00:00Z`
            : (contest.data?.endsAt ?? undefined),
          contacts: contest.data?.contacts ?? undefined,
          minTeamSize:
            participationMode === "TEAM" && minTeamSize
              ? Number(minTeamSize)
              : undefined,
          maxTeamSize:
            participationMode === "TEAM" && maxTeamSize
              ? Number(maxTeamSize)
              : undefined,
        },
      },
      {
        onSuccess: () => handleResult("Сохранено"),
        onError: (e) => handleResult(`Ошибка: ${e.message}`),
      },
    );

  const renderMain = () => (
    <>
      {/* Описание */}
      <SWorkspacePanel>
        <SPanelTitle>Описание</SPanelTitle>
        <SField>
          Название
          <SInput
            placeholder="Название конкурса"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </SField>
        <SField>
          Описание
          <STextarea
            value={description}
            placeholder="Введите описание конкурса"
            onChange={(e) => setDescription(e.target.value)}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
        </SField>
        <SField>
          Правила
          <STextarea
            value={rules}
            placeholder="Введите условия участия, ограничения или авторские права"
            onChange={(e) => setRules(e.target.value)}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
        </SField>
      </SWorkspacePanel>

      {/* Параметры */}
      <SWorkspacePanel>
        <SPanelTitle>Параметры</SPanelTitle>
        <SField>
          Формат участия
          <SSelect
            value={
              participationMode || contest.data?.participationMode || "TEAM"
            }
            onChange={(e) =>
              setParticipationMode(e.target.value as "INDIVIDUAL" | "TEAM")
            }
          >
            <option value="TEAM">Командный</option>
            <option value="INDIVIDUAL">Индивидуальный</option>
          </SSelect>
        </SField>
        {participationMode === "TEAM" && (
          <SFormGrid>
            <SField>
              Мин. размер команды
              <SInput
                type="number"
                min={1}
                value={minTeamSize}
                onChange={(e) => setMinTeamSize(e.target.value)}
              />
            </SField>
            <SField>
              Макс. размер команды
              <SInput
                type="number"
                min={1}
                value={maxTeamSize}
                onChange={(e) => setMaxTeamSize(e.target.value)}
              />
            </SField>
          </SFormGrid>
        )}
        <SFormGrid>
          <SField>
            Регистрация до
            <SInput
              type="date"
              value={registrationEndsAt}
              onChange={(e) => setRegistrationEndsAt(e.target.value)}
            />
          </SField>
          <SField>
            Сбор команд до
            <SInput
              type="date"
              value={teamBuildingEndsAt}
              onChange={(e) => setTeamBuildingEndsAt(e.target.value)}
            />
          </SField>
          <SField>
            Начало конкурса
            <SInput
              type="date"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
            />
          </SField>
          <SField>
            Конец конкурса
            <SInput
              type="date"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
            />
          </SField>
        </SFormGrid>
        <SActions>
          <Button
            color="violet"
            loading={updateContest.isPending}
            onClick={handleSave}
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
    </>
  );

  const handleSaveStage = () => {
    const data = {
      title: stageTitle,
      description: stageDescription || undefined,
      rules: stageRules || undefined,
      extraInfo: stageExtraInfo || undefined,
      deadlineAt: stageDeadline
        ? new Date(
            `${stageDeadline}T${stageDeadlineTime}:00+03:00`,
          ).toISOString()
        : undefined,
      eliminating: stageEliminating,
      scoreScale,
    };

    if (editingStageId) {
      updateStage.mutate(
        { stageId: editingStageId, data },
        {
          onSuccess: () => {
            invalidateStages();
            resetStageForm();
          },
          onError: (e) => handleResult(`Ошибка: ${e.message}`),
        },
      );
    } else {
      createStage.mutate(
        {
          contestId,
          data: { ...data, order: stages.data?.stages?.length ?? 0 },
        },
        {
          onSuccess: resetStageForm,
          onError: (e) => handleResult(`Ошибка: ${e.message}`),
        },
      );
    }
  };

  const renderStages = () => (
    <>
      <SWorkspacePanel>
        <SPanelTitle>
          {editingStageId
            ? `Редактировать этап #${editingStageId}`
            : "Создать этап"}
        </SPanelTitle>
        <SFormGrid>
          <SField>
            Название *
            <SInput
              value={stageTitle}
              placeholder="Название этапа"
              onChange={(e) => setStageTitle(e.target.value)}
            />
          </SField>
          <SField>
            Шкала оценивания *
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
            Дедлайн * (МСК)
            <SInput
              type="date"
              value={stageDeadline}
              onChange={(e) => setStageDeadline(e.target.value)}
            />
            <SInput
              type="time"
              value={stageDeadlineTime}
              onChange={(e) => setStageDeadlineTime(e.target.value)}
            />
          </SField>
          <SField>
            Отсеивающий этап *
            <SSelect
              value={stageEliminating ? "true" : "false"}
              onChange={(e) => setStageEliminating(e.target.value === "true")}
            >
              <option value="false">Нет</option>
              <option value="true">Да — участники могут выбыть</option>
            </SSelect>
          </SField>
        </SFormGrid>
        <SField>
          Описание
          <STextarea
            value={stageDescription}
            placeholder="Что нужно сделать на этом этапе"
            onChange={(e) => setStageDescription(e.target.value)}
          />
        </SField>
        <SField>
          Правила
          <STextarea
            value={stageRules}
            placeholder="Условия и ограничения этапа"
            onChange={(e) => setStageRules(e.target.value)}
          />
        </SField>
        <SField>
          Дополнительная информация
          <STextarea
            value={stageExtraInfo}
            placeholder="Ссылки, примечания, FAQ"
            onChange={(e) => setStageExtraInfo(e.target.value)}
          />
        </SField>
        <SActions>
          <Button
            color="violet"
            loading={createStage.isPending || updateStage.isPending}
            disabled={!stageTitle.trim()}
            onClick={handleSaveStage}
          >
            {editingStageId ? "Сохранить" : "Добавить этап"}
          </Button>
          {editingStageId && (
            <Button type="text" color="gray" onClick={resetStageForm}>
              Отмена
            </Button>
          )}
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
                  {scoreScaleOptions.find((o) => o.value === stage.scoreScale)
                    ?.label ??
                    stage.scoreScale ??
                    "—"}
                  {stage.eliminating ? " · Отборочный" : ""}
                  {" · "}
                  {stage.fields?.length ?? 0} полей
                </SItemMeta>
              </div>
              <SStageActions>
                {stage.id && (
                  <Link
                    href={`/organizer/contests/${contestId}/stages/${stage.id}/fields`}
                  >
                    <Button>Конструктор полей</Button>
                  </Link>
                )}
                <SIconRow>
                  <SIconButton
                    title="Изменить"
                    onClick={() => stage.id && startStageEdit(stage.id)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </SIconButton>
                  <SIconButton
                    title="Удалить"
                    onClick={() =>
                      stage.id &&
                      deleteStage.mutate(
                        { stageId: stage.id },
                        {
                          onSuccess: () => {
                            invalidateStages();
                            if (editingStageId === stage.id) resetStageForm();
                          },
                          onError: (e) => handleResult(`Ошибка: ${e.message}`),
                        },
                      )
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </SIconButton>
                </SIconRow>
              </SStageActions>
            </SListItem>
          ))}
          {!hasStages && !stages.isPending && (
            <SPanelText>Этапы ещё не созданы.</SPanelText>
          )}
        </SList>
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
