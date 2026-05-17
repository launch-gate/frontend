"use client";

import { FormEvent, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { IAuthResponse, useLogin, useRegister } from "@/entities/auth";
import {
  AccountType,
  getUserProfileKey,
  UserContactType,
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
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

import {
  SAuthForm,
  SAuthProfileGrid,
  SAuthStatus,
  SAuthValue,
  SRequiredMark,
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
  const [accountType, setAccountType] = useState<AccountType>("PARTICIPANT");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useLogin();
  const register = useRegister();
  const queryClient = useQueryClient();

  const profileData = useMemo(
    () => login.data?.user ?? register.data?.user,
    [login.data?.user, register.data?.user],
  );

  const isPending = login.isPending || register.isPending;
  const submitTitle = mode === "login" ? "Войти" : "Зарегистрироваться";

  const handleSuccess = (data: IAuthResponse) => {
    persistAuthResponse(data);
    if (data.user) queryClient.setQueryData([getUserProfileKey], data.user);
    window.dispatchEvent(new Event("auth-session-changed"));
    setErrorMessage(null);
    setMessage(
      mode === "login"
        ? "Вы вошли в аккаунт"
        : "Аккаунт создан, токен сохранён",
    );
  };

  const handleError = (error: Error) => {
    setMessage(null);
    const details = (error as { details?: Record<string, unknown> }).details;
    if (details) {
      const errorInfo = details.error as { message?: string } | undefined;
      const validation = details.validation as string[] | undefined;
      if (validation?.length) {
        setErrorMessage(validation.join(" "));
      } else if (errorInfo?.message) {
        setErrorMessage(errorInfo.message);
      } else {
        setErrorMessage("Не удалось выполнить запрос.");
      }
    } else {
      setErrorMessage(error.message || "Не удалось выполнить запрос.");
    }
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
        fullName: fullName || undefined,
        nickname: nickname || undefined,
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
    queryClient.removeQueries({ queryKey: [getUserProfileKey] });
    window.dispatchEvent(new Event("auth-session-changed"));
    setMessage("Локальная сессия очищена.");
    setErrorMessage(null);
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Вход и регистрация</SWorkspaceTitle>
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
                <span>
                  Email <SRequiredMark>*</SRequiredMark>
                </span>
                <SInput
                  required
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </SField>
              <SField>
                <span>
                  Пароль <SRequiredMark>*</SRequiredMark>
                </span>
                <SInput
                  required
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
                    <span>
                      Тип аккаунта <SRequiredMark>*</SRequiredMark>
                    </span>
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
                    <span>Никнейм</span>
                    <SInput
                      value={nickname}
                      onChange={(event) => setNickname(event.target.value)}
                    />
                  </SField>
                </SFormGrid>
                <SField>
                  <span>ФИО</span>
                  <SInput
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
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
              <SPanelText>{profileData.bio ?? "Bio не заполнено"}</SPanelText>
              <SPanelText>
                {(profileData.contacts ?? [])
                  .map((contact) =>
                    contact.type && contact.value
                      ? `${contactTypeLabels[contact.type]}: ${contact.value}`
                      : null,
                  )
                  .filter(Boolean)
                  .join(", ") || "Контакты не указаны"}
              </SPanelText>
              <SActions>
                <Link href={routes.PROFILE_PAGE}>
                  <Button color="violet">Открыть профиль</Button>
                </Link>
              </SActions>
            </>
          ) : (
            <SPanelText>
              После входа или регистрации здесь появятся данные профиля
            </SPanelText>
          )}
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
