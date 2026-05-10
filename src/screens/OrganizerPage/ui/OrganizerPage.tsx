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

  const [title, setTitle] = useState("Launch Gate AI Challenge");
  const [description, setDescription] = useState("");
  const [participationMode, setParticipationMode] =
    useState<ParticipationMode>("TEAM");
  const [registrationEndsAt, setRegistrationEndsAt] = useState("2026-05-20");
  const [startsAt, setStartsAt] = useState("2026-05-01");
  const [endsAt, setEndsAt] = useState("2026-06-15");

  const handleCreate = () => {
    const data = {
      title,
      description,
      participationMode,
      registrationEndsAt,
      startsAt,
      endsAt,
    };

    createContest.mutate(data);
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Панель организатора</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Список конкурсов, создание черновика и быстрый переход к настройке.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Новый конкурс</SPanelTitle>
          <SFormGrid>
            <SField>
              Название
              <SInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </SField>
            <SField>
              Формат участия
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
            <SField>
              Регистрация до
              <SInput
                type="date"
                value={registrationEndsAt}
                onChange={(e) => setRegistrationEndsAt(e.target.value)}
              />
            </SField>
            <SField>
              Даты конкурса
              <SInput
                type="date"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
              />
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
