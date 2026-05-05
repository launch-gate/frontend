"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import { appLogo } from "@/shared/assets";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";

import { SHeader, SHeaderActions, SHeaderMainContent } from "./header.styles";

export const Header = () => {
  const t = useTranslations("header");

  return (
    <SHeader>
      <SHeaderMainContent>
        <Link href={routes.HOME_PAGE}>
          <Image src={appLogo} alt="app-logo" width={132} />
        </Link>
        <SHeaderActions>
          <Button type="text">
            <Link href={routes.COMPETITIONS_PAGE}>{t("join")}</Link>
          </Button>
          <Button type="text">
            <Link href={routes.CREATE_PAGE}>{t("create")}</Link>
          </Button>
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
