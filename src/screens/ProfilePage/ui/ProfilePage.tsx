"use client";

import { useEffect, useState } from "react";

import { useGetMyProjects } from "@/entities/project";
import {
  AccountType,
  UserContactType,
  useGetUserProfile,
  useUpdateUserProfile,
} from "@/entities/user";
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
  SPanelWide,
  SSelect,
  STextarea,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

import {
  SAccountGrid,
  SAccountLabel,
  SAccountRow,
  SAccountValue,
  SFieldLabelRow,
  SPencilHint,
  SRoleBadge,
} from "./profilePage.styles";

const accountTypeLabels: Record<AccountType, string> = {
  ORGANIZER: "Организатор",
  PARTICIPANT: "Участник",
};

const contactTypeLabels: Record<UserContactType, string> = {
  EMAIL: "Email",
  TELEGRAM: "Telegram",
  VK: "VK",
};

const PencilIcon = () => (
  <svg
    width="13"
    height="13"
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
);

type SavedValues = {
  fullName: string;
  nickname: string;
  bio: string;
  contactType: UserContactType;
  contactValue: string;
};

const defaultSaved: SavedValues = {
  fullName: "",
  nickname: "",
  bio: "",
  contactType: "TELEGRAM",
  contactValue: "",
};

export const ProfilePage = () => {
  const profile = useGetUserProfile();
  const projects = useGetMyProjects();
  const updateProfile = useUpdateUserProfile();

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [contactType, setContactType] = useState<UserContactType>("TELEGRAM");
  const [contactValue, setContactValue] = useState("");
  const [savedValues, setSavedValues] = useState<SavedValues>(defaultSaved);

  useEffect(() => {
    if (!profile.data) return;
    const primaryContact =
      profile.data.contacts?.find((c) => c.primaryContact) ??
      profile.data.contacts?.[0];
    const values: SavedValues = {
      fullName: profile.data.fullName ?? "",
      nickname: profile.data.nickname ?? "",
      bio: profile.data.bio ?? "",
      contactType: (primaryContact?.type ?? "TELEGRAM") as UserContactType,
      contactValue: primaryContact?.value ?? "",
    };
    setFullName(values.fullName);
    setNickname(values.nickname);
    setBio(values.bio);
    setContactType(values.contactType);
    setContactValue(values.contactValue);
    setSavedValues(values);
  }, [profile.data]);

  const isDirty =
    fullName !== savedValues.fullName ||
    nickname !== savedValues.nickname ||
    bio !== savedValues.bio ||
    contactType !== savedValues.contactType ||
    contactValue !== savedValues.contactValue;

  const handleSave = () => {
    updateProfile.mutate(
      {
        fullName,
        nickname,
        bio,
        contacts: contactValue.trim()
          ? [
              {
                type: contactType,
                value: contactValue.trim(),
                primaryContact: true,
              },
            ]
          : undefined,
      },
      {
        onSuccess: () => {
          setSavedValues({
            fullName,
            nickname,
            bio,
            contactType,
            contactValue,
          });
          profile.refetch();
        },
      },
    );
  };

  const activeProjects = projects.data?.activeProjects ?? [];
  const archivedProjects = projects.data?.archivedProjects ?? [];
  const accountType = profile.data?.accountType;

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
              <SFieldLabelRow>
                ФИО
                <SPencilHint>
                  <PencilIcon />
                </SPencilHint>
              </SFieldLabelRow>
              <SInput
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </SField>
            <SField>
              <SFieldLabelRow>
                Никнейм
                <SPencilHint>
                  <PencilIcon />
                </SPencilHint>
              </SFieldLabelRow>
              <SInput
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </SField>
            <SField>
              <SFieldLabelRow>
                Контакт
                <SPencilHint>
                  <PencilIcon />
                </SPencilHint>
              </SFieldLabelRow>
              <SSelect
                value={contactType}
                onChange={(e) =>
                  setContactType(e.target.value as UserContactType)
                }
              >
                <option value="TELEGRAM">Telegram</option>
                <option value="VK">VK</option>
                <option value="EMAIL">Email</option>
              </SSelect>
            </SField>
            <SField>
              <SFieldLabelRow>
                Значение контакта
                <SPencilHint>
                  <PencilIcon />
                </SPencilHint>
              </SFieldLabelRow>
              <SInput
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
              />
            </SField>
          </SFormGrid>

          <SField>
            <SFieldLabelRow>
              Bio
              <SPencilHint>
                <PencilIcon />
              </SPencilHint>
            </SFieldLabelRow>
            <STextarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </SField>

          {isDirty && (
            <SActions>
              <Button
                color="violet"
                loading={updateProfile.isPending}
                onClick={handleSave}
              >
                Сохранить
              </Button>
              <Button
                loading={profile.isFetching}
                onClick={() => profile.refetch()}
              >
                Обновить
              </Button>
            </SActions>
          )}
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Аккаунт</SPanelTitle>
          <SAccountGrid>
            {profile.data?.id !== undefined && (
              <SAccountRow>
                <SAccountLabel>ID</SAccountLabel>
                <SAccountValue>#{profile.data.id}</SAccountValue>
              </SAccountRow>
            )}
            {profile.data?.email && (
              <SAccountRow>
                <SAccountLabel>Email</SAccountLabel>
                <SAccountValue>{profile.data.email}</SAccountValue>
              </SAccountRow>
            )}
            {accountType && (
              <SAccountRow>
                <SAccountLabel>Тип</SAccountLabel>
                <SRoleBadge $role={accountType}>
                  {accountTypeLabels[accountType]}
                </SRoleBadge>
              </SAccountRow>
            )}
            {profile.data?.fullName && (
              <SAccountRow>
                <SAccountLabel>Имя</SAccountLabel>
                <SAccountValue>{profile.data.fullName}</SAccountValue>
              </SAccountRow>
            )}
            {profile.data?.nickname && (
              <SAccountRow>
                <SAccountLabel>Никнейм</SAccountLabel>
                <SAccountValue>{profile.data.nickname}</SAccountValue>
              </SAccountRow>
            )}
            {(profile.data?.contacts ?? []).map((contact, index) =>
              contact.type && contact.value ? (
                <SAccountRow key={index}>
                  <SAccountLabel>
                    {contactTypeLabels[contact.type]}
                  </SAccountLabel>
                  <SAccountValue>{contact.value}</SAccountValue>
                </SAccountRow>
              ) : null,
            )}
            {!profile.data && (
              <SAccountValue style={{ color: "rgba(152,152,152,1)" }}>
                Нет данных. Войдите в аккаунт.
              </SAccountValue>
            )}
          </SAccountGrid>
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
