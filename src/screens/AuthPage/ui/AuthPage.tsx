"use client";

import { useEffect, useState } from "react";

import { useGetUserProfile } from "@/entities/user";
import { AccountType, useLogin, useRegister } from "@/entities/auth";
import { Button } from "@/shared/components";
import {
  SActions,
  SDataBox,
  SField,
  SFormGrid,
  SInput,
  SPanelText,
  SPanelTitle,
  SPanelWide,
  SSelect,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

export const AuthPage = () => {
  const [email, setEmail] = useState("participant@launchgate.local");
  const [password, setPassword] = useState("secret123");
  const [fullName, setFullName] = useState("Ivan Petrov");
  const [accountType, setAccountType] = useState<AccountType>("PARTICIPANT");

  const login = useLogin();
  const register = useRegister();
  const profile = useGetUserProfile();

  useEffect(() => {
    const token = login.data?.accessToken ?? register.data?.accessToken;
    if (token) localStorage.setItem("accessToken", token);
  }, [login.data?.accessToken, register.data?.accessToken]);

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Вход и регистрация</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Стартовая точка для участника или организатора: создание аккаунта,
          вход и проверка текущего профиля.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Доступ</SPanelTitle>
          <SFormGrid>
            <SField>
              Email
              <SInput value={email} onChange={(e) => setEmail(e.target.value)} />
            </SField>
            <SField>
              Пароль
              <SInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SField>
            <SField>
              Тип аккаунта
              <SSelect
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as AccountType)}
              >
                <option value="PARTICIPANT">Участник</option>
                <option value="ORGANIZER">Организатор</option>
              </SSelect>
            </SField>
            <SField>
              ФИО
              <SInput
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </SField>
          </SFormGrid>
          <SActions>
            <Button
              color="violet"
              loading={login.isPending}
              onClick={() => login.mutate({ email, password })}
            >
              Войти
            </Button>
            <Button
              color="gray"
              loading={register.isPending}
              onClick={() =>
                register.mutate({
                  email,
                  password,
                  accountType,
                  fullName,
                })
              }
            >
              Зарегистрироваться
            </Button>
            <Button onClick={() => profile.refetch()}>Проверить профиль</Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Текущий пользователь</SPanelTitle>
          <SPanelText>
            После успешного входа токен сохраняется локально и используется
            последующими запросами.
          </SPanelText>
          <SDataBox>
            {JSON.stringify(
              profile.data ?? login.data?.user ?? register.data?.user ?? null,
              null,
              2,
            )}
          </SDataBox>
        </SWorkspacePanel>

        <SPanelWide>
          <SPanelTitle>Ответ авторизации</SPanelTitle>
          <SDataBox>
            {JSON.stringify(login.data ?? register.data ?? null, null, 2)}
          </SDataBox>
        </SPanelWide>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
