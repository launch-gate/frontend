"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";

import { appLogo } from "@/shared/assets";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";

import {
  SHeader,
  SHeaderActions,
  SHeaderMainContent,
  SNavItem,
} from "./header.styles";

export const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();

  const isJoinActive = pathname.startsWith(routes.COMPETITIONS_PAGE);
  const isCreateActive = pathname.startsWith(routes.CREATE_PAGE);

  return (
    <SHeader>
      <SHeaderMainContent>
        <Link href={routes.HOME_PAGE}>
          <Image src={appLogo} alt="app-logo" width={132} />
        </Link>
        <SHeaderActions>
          <SNavItem $active={isJoinActive}>
            <Button type="text">
              <Link href={routes.COMPETITIONS_PAGE}>{t("join")}</Link>
            </Button>
          </SNavItem>
          <SNavItem $active={isCreateActive}>
            <Button type="text">
              <Link href={routes.CREATE_PAGE}>{t("create")}</Link>
            </Button>
          </SNavItem>
        </SHeaderActions>
      </SHeaderMainContent>
      <div>
        <Link href={routes.AUTH_PAGE}>
          <Button>{t("login")}</Button>
        </Link>
      </div>
    </SHeader>
  );
};
