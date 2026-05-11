"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ContestStatus,
  ParticipationMode,
  useGetContest,
  useGetContestParticipants,
  useRegisterContest,
} from "@/entities/contest";
import { useGetContestStages } from "@/entities/stage";
import {
  useCreateContestTeam,
  useGetContestTeams,
  useJoinTeamByInvite,
  useRequestJoinTeam,
} from "@/entities/team";
import { useGetUserProfile } from "@/entities/user";
import { Button } from "@/shared/components";
import { useBreadcrumbStore } from "@/widgets/Breadcrumb";
import {
  SActions,
  SSelect,
  SContactLabel,
  SContactLink,
  SContactRow,
  SContactsSection,
  SContactValue,
  SField,
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

// ─── Словари ───────────────────────────────────────────────────────────────

const statusLabels: Record<ContestStatus, string> = {
  DRAFT: "Черновик",
  FINISHED: "Завершён",
  PUBLISHED: "Опубликован",
  RUNNING: "Идёт",
};

const participationModeLabels: Record<ParticipationMode, string> = {
  INDIVIDUAL: "Индивидуальный",
  TEAM: "Командный",
};

const scoreScaleLabels: Record<string, string> = {
  POINTS_10: "0–10 баллов",
  POINTS_100: "0–100 баллов",
  PASS_FAIL: "Зачёт / Незачёт",
  STARS_5: "1–5 звёзд",
};

// ─── Утилиты ───────────────────────────────────────────────────────────────

const formatDate = (date?: string) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

const formatDateTime = (date?: string) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

// ─── Контакты ──────────────────────────────────────────────────────────────

const contactLabelMap: Record<string, string> = {
  "program office": "Офис",
  "telegram support": "Поддержка в Telegram",
  "technical issues": "Техподдержка",
  "office hours": "Часы работы",
};
const translateContactLabel = (label: string) =>
  contactLabelMap[label.toLowerCase()] ?? label;

const dayTranslations: Record<string, string> = {
  mondays: "пн",
  monday: "пн",
  tuesdays: "вт",
  tuesday: "вт",
  wednesdays: "ср",
  wednesday: "ср",
  thursdays: "чт",
  thursday: "чт",
  fridays: "пт",
  friday: "пт",
  saturdays: "сб",
  saturday: "сб",
  sundays: "вс",
  sunday: "вс",
  and: "и",
};

const addHours = (time: string, hours: number) => {
  const [h, m] = time.split(":").map(Number);
  return `${String((h + hours) % 24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const processOfficeHours = (value: string) =>
  value
    .replace(
      /\b(mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?|sundays?|and)\b/gi,
      (m) => dayTranslations[m.toLowerCase()] ?? m,
    )
    .replace(
      /(\d{1,2}:\d{2})-(\d{1,2}:\d{2})\s*UTC/gi,
      (_, t1, t2) => `${addHours(t1, 3)}–${addHours(t2, 3)} по МСК`,
    );

// ─── Состояние кнопки регистрации ──────────────────────────────────────────

type RegButtonState =
  | "hidden"
  | "not_open"
  | "closed"
  | "registered"
  | "available";

const getRegButtonState = (
  status?: string,
  registrationEndsAt?: string,
  startsAt?: string,
  isRegistered?: boolean,
): RegButtonState => {
  if (status === "DRAFT") return "hidden";
  const now = Date.now();
  if (registrationEndsAt && new Date(registrationEndsAt).getTime() < now)
    return "closed";
  if (startsAt && new Date(startsAt).getTime() > now) return "not_open";
  if (isRegistered) return "registered";
  return "available";
};

// ─── Компонент контактов ────────────────────────────────────────────────────

const ContactsSection = ({ contacts }: { contacts: string }) => (
  <SContactsSection>
    {contacts
      .split(/\\n|\n/)
      .filter(Boolean)
      .map((line, i) => {
        const colonIdx = line.indexOf(": ");
        const rawLabel = colonIdx !== -1 ? line.slice(0, colonIdx) : null;
        const label = rawLabel ? translateContactLabel(rawLabel) : null;
        const rawValue = colonIdx !== -1 ? line.slice(colonIdx + 2) : line;
        const value =
          rawLabel?.toLowerCase() === "office hours"
            ? processOfficeHours(rawValue)
            : rawValue;

        const nameEmail = value.match(/^(.+?)\s*<([^>]+@[^>]+)>$/);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isTelegram = value.startsWith("@");
        const isUrl = /^https?:\/\//.test(value);

        const renderValue = () => {
          if (nameEmail)
            return (
              <SContactValue>
                {nameEmail[1]} <span style={{ fontWeight: 400 }}>•</span>{" "}
                <SContactLink href={`mailto:${nameEmail[2]}`}>
                  {nameEmail[2]}
                </SContactLink>
              </SContactValue>
            );
          if (isEmail)
            return (
              <SContactLink href={`mailto:${value}`}>{value}</SContactLink>
            );
          if (isTelegram)
            return (
              <SContactLink
                href={`https://t.me/${value.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {value}
              </SContactLink>
            );
          if (isUrl)
            return (
              <SContactLink
                href={value}
                target="_blank"
                rel="noopener noreferrer"
              >
                {value}
              </SContactLink>
            );
          return <SContactValue>{value}</SContactValue>;
        };

        return (
          <SContactRow key={i}>
            {label && <SContactLabel>{label}:</SContactLabel>}
            {renderValue()}
          </SContactRow>
        );
      })}
  </SContactsSection>
);

