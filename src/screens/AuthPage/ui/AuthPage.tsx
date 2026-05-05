"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

import { IAuthResponse, useLogin, useRegister } from "@/entities/auth";
import {
  AccountType,
  UserContactType,
  useGetUserProfile,
} from "@/entities/user";
import { Button, Segmented } from "@/shared/components";
import { routes } from "@/shared/config";
import {
  SActions,
  SField,
  SFormGrid,
  SInput,
  SPanelHeader,
  SPanelText,
  SPanelTitle,
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
  SAuthForm,
  SAuthProfileGrid,
  SAuthStatus,
  SAuthValue,
} from "./authPage.styles";

type AuthMode = "login" | "register";

const accountTypeLabels: Record<AccountType, string> = {
  ORGANIZER: "Организатор",
  PARTICIPANT: "Участник",
};

const contactTypeLabels: Record<UserContactType, string> = {
  EMAIL: "Email",
  TELEGRAM: "Telegram",
  VK: "VK",
};

const getOptionalValue = (value: string) => value.trim() || undefined;

const persistAuthResponse = (data: IAuthResponse) => {
  if (!data.accessToken) return;

  localStorage.setItem("accessToken", data.accessToken);
  if (data.tokenType) localStorage.setItem("tokenType", data.tokenType);
};

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("participant@launchgate.local");
  const [password, setPassword] = useState("secret123");
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("PARTICIPANT");
  const [contactType, setContactType] = useState<UserContactType>("TELEGRAM");
  const [contactValue, setContactValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useLogin();
  const register = useRegister();
  const profile = useGetUserProfile(false);

  const profileData = useMemo(
    () => profile.data ?? login.data?.user ?? register.data?.user,
    [login.data?.user, profile.data, register.data?.user],
  );

  const isPending = login.isPending || register.isPending;
  const submitTitle = mode === "login" ? "Войти" : "Зарегистрироваться";

  const handleSuccess = (data: IAuthResponse) => {
    persistAuthResponse(data);
    setErrorMessage(null);
    setMessage(
      mode === "login"
        ? "Вы вошли в аккаунт."
        : "Аккаунт создан, токен сохранён.",
    );
    profile.refetch();
  };

  const handleError = (error: Error) => {
    setMessage(null);
    setErrorMessage(error.message || "Не удалось выполнить запрос.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "login") {
      login.mutate(
        { email, password },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      );
      return;
    }

    register.mutate(
      {
        email,
        password,
        accountType,
        fullName: getOptionalValue(fullName),
        nickname: getOptionalValue(nickname),
        bio: getOptionalValue(bio),
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
        onSuccess: handleSuccess,
        onError: handleError,
      },
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    setMessage("Локальная сессия очищена.");
    setErrorMessage(null);
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Вход и регистрация</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Авторизация пользователей через новые ручки Swagger:
          POST /auth/login и POST /auth/register.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelHeader>
            <SPanelTitle>{submitTitle}</SPanelTitle>
            <Segmented
              value={mode}
              onChange={(value) => setMode(value as AuthMode)}
              options={[
                { label: "Вход", value: "login" },
                { label: "Регистрация", value: "register" },
              ]}
            />
          </SPanelHeader>

          <SAuthForm onSubmit={handleSubmit}>
            <SFormGrid>
              <SField>
                Email
                <SInput
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </SField>
              <SField>
                Пароль
                <SInput
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </SField>
            </SFormGrid>

            {mode === "register" && (
              <>
                <SFormGrid>
                  <SField>
                    Тип аккаунта
                    <SSelect
                      value={accountType}
                      onChange={(event) =>
                        setAccountType(event.target.value as AccountType)
                      }
                    >
                      <option value="PARTICIPANT">Участник</option>
                      <option value="ORGANIZER">Организатор</option>
                    </SSelect>
                  </SField>
                  <SField>
                    ФИО
                    <SInput
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                    />
                  </SField>
                  <SField>
                    Никнейм
                    <SInput
                      value={nickname}
                      onChange={(event) => setNickname(event.target.value)}
                    />
                  </SField>
                  <SField>
                    Контакт
                    <SSelect
                      value={contactType}
                      onChange={(event) =>
                        setContactType(event.target.value as UserContactType)
                      }
                    >
                      <option value="TELEGRAM">Telegram</option>
                      <option value="VK">VK</option>
                      <option value="EMAIL">Email</option>
                    </SSelect>
                  </SField>
                </SFormGrid>
                <SField>
                  Значение контакта
                  <SInput
                    value={contactValue}
                    onChange={(event) => setContactValue(event.target.value)}
                  />
                </SField>
                <SField>
                  Bio
                  <STextarea
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                </SField>
              </>
            )}

            {(message || errorMessage) && (
              <SAuthStatus $tone={errorMessage ? "error" : "success"}>
                {errorMessage ?? message}
              </SAuthStatus>
            )}

            <SActions>
              <Button color="violet" htmlType="submit" loading={isPending}>
                {submitTitle}
              </Button>
              <Button
                color="gray"
                htmlType="button"
                loading={profile.isFetching}
                onClick={() => profile.refetch()}
              >
                Обновить профиль
              </Button>
              <Button color="gray" htmlType="button" onClick={handleLogout}>
                Выйти
              </Button>
            </SActions>
          </SAuthForm>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Текущий пользователь</SPanelTitle>
          {profileData ? (
            <>
              <SAuthProfileGrid>
                <span>ID</span>
                <SAuthValue>{profileData.id ?? "-"}</SAuthValue>
                <span>Email</span>
                <SAuthValue>{profileData.email ?? "-"}</SAuthValue>
                <span>Тип</span>
                <SAuthValue>
                  {profileData.accountType
                    ? accountTypeLabels[profileData.accountType]
                    : "-"}
                </SAuthValue>
                <span>Имя</span>
                <SAuthValue>{profileData.fullName ?? "-"}</SAuthValue>
                <span>Никнейм</span>
                <SAuthValue>{profileData.nickname ?? "-"}</SAuthValue>
              </SAuthProfileGrid>
              <SPanelText>{profileData.bio ?? "Bio не заполнено."}</SPanelText>
              <SPanelText>
                {(profileData.contacts ?? [])
                  .map((contact) =>
                    contact.type && contact.value
                      ? `${contactTypeLabels[contact.type]}: ${contact.value}`
                      : null,
                  )
                  .filter(Boolean)
                  .join(", ") || "Контакты не указаны."}
              </SPanelText>
              <SActions>
                <Link href={routes.PROFILE_PAGE}>
                  <Button color="violet">Открыть профиль</Button>
                </Link>
              </SActions>
            </>
          ) : (
            <SPanelText>
              После входа или регистрации здесь появятся данные профиля.
            </SPanelText>
          )}
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
