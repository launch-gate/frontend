"use client";

import { useEffect, useState } from "react";

import { useGetMyProjects } from "@/entities/project";
import { useGetUserProfile, useUpdateUserProfile } from "@/entities/user";
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
  SPanelWide,
  STextarea,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

export const ProfilePage = () => {
  const profile = useGetUserProfile();
  const projects = useGetMyProjects();
  const updateProfile = useUpdateUserProfile();

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!profile.data) return;
    setFullName(profile.data.fullName ?? "");
    setNickname(profile.data.nickname ?? "");
    setBio(profile.data.bio ?? "");
  }, [profile.data]);

  const activeProjects = projects.data?.activeProjects ?? [];
  const archivedProjects = projects.data?.archivedProjects ?? [];

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Профиль</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Личные данные, контакты и список рабочих пространств участника или
          команды.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Данные пользователя</SPanelTitle>
          <SFormGrid>
            <SField>
              ФИО
              <SInput
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </SField>
            <SField>
              Никнейм
              <SInput
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </SField>
          </SFormGrid>
          <SField>
            Bio
            <STextarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={updateProfile.isPending}
              onClick={() => updateProfile.mutate({ fullName, nickname, bio })}
            >
              Сохранить
            </Button>
            <Button onClick={() => profile.refetch()}>Обновить</Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Аккаунт</SPanelTitle>
          <SDataBox>{JSON.stringify(profile.data ?? null, null, 2)}</SDataBox>
        </SWorkspacePanel>

        <SPanelWide>
          <SPanelTitle>Мои проекты</SPanelTitle>
          <SWorkspaceGrid>
            <SWorkspacePanel>
              <SItemTitle>Активные</SItemTitle>
              <SList>
                {activeProjects.map((project) => (
                  <SListItem key={project.id}>
                    <div>
                      <SItemTitle>Проект #{project.id}</SItemTitle>
                      <SItemMeta>
                        Конкурс: {project.contestId ?? "-"} · Команда:{" "}
                        {project.teamId ?? "-"}
                      </SItemMeta>
                    </div>
                  </SListItem>
                ))}
              </SList>
            </SWorkspacePanel>
            <SWorkspacePanel>
              <SItemTitle>Архив</SItemTitle>
              <SList>
                {archivedProjects.map((project) => (
                  <SListItem key={project.id}>
                    <div>
                      <SItemTitle>Проект #{project.id}</SItemTitle>
                      <SItemMeta>
                        Конкурс: {project.contestId ?? "-"} · Этапов:{" "}
                        {project.stages?.length ?? 0}
                      </SItemMeta>
                    </div>
                  </SListItem>
                ))}
              </SList>
            </SWorkspacePanel>
          </SWorkspaceGrid>
        </SPanelWide>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
