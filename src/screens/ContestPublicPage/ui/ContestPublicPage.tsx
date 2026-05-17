"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import {
  ContestStatus,
  ParticipationMode,
  getContestParticipantsKey,
  useGetContest,
  useGetContestParticipants,
  useRegisterContest,
} from "@/entities/contest";
import { useGetContestStages } from "@/entities/stage";
import {
  ITeamJoinRequestResponse,
  ITeamResponse,
  TeamJoinRequestStatus,
  getContestTeamsKey,
  getTeamJoinRequestsKey,
  useApproveTeamJoinRequest,
  useCreateContestTeam,
  useGetContestTeams,
  useGetTeamJoinRequests,
  useJoinTeamByInvite,
  useRejectTeamJoinRequest,
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

type ContestContactType = "TELEGRAM" | "EMAIL" | "PHONE" | "VK" | "WEBSITE";

interface ContestContact {
  type: ContestContactType;
  value: string;
  note?: string;
}

const CONTACT_TYPE_LABELS: Record<ContestContactType, string> = {
  TELEGRAM: "Telegram",
  EMAIL: "Email",
  PHONE: "Телефон",
  VK: "VK",
  WEBSITE: "Сайт",
};

const parseContacts = (raw: string): ContestContact[] => {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((c) => c.type && c.value);
  } catch {
    return [];
  }
};

const ContactsSection = ({ contacts }: { contacts: string }) => {
  const items = parseContacts(contacts);
  if (!items.length) return null;

  return (
    <SContactsSection>
      {items.map((contact, i) => {
        const label = CONTACT_TYPE_LABELS[contact.type] ?? contact.type;
        const value = contact.value.trim();

        const renderValue = () => {
          switch (contact.type) {
            case "TELEGRAM":
              return (
                <SContactLink
                  href={`https://t.me/${value.startsWith("@") ? value.slice(1) : value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {value}
                </SContactLink>
              );
            case "EMAIL":
              return <SContactLink href={`mailto:${value}`}>{value}</SContactLink>;
            case "PHONE":
              return (
                <SContactLink href={`tel:${value.replace(/[\s\-()]/g, "")}`}>
                  {value}
                </SContactLink>
              );
            case "VK":
              return (
                <SContactLink
                  href={/^https?:\/\//.test(value) ? value : `https://vk.com/${value.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {value}
                </SContactLink>
              );
            case "WEBSITE":
              return (
                <SContactLink href={value} target="_blank" rel="noopener noreferrer">
                  {value}
                </SContactLink>
              );
            default:
              return <SContactValue>{value}</SContactValue>;
          }
        };

        return (
          <SContactRow key={i}>
            <SContactLabel>{label}:</SContactLabel>
            <SContactValue>
              {renderValue()}
              {contact.note && <> · {contact.note}</>}
            </SContactValue>
          </SContactRow>
        );
      })}
    </SContactsSection>
  );
};

// ─── Заявки в команду ──────────────────────────────────────────────────────

const JOIN_REQUEST_STATUS_LABELS: Record<TeamJoinRequestStatus, string> = {
  PENDING: "На рассмотрении",
  APPROVED: "Принята",
  REJECTED: "Отклонена",
};

const JOIN_REQUEST_STATUS_COLORS: Record<TeamJoinRequestStatus, string> = {
  PENDING: "#9a7b00",
  APPROVED: "#137333",
  REJECTED: "#c5221f",
};

const PENDING_REQUESTS_STORAGE_KEY = (contestId: number, userId: number) =>
  `pendingTeamJoinRequests:${contestId}:${userId}`;

const REGISTERED_STORAGE_KEY = (contestId: number, userId: number) =>
  `contestRegistered:${contestId}:${userId}`;

const readRegisteredFlag = (contestId: number, userId: number): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(REGISTERED_STORAGE_KEY(contestId, userId)) === "1";
};

const writeRegisteredFlag = (contestId: number, userId: number, value: boolean) => {
  if (typeof window === "undefined") return;
  const key = REGISTERED_STORAGE_KEY(contestId, userId);
  if (value) window.localStorage.setItem(key, "1");
  else window.localStorage.removeItem(key);
};

