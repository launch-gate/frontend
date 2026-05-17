"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ParticipationMode,
  useCreateOrganizerContest,
  useGetOrganizerContests,
} from "@/entities/contest";
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
  SPanelTitle,
  SRequiredMark,
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

export const OrganizerPage = () => {
  const contests = useGetOrganizerContests();
  const createContest = useCreateOrganizerContest();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participationMode, setParticipationMode] =
    useState<ParticipationMode>("TEAM");
  const [minTeamSize, setMinTeamSize] = useState("2");
  const [maxTeamSize, setMaxTeamSize] = useState("5");
  const [registrationEndsAt, setRegistrationEndsAt] = useState("");
  const [teamBuildingEndsAt, setTeamBuildingEndsAt] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const isTeam = participationMode === "TEAM";

  const handleCreate = () => {
    const data = {
      title,
      description,
      participationMode,
      minTeamSize: isTeam && minTeamSize ? Number(minTeamSize) : undefined,
      maxTeamSize: isTeam && maxTeamSize ? Number(maxTeamSize) : undefined,
      registrationEndsAt: registrationEndsAt
        ? `${registrationEndsAt}T00:00:00Z`
        : undefined,
      teamBuildingEndsAt:
        isTeam && teamBuildingEndsAt
          ? `${teamBuildingEndsAt}T00:00:00Z`
          : undefined,
      startsAt: startsAt ? `${startsAt}T00:00:00Z` : undefined,
      endsAt: endsAt ? `${endsAt}T00:00:00Z` : undefined,
    };

    createContest.mutate(data);
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Панель организатора</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Список конкурсов, создание черновика и быстрый переход к настройке
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Новый конкурс</SPanelTitle>
          <SFormGrid>
            <SField>
              <span>Название <SRequiredMark>*</SRequiredMark></span>
              <SInput
                value={title}
                placeholder="Название конкурса"
                onChange={(e) => setTitle(e.target.value)}
              />
            </SField>
            <SField>
              <span>Формат участия <SRequiredMark>*</SRequiredMark></span>
              <SSelect
                value={participationMode}
                onChange={(e) =>
                  setParticipationMode(e.target.value as ParticipationMode)
                }
              >
                <option value="TEAM">Командный</option>
                <option value="INDIVIDUAL">Индивидуальный</option>
              </SSelect>
            </SField>
            {isTeam && (
              <>
                <SField>
                  <span>Мин. размер команды <SRequiredMark>*</SRequiredMark></span>
                  <SInput
                    type="number"
                    min={1}
                    value={minTeamSize}
                    onChange={(e) => setMinTeamSize(e.target.value)}
                  />
                </SField>
                <SField>
                  <span>Макс. размер команды <SRequiredMark>*</SRequiredMark></span>
                  <SInput
                    type="number"
                    min={1}
                    value={maxTeamSize}
                    onChange={(e) => setMaxTeamSize(e.target.value)}
                  />
                </SField>
              </>
            )}
            <SField>
              Регистрация до
              <SInput
                type="date"
                value={registrationEndsAt}
                onChange={(e) => setRegistrationEndsAt(e.target.value)}
              />
            </SField>
            {isTeam && (
              <SField>
                Сбор команд до
                <SInput
                  type="date"
                  value={teamBuildingEndsAt}
                  onChange={(e) => setTeamBuildingEndsAt(e.target.value)}
                />
              </SField>
            )}
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
          <SField>
            Описание
            <STextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              loading={createContest.isPending}
              onClick={handleCreate}
            >
              Создать конкурс
            </Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Мои конкурсы</SPanelTitle>
          <SList>
            {(contests.data?.contests ?? []).map((contest) => (
              <SListItem key={contest.id}>
                <div>
                  <SItemTitle>
                    {contest.title ?? `Конкурс #${contest.id}`}
                  </SItemTitle>
                  <SItemMeta>
                    {contest.participationMode ?? "-"} ·{" "}
                    {contest.startsAt ?? "-"} - {contest.endsAt ?? "-"}
                  </SItemMeta>
                </div>
                <SActions>
                  <SStatus>{contest.status ?? "DRAFT"}</SStatus>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <Link href={`/organizer/contests/${contest.id}`}>
                      <Button>Настроить</Button>
                    </Link>
                    <Link href={`/organizer/contests/${contest.id}/analytics`}>
                      <Button color="gray">Аналитика</Button>
                    </Link>
                  </div>
                </SActions>
              </SListItem>
            ))}
          </SList>
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