// ─── Главный компонент ─────────────────────────────────────────────────────

export const ContestPublicPage = () => {
  const params = useParams<{ contestId?: string; id?: string }>();
  const contestId = Number(params.contestId ?? params.id);
  const isContestIdValid = Number.isFinite(contestId) && contestId > 0;

  const contest = useGetContest(contestId);
  const stages = useGetContestStages(contestId, isContestIdValid);
  const participants = useGetContestParticipants(contestId, isContestIdValid);
  const teams = useGetContestTeams(contestId, isContestIdValid);
  const profile = useGetUserProfile(isContestIdValid);

  const registerContest = useRegisterContest();
  const createTeam = useCreateContestTeam();
  const joinByInvite = useJoinTeamByInvite();
  const requestJoin = useRequestJoinTeam();

  const [teamName, setTeamName] = useState("");
  const [inviteToken, setInviteToken] = useState("");

  const setLabels = useBreadcrumbStore((s) => s.setLabels);
  const clearLabels = useBreadcrumbStore((s) => s.clearLabels);
  useEffect(() => {
    if (contest.data?.title) setLabels({ contestTitle: contest.data.title });
    return () => clearLabels();
  }, [contest.data?.title]);
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [createdInviteToken, setCreatedInviteToken] = useState<string | null>(
    null,
  );
  const [actionResult, setActionResult] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const stageList = useMemo(
    () =>
      [...(stages.data?.stages ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      ),
    [stages.data?.stages],
  );

  const participantList = participants.data?.participants ?? [];
  const teamList = teams.data?.teams ?? [];
  const isOrganizer = profile.data?.accountType === "ORGANIZER";
  const isTeamContest = contest.data?.participationMode === "TEAM";

  const isRegistered = useMemo(() => {
    const myId = profile.data?.id;
    if (!myId) return false;
    return participantList.some((p) => p.userId === myId);
  }, [profile.data?.id, participantList]);

  const regButtonState = getRegButtonState(
    contest.data?.status,
    contest.data?.registrationEndsAt,
    contest.data?.startsAt,
    isRegistered,
  );

  const handleError = (
    error: Error & {
      details?: { error?: { message?: string }; status?: number };
    },
  ) => {
    const detail = error.details?.error?.message;
    const status = error.details?.status;
    setActionResult(null);
    if (detail && !detail.startsWith("/")) {
      setActionError(`Ошибка: ${detail}`);
    } else if (status) {
      setActionError(`Ошибка ${status}. Попробуйте ещё раз.`);
    } else {
      setActionError("Запрос завершился ошибкой. Попробуйте ещё раз.");
    }
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
        {contest.data?.description && (
          <SWorkspaceSubtitle>{contest.data.description}</SWorkspaceSubtitle>
        )}
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        {/* ── О конкурсе ── */}
        <SPanelWide>
          <SPanelTitle>О конкурсе</SPanelTitle>
          {contest.isError ? (
            <SPanelText>Не удалось загрузить данные конкурса.</SPanelText>
          ) : (
            <>
              <SList>
                <SListItem>
                  <div>
                    <SItemTitle>Формат участия</SItemTitle>
                    <SItemMeta>
                      {contest.data?.participationMode
                        ? participationModeLabels[
                            contest.data.participationMode
                          ]
                        : "Не указан"}
                      {isTeamContest &&
                        (contest.data?.minTeamSize ||
                          contest.data?.maxTeamSize) &&
                        ` · ${contest.data.minTeamSize ?? "?"} – ${contest.data.maxTeamSize ?? "?"} чел.`}
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
                    <SItemTitle>Регистрация</SItemTitle>
                    <SItemMeta>
                      до {formatDate(contest.data?.registrationEndsAt)}
                      {isTeamContest &&
                        contest.data?.teamBuildingEndsAt &&
                        ` · Формирование команд до ${formatDate(contest.data.teamBuildingEndsAt)}`}
                    </SItemMeta>
                  </div>
                </SListItem>

                <SListItem>
                  <div>
                    <SItemTitle>Сроки проведения</SItemTitle>
                    <SItemMeta>
                      {formatDate(contest.data?.startsAt)} —{" "}
                      {formatDate(contest.data?.endsAt)}
                    </SItemMeta>
                  </div>
                  <SStatus>#{contest.data?.id ?? contestId}</SStatus>
                </SListItem>
              </SList>

              {contest.data?.contacts && (
                <div style={{ marginTop: 8 }}>
                  <SItemTitle style={{ marginBottom: 10 }}>
                    Контакты организатора
                  </SItemTitle>
                  <ContactsSection contacts={contest.data.contacts} />
                </div>
              )}
            </>
          )}
        </SPanelWide>

        {/* ── Участие ── */}
        {!isOrganizer && regButtonState !== "hidden" && (
          <SWorkspacePanel>
            <SPanelTitle>Участие</SPanelTitle>

            {/* Кнопка регистрации */}
            <SActions>
              {regButtonState === "closed" && (
                <Button color="gray" disabled>
                  Регистрация закрыта
                </Button>
              )}
              {regButtonState === "not_open" && (
                <Button color="gray" disabled>
                  Регистрация ещё не открыта
                </Button>
              )}
              {regButtonState === "registered" && (
                <Button color="gray" disabled>
                  Вы зарегистрированы ✓
                </Button>
              )}
              {regButtonState === "available" && (
                <Button
                  color="violet"
                  loading={registerContest.isPending}
                  onClick={() =>
                    registerContest.mutate(
                      { contestId },
                      {
                        onSuccess: (data) => {
                          setActionError(null);
                          setActionResult(
                            data.registrationId
                              ? `Вы зарегистрированы (заявка #${data.registrationId})`
                              : "Вы успешно зарегистрированы",
                          );
                        },
                        onError: handleError,
                      },
                    )
                  }
                >
                  Зарегистрироваться
                </Button>
              )}
            </SActions>

            {/* Командный раздел — только после регистрации */}
            {isTeamContest && isRegistered && (
              <>
                <SPanelTitle style={{ marginTop: 8 }}>Команда</SPanelTitle>

                {/* А) Создать команду */}
                <SField>
                  Создать свою команду
                  <div style={{ display: "flex", gap: 8 }}>
                    <SInput
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Название команды"
                      style={{ flex: 1 }}
                    />
                    <Button
                      color="gray"
                      loading={createTeam.isPending}
                      disabled={!teamName.trim()}
                      onClick={() =>
                        createTeam.mutate(
                          { contestId, data: { name: teamName.trim() } },
                          {
                            onSuccess: (data) => {
                              setActionError(null);
                              setCreatedInviteToken(data?.inviteToken ?? null);
                              setActionResult(
                                data?.inviteToken
                                  ? `Команда создана! Invite token скопирован ниже.`
                                  : "Команда успешно создана",
                              );
                              setTeamName("");
                            },
                            onError: handleError,
                          },
                        )
                      }
                    >
                      Создать
                    </Button>
                  </div>
                </SField>

                {createdInviteToken && (
                  <SField>
                    Invite token (поделитесь с участниками)
                    <SInput value={createdInviteToken} readOnly />
                  </SField>
                )}

                {/* Б) Вступить по токену */}
                <SField>
                  Вступить по invite token
                  <div style={{ display: "flex", gap: 8 }}>
                    <SInput
                      value={inviteToken}
                      onChange={(e) => setInviteToken(e.target.value)}
                      placeholder="LG-TEAM-...-..."
                      style={{ flex: 1 }}
                    />
                    <Button
                      color="gray"
                      loading={joinByInvite.isPending}
                      disabled={!inviteToken.trim()}
                      onClick={() =>
                        joinByInvite.mutate(
                          { inviteToken: inviteToken.trim() },
                          {
                            onSuccess: (data) => {
                              setActionError(null);
                              setActionResult(
                                `Вы вступили в команду${data?.id ? ` #${data.id}` : ""}`,
                              );
                              setInviteToken("");
                            },
                            onError: handleError,
                          },
                        )
                      }
                    >
                      Вступить
                    </Button>
                  </div>
                </SField>

                {/* В) Запрос на вступление */}
                {teamList.length > 0 && (
                  <SField>
                    Подать заявку на вступление в команду
                    <div style={{ display: "flex", gap: 8 }}>
                      <SSelect
                        value={selectedTeamId || ""}
                        onChange={(e) =>
                          setSelectedTeamId(Number(e.target.value))
                        }
                        style={{ flex: 1 }}
                      >
                        <option value="">— выберите команду —</option>
                        {teamList.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name ?? `Команда #${team.id}`}
                            {team.memberIds?.length !== undefined
                              ? ` (${team.memberIds.length} чел.)`
                              : ""}
                          </option>
                        ))}
                      </SSelect>
                      <Button
                        color="gray"
                        loading={requestJoin.isPending}
                        disabled={!selectedTeamId}
                        onClick={() =>
                          requestJoin.mutate(
                            { teamId: selectedTeamId },
                            {
                              onSuccess: () => {
                                setActionError(null);
                                setActionResult(
                                  "Заявка на вступление отправлена — ждите ответа лидера",
                                );
                                setSelectedTeamId(0);
                              },
                              onError: handleError,
                            },
                          )
                        }
                      >
                        Подать заявку
                      </Button>
                    </div>
                  </SField>
                )}
              </>
            )}

            {actionResult && (
              <SPanelText style={{ color: "green" }}>{actionResult}</SPanelText>
            )}
            {actionError && (
              <SPanelText style={{ color: "red" }}>{actionError}</SPanelText>
            )}
          </SWorkspacePanel>
        )}

        {/* ── Этапы ── */}
        <SWorkspacePanel>
          <SPanelTitle>
            Этапы{stageList.length > 0 ? ` (${stageList.length})` : ""}
          </SPanelTitle>
          {stages.isError ? (
            <SPanelText>Не удалось загрузить этапы.</SPanelText>
          ) : stageList.length > 0 ? (
            <SList>
              {stageList.map((stage) => (
                <SListItem key={stage.id}>
                  <div>
                    <Link href={`/contests/${contestId}/stages/${stage.id}`}>
                      <SItemTitle style={{ cursor: "pointer" }}>
                        {stage.title ?? `Этап #${stage.id}`}
                      </SItemTitle>
                    </Link>
                    <SItemMeta>
                      Дедлайн: {formatDateTime(stage.deadlineAt)}
                      {stage.eliminating && " · Отборочный"}
                      {" · "}
                      {stage.fields?.length ?? 0} полей
                    </SItemMeta>
                  </div>
                  <SStatus>
                    {stage.scoreScale
                      ? (scoreScaleLabels[stage.scoreScale] ?? stage.scoreScale)
                      : "—"}
                  </SStatus>
                </SListItem>
              ))}
            </SList>
          ) : (
            !stages.isPending && (
              <SPanelText>Этапы ещё не опубликованы.</SPanelText>
            )
          )}
        </SWorkspacePanel>

        {/* ── Участники — только зарегистрированным ── */}
        {!isOrganizer && isRegistered && (
          <SWorkspacePanel>
            <SPanelTitle>
              Участники
              {participantList.length > 0 ? ` (${participantList.length})` : ""}
            </SPanelTitle>
            {participants.isError ? (
              <SPanelText>Не удалось загрузить участников.</SPanelText>
            ) : participantList.length > 0 ? (
              <SList>
                {participantList.map((participant) => (
                  <SListItem key={participant.userId}>
                    <div>
                      <SItemTitle>
                        {participant.fullName ??
                          `Участник #${participant.userId}`}
                      </SItemTitle>
                      <SItemMeta>
                        {[participant.nickname, participant.bio]
                          .filter(Boolean)
                          .join(" · ") || "—"}
                      </SItemMeta>
                    </div>
                    <SStatus>{formatDate(participant.registeredAt)}</SStatus>
                  </SListItem>
                ))}
              </SList>
            ) : (
              !participants.isPending && (
                <SPanelText>Пока нет зарегистрированных участников.</SPanelText>
              )
            )}
          </SWorkspacePanel>
        )}

        {/* ── Команды (только для командных конкурсов) ── */}
        {!isOrganizer && isTeamContest && teamList.length > 0 && (
          <SWorkspacePanel>
            <SPanelTitle>Команды ({teamList.length})</SPanelTitle>
            <SList>
              {teamList.map((team) => (
                <SListItem key={team.id}>
                  <div>
                    <SItemTitle>
                      {team.name ?? `Команда #${team.id}`}
                    </SItemTitle>
                    <SItemMeta>
                      {team.memberIds?.length ?? 0} участник
                      {(team.memberIds?.length ?? 0) === 1
                        ? ""
                        : (team.memberIds?.length ?? 0) < 5
                          ? "а"
                          : "ов"}
                    </SItemMeta>
                  </div>
                  <SStatus>#{team.id}</SStatus>
                </SListItem>
              ))}
            </SList>
          </SWorkspacePanel>
        )}
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