interface PendingJoinRequest {
  teamId: number;
  joinRequestId: number;
}

const readPendingRequests = (
  contestId: number,
  userId: number,
): PendingJoinRequest[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(
      PENDING_REQUESTS_STORAGE_KEY(contestId, userId),
    );
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writePendingRequests = (
  contestId: number,
  userId: number,
  list: PendingJoinRequest[],
) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    PENDING_REQUESTS_STORAGE_KEY(contestId, userId),
    JSON.stringify(list),
  );
};

/**
 * Панель лидера: список входящих join-request'ов для одной команды
 * с действиями approve / reject.
 */
const TeamLeaderRequestsPanel = ({
  team,
  contestId,
}: {
  team: ITeamResponse;
  contestId: number;
}) => {
  const teamId = team.id ?? 0;
  const queryClient = useQueryClient();
  const requests = useGetTeamJoinRequests(teamId);
  const approve = useApproveTeamJoinRequest();
  const reject = useRejectTeamJoinRequest();

  const [actionError, setActionError] = useState<string | null>(null);

  const refetchAfterMutation = () => {
    queryClient.invalidateQueries({ queryKey: [getTeamJoinRequestsKey, teamId] });
    queryClient.invalidateQueries({ queryKey: [getContestTeamsKey, contestId] });
  };

  const handleError = (error: Error & { details?: { error?: { message?: string } } }) => {
    setActionError(error.details?.error?.message ?? "Не удалось выполнить действие");
  };

  const list = requests.data?.requests ?? [];
  const pending = list.filter((r) => r.status === "PENDING");
  const decided = list.filter((r) => r.status !== "PENDING");

  return (
    <SWorkspacePanel>
      <SPanelTitle>
        Заявки в команду «{team.name ?? `#${team.id}`}»
        {pending.length > 0 ? ` · ожидают: ${pending.length}` : ""}
      </SPanelTitle>

      {requests.isError && (
        <SPanelText>Не удалось загрузить заявки.</SPanelText>
      )}

      {!requests.isPending && list.length === 0 && (
        <SPanelText>Входящих заявок пока нет.</SPanelText>
      )}

      <SList>
        {pending.map((req) => (
          <SListItem key={req.id}>
            <div>
              <SItemTitle>
                {req.participantFullName ??
                  req.participantNickname ??
                  `Участник #${req.participantId}`}
              </SItemTitle>
              <SItemMeta>
                Подана {formatDateTime(req.createdAt)}
                {req.participantNickname && req.participantFullName
                  ? ` · @${req.participantNickname}`
                  : ""}
              </SItemMeta>
            </div>
            <SStatus
              style={{
                color: JOIN_REQUEST_STATUS_COLORS.PENDING,
              }}
            >
              {JOIN_REQUEST_STATUS_LABELS.PENDING}
            </SStatus>
            <SActions>
              <Button
                color="violet"
                loading={approve.isPending && approve.variables?.requestId === req.id}
                disabled={!req.id}
                onClick={() =>
                  req.id &&
                  approve.mutate(
                    { requestId: req.id },
                    { onSuccess: refetchAfterMutation, onError: handleError },
                  )
                }
              >
                Одобрить
              </Button>
              <Button
                color="gray"
                loading={reject.isPending && reject.variables?.requestId === req.id}
                disabled={!req.id}
                onClick={() =>
                  req.id &&
                  reject.mutate(
                    { requestId: req.id },
                    { onSuccess: refetchAfterMutation, onError: handleError },
                  )
                }
              >
                Отклонить
              </Button>
            </SActions>
          </SListItem>
        ))}

        {decided.map((req) => (
          <SListItem key={req.id}>
            <div>
              <SItemTitle>
                {req.participantFullName ??
                  req.participantNickname ??
                  `Участник #${req.participantId}`}
              </SItemTitle>
              <SItemMeta>{formatDateTime(req.createdAt)}</SItemMeta>
            </div>
            <SStatus
              style={{
                color: req.status
                  ? JOIN_REQUEST_STATUS_COLORS[req.status]
                  : undefined,
              }}
            >
              {req.status ? JOIN_REQUEST_STATUS_LABELS[req.status] : "—"}
            </SStatus>
          </SListItem>
        ))}
      </SList>

      {actionError && (
        <SPanelText style={{ color: "red" }}>{actionError}</SPanelText>
      )}
    </SWorkspacePanel>
  );
};

