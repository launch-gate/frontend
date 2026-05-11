"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { getUserProfileKey, useGetUserProfile } from "@/entities/user";
import { appLogo } from "@/shared/assets";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";

import {
  SHeader,
  SHeaderActions,
  SHeaderMainContent,
  SNavItem,
  SUserActions,
  SUserName,
} from "./header.styles";

const sessionChangedEvent = "auth-session-changed";

type HeaderLink = {
  href: string;
  label: string;
};

export const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  const profile = useGetUserProfile(hasSession === true);
  const accountType = profile.data?.accountType;

  useEffect(() => {
    const syncSession = () => {
      setHasSession(Boolean(localStorage.getItem("accessToken")));
    };

    syncSession();
    window.addEventListener(sessionChangedEvent, syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener(sessionChangedEvent, syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  const isAuthPage = pathname.startsWith(routes.AUTH_PAGE);

  useEffect(() => {
    if (hasSession === false && !isAuthPage) router.replace(routes.AUTH_PAGE);
  }, [hasSession, isAuthPage, router]);

  useEffect(() => {
    if (!profile.isError) return;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    queryClient.removeQueries({ queryKey: [getUserProfileKey] });
    setHasSession(false);
    if (!isAuthPage) router.replace(routes.AUTH_PAGE);
  }, [isAuthPage, profile.isError, queryClient, router]);

  const navLinks = useMemo<HeaderLink[]>(() => {
    const links: HeaderLink[] = [
      { href: routes.COMPETITIONS_PAGE, label: t("join") },
    ];

    if (accountType === "ORGANIZER") {
      links.push(
        { href: routes.ORGANIZER_PAGE, label: "Организовать" },
        { href: routes.ORGANIZER_EVALUATIONS_PAGE, label: "Назначить" },
      );
    }

    return links;
  }, [accountType, t]);

  const getIsActive = (href: string) => {
    if (href === routes.HOME_PAGE || href === routes.ORGANIZER_PAGE) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    queryClient.removeQueries({ queryKey: [getUserProfileKey] });
    setHasSession(false);
    window.dispatchEvent(new Event(sessionChangedEvent));
    router.push(routes.AUTH_PAGE);
  };

  const profileName =
    profile.data?.nickname ??
    profile.data?.fullName ??
    profile.data?.email ??
    "Профиль";

  return (
    <SHeader>
      <SHeaderMainContent>
        <Link href={routes.HOME_PAGE}>
          <Image src={appLogo} alt="app-logo" width={132} />
        </Link>
        <SHeaderActions>
          {hasSession &&
            navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <SNavItem $active={getIsActive(link.href)}>
                  <Button type="text">{link.label}</Button>
                </SNavItem>
              </Link>
            ))}
        </SHeaderActions>
      </SHeaderMainContent>
      <SUserActions>
        {hasSession ? (
          <>
            <Link href={routes.PROFILE_PAGE}>
              <SUserName>{profileName}</SUserName>
            </Link>
            <Button color="gray" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <Link href={routes.AUTH_PAGE}>
            <Button>{t("login")}</Button>
          </Link>
        )}
      </SUserActions>
    </SHeader>
  );
};
