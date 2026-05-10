"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useGetMyProjects } from "@/entities/project";
import {
  AccountType,
  IUserProfileResponse,
  UserContactType,
  useGetUserProfile,
  useUpdateUserProfile,
} from "@/entities/user";
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
  SContactEmpty,
  SContactHeader,
  SContactList,
  SContactPrimaryLabel,
  SContactRow,
  SContactSection,
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

type EditableContact = {
  type: UserContactType;
  value: string;
  primaryContact: boolean;
};

type SavedValues = {
  fullName: string;
  nickname: string;
  bio: string;
  contacts: EditableContact[];
};

const defaultSaved: SavedValues = {
  fullName: "",
  nickname: "",
  bio: "",
  contacts: [],
};

const normalizeContacts = (contacts: EditableContact[]): EditableContact[] =>
  contacts
    .map((contact) => ({
      type: contact.type,
      value: contact.value.trim(),
      primaryContact: contact.primaryContact,
    }))
    .filter((contact) => Boolean(contact.value));

const getSavedValues = (profileData: IUserProfileResponse): SavedValues => ({
  fullName: profileData.fullName ?? "",
  nickname: profileData.nickname ?? "",
  bio: profileData.bio ?? "",
  contacts:
    profileData.contacts?.flatMap((contact) =>
      contact.type && contact.value
        ? [
            {
              type: contact.type,
              value: contact.value,
              primaryContact: Boolean(contact.primaryContact),
            },
          ]
        : [],
    ) ?? [],
});

const areContactsEqual = (left: EditableContact[], right: EditableContact[]) =>
  left.length === right.length &&
  left.every(
    (contact, index) =>
      contact.type === right[index]?.type &&
      contact.value === right[index]?.value &&
      contact.primaryContact === right[index]?.primaryContact,
  );

export const ProfilePage = () => {
  const profile = useGetUserProfile();
  const projects = useGetMyProjects();
  const updateProfile = useUpdateUserProfile();

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [contacts, setContacts] = useState<EditableContact[]>([]);
  const [savedValues, setSavedValues] = useState<SavedValues>(defaultSaved);

  useEffect(() => {
    if (!profile.data) return;
    const values = getSavedValues(profile.data);
    setFullName(values.fullName);
    setNickname(values.nickname);
    setBio(values.bio);
    setContacts(values.contacts);
    setSavedValues(values);
  }, [profile.data]);

  const preparedContacts = normalizeContacts(contacts);

  const isDirty =
    fullName !== savedValues.fullName ||
    nickname !== savedValues.nickname ||
    bio !== savedValues.bio ||
    !areContactsEqual(preparedContacts, savedValues.contacts);

  const handleAddContact = () => {
    setContacts((current) => [
      ...current,
      {
        type: "TELEGRAM",
        value: "",
        primaryContact: current.length === 0,
      },
    ]);
  };

  const handleContactChange = (
    index: number,
    patch: Partial<EditableContact>,
  ) => {
    setContacts((current) =>
      current.map((contact, contactIndex) =>
        contactIndex === index ? { ...contact, ...patch } : contact,
      ),
    );
  };

  const handlePrimaryContactChange = (index: number) => {
    setContacts((current) =>
      current.map((contact, contactIndex) => ({
        ...contact,
        primaryContact: contactIndex === index,
      })),
    );
  };

  const handleRemoveContact = (index: number) => {
    setContacts((current) => {
      const next = current.filter((_, contactIndex) => contactIndex !== index);
      if (!current[index]?.primaryContact || next.length === 0) return next;

      return next.map((contact, contactIndex) => ({
        ...contact,
        primaryContact: contactIndex === 0,
      }));
    });
  };

  const handleSave = () => {
    updateProfile.mutate(
      {
        fullName,
        nickname,
        bio,
        contacts: preparedContacts,
      },
      {
        onSuccess: (data) => {
          const values = getSavedValues(data);
          setFullName(values.fullName);
          setNickname(values.nickname);
          setBio(values.bio);
          setContacts(values.contacts);
          setSavedValues(values);
        },
      },
    );
  };

  const activeProjects = projects.data?.activeProjects ?? [];
  const archivedProjects = projects.data?.archivedProjects ?? [];
  const accountType = profile.data?.accountType;
  const isOrganizer = accountType === "ORGANIZER";

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Профиль</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Личные данные, контакты и список рабочих пространств участника или
          команды.
        </SWorkspaceSubtitle>
        {profile.data && (
          <SActions>
            {isOrganizer && (
              <>
                <Link href={routes.ORGANIZER_PAGE}>
                  <Button>Панель организатора</Button>
                </Link>
                <Link href={routes.MENTOR_PAGE}>
                  <Button>Кабинет ментора</Button>
                </Link>
                <Link href={routes.EXPERT_PAGE}>
                  <Button>Кабинет эксперта</Button>
                </Link>
              </>
            )}
          </SActions>
        )}
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

          <SContactSection>
            <SContactHeader>
              <SFieldLabelRow>
                Контакты
                <SPencilHint>
                  <PencilIcon />
                </SPencilHint>
              </SFieldLabelRow>
              <Button color="gray" htmlType="button" onClick={handleAddContact}>
                Добавить контакт
              </Button>
            </SContactHeader>

            {contacts.length > 0 ? (
              <SContactList>
                {contacts.map((contact, index) => (
                  <SContactRow key={index}>
                    <SField>
                      <span>Тип</span>
                      <SSelect
                        value={contact.type}
                        onChange={(e) =>
                          handleContactChange(index, {
                            type: e.target.value as UserContactType,
                          })
                        }
                      >
                        <option value="TELEGRAM">Telegram</option>
                        <option value="VK">VK</option>
                        <option value="EMAIL">Email</option>
                      </SSelect>
                    </SField>
                    <SField>
                      <span>Значение</span>
                      <SInput
                        value={contact.value}
                        onChange={(e) =>
                          handleContactChange(index, {
                            value: e.target.value,
                          })
                        }
                      />
                    </SField>
                    <SContactPrimaryLabel>
                      <input
                        type="radio"
                        name="profile-primary-contact"
                        checked={contact.primaryContact}
                        onChange={() => handlePrimaryContactChange(index)}
                      />
                      Основной
                    </SContactPrimaryLabel>
                    <Button
                      color="gray"
                      htmlType="button"
                      onClick={() => handleRemoveContact(index)}
                    >
                      Удалить
                    </Button>
                  </SContactRow>
                ))}
              </SContactList>
            ) : (
              <SContactEmpty>Контакты не добавлены.</SContactEmpty>
            )}
          </SContactSection>

          {isDirty && (
            <SActions>
              <Button
                color="violet"
                loading={updateProfile.isPending}
                onClick={handleSave}
              >
                Сохранить
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