/**
 * Резолвит локально сохранённые pending-заявки участника к актуальному
 * состоянию команд: если участник появился в memberIds — заявка APPROVED,
 * иначе считаем её всё ещё PENDING. REJECTED здесь определить нельзя.
 */
const resolveParticipantJoinStatus = (
  team: ITeamResponse | undefined,
  userId: number | undefined,
): TeamJoinRequestStatus => {
  if (!team || !userId) return "PENDING";
  return team.memberIds?.includes(userId) ? "APPROVED" : "PENDING";
};

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

// ─── Главный компонент ─────────────────────────────────────────────────────

export const ContestPublicPage = () => {
  const params = useParams<{ contestId?: string; id?: string }>();
  const contestId = Number(params.contestId ?? params.id);
  const isContestIdValid = Number.isFinite(contestId) && contestId > 0;

  const queryClient = useQueryClient();
  const contest = useGetContest(contestId);
  const stages = useGetContestStages(contestId, isContestIdValid);
  const participants = useGetContestParticipants(contestId, isContestIdValid);
  const teams = useGetContestTeams(contestId, isContestIdValid);
  const profile = useGetUserProfile(isContestIdValid);

  const [justRegistered, setJustRegistered] = useState(false);

  const registerContest = useRegisterContest();
  const createTeam = useCreateContestTeam();
  const joinByInvite = useJoinTeamByInvite();
  const requestJoin = useRequestJoinTeam();

  const [teamName, setTeamName] = useState("");
  const [inviteToken, setInviteToken] = useState("");
  const [pendingRequests, setPendingRequests] = useState<PendingJoinRequest[]>(
    [],
  );

  const myUserId = profile.data?.id;

  // Восстанавливаем список pending-заявок и флаг регистрации из localStorage.
  useEffect(() => {
    if (!isContestIdValid || !myUserId) return;
    setPendingRequests(readPendingRequests(contestId, myUserId));
    if (readRegisteredFlag(contestId, myUserId)) setJustRegistered(true);
  }, [contestId, isContestIdValid, myUserId]);

  // Чистим из локального хранилища те заявки, которые уже подтверждены
  // (участник присутствует в memberIds команды). REJECTED локально не виден,
  // но при ручной отмене лидером запись просто останется висеть PENDING до
  // повторного действия пользователя — это компромисс из-за отсутствия
  // эндпоинта «мои исходящие заявки».
  useEffect(() => {
    if (!myUserId || !isContestIdValid || pendingRequests.length === 0) return;
    const teamsById = new Map(
      (teams.data?.teams ?? []).map((t) => [t.id, t] as const),
    );
    const stillPending = pendingRequests.filter((req) => {
      const team = teamsById.get(req.teamId);
      return resolveParticipantJoinStatus(team, myUserId) === "PENDING";
    });
    if (stillPending.length !== pendingRequests.length) {
      setPendingRequests(stillPending);
      writePendingRequests(contestId, myUserId, stillPending);
    }
  }, [teams.data?.teams, pendingRequests, myUserId, contestId, isContestIdValid]);

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
    if (justRegistered) return true;
    return participantList.some((p) => p.userId === myId);
  }, [profile.data?.id, participantList, justRegistered]);

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
                          setJustRegistered(true);
                          if (myUserId) writeRegisteredFlag(contestId, myUserId, true);
                          setActionResult(
                            data.registrationId
                              ? `Вы зарегистрированы (заявка #${data.registrationId})`
                              : "Вы успешно зарегистрированы",
                          );
                          queryClient.invalidateQueries({
                            queryKey: [getContestParticipantsKey, contestId],
                          });
                          queryClient.invalidateQueries({
                            queryKey: [getContestTeamsKey, contestId],
                          });
                        },
                        onError: (error) => {
                          const status = (
                            error as unknown as {
                              details?: { status?: number };
                            }
                          ).details?.status;
                          // 409 = заявка уже подана; считаем, что регистрация
                          // прошла ранее и просто разворачиваем UI команд.
                          if (status === 409) {
                            setActionError(null);
                            setJustRegistered(true);
                            if (myUserId)
                              writeRegisteredFlag(contestId, myUserId, true);
                            setActionResult("Вы уже зарегистрированы на конкурс");
                            queryClient.invalidateQueries({
                              queryKey: [getContestParticipantsKey, contestId],
                            });
                            queryClient.invalidateQueries({
                              queryKey: [getContestTeamsKey, contestId],
                            });
                            return;
                          }
                          handleError(
                            error as Error & {
                              details?: {
                                error?: { message?: string };
                                status?: number;
                              };
                            },
                          );
                        },
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
                        onClick={() => {
                          const teamIdForRequest = selectedTeamId;
                          requestJoin.mutate(
                            { teamId: teamIdForRequest },
                            {
                              onSuccess: (data) => {
                                setActionError(null);
                                setActionResult(
                                  "Заявка на вступление отправлена — ждите ответа лидера",
                                );
                                setSelectedTeamId(0);
                                if (data?.joinRequestId && myUserId) {
                                  const next = [
                                    ...pendingRequests.filter(
                                      (r) => r.teamId !== teamIdForRequest,
                                    ),
                                    {
                                      teamId: teamIdForRequest,
                                      joinRequestId: data.joinRequestId,
                                    },
                                  ];
                                  setPendingRequests(next);
                                  writePendingRequests(contestId, myUserId, next);
                                }
                              },
                              onError: handleError,
                            },
                          );
                        }}
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
              {teamList.map((team) => {
                const isLeader =
                  myUserId !== undefined && team.leaderId === myUserId;
                const isMember =
                  myUserId !== undefined &&
                  team.memberIds?.includes(myUserId);
                return (
                  <SListItem key={team.id}>
                    <div>
                      <SItemTitle>
                        {team.name ?? `Команда #${team.id}`}
                        {isLeader ? " · вы лидер" : ""}
                        {!isLeader && isMember ? " · вы в команде" : ""}
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
                );
              })}
            </SList>
          </SWorkspacePanel>
        )}

        {/* ── Мои заявки (визуализация PENDING / APPROVED для участника) ── */}
        {!isOrganizer && isTeamContest && pendingRequests.length > 0 && (
          <SWorkspacePanel>
            <SPanelTitle>
              Мои заявки на вступление ({pendingRequests.length})
            </SPanelTitle>
            <SList>
              {pendingRequests.map((req) => {
                const team = teamList.find((t) => t.id === req.teamId);
                const status = resolveParticipantJoinStatus(team, myUserId);
                return (
                  <SListItem key={req.joinRequestId}>
                    <div>
                      <SItemTitle>
                        {team?.name ?? `Команда #${req.teamId}`}
                      </SItemTitle>
                      <SItemMeta>
                        Заявка #{req.joinRequestId}
                        {status === "APPROVED"
                          ? " · вы приняты в команду"
                          : " · ждёт ответа лидера"}
                      </SItemMeta>
                    </div>
                    <SStatus
                      style={{ color: JOIN_REQUEST_STATUS_COLORS[status] }}
                    >
                      {JOIN_REQUEST_STATUS_LABELS[status]}
                    </SStatus>
                  </SListItem>
                );
              })}
            </SList>
            <SPanelText>
              Статус обновляется автоматически: как только лидер примет заявку,
              вы появитесь в составе команды.
            </SPanelText>
          </SWorkspacePanel>
        )}

        {/* ── Панель лидера: заявки в каждую команду, где я лидер ── */}
        {!isOrganizer &&
          isTeamContest &&
          myUserId !== undefined &&
          teamList
            .filter((team) => team.leaderId === myUserId && team.id)
            .map((team) => (
              <TeamLeaderRequestsPanel
                key={team.id}
                team={team}
                contestId={contestId}
              />
            ))}
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
