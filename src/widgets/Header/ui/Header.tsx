"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { appLogo } from "@/shared/assets";
import { Button } from "@/shared/components";

import { SHeader, SHeaderActions, SHeaderMainContent } from "./header.styles";

export const Header = () => {
  const t = useTranslations("header");

  return (
    <SHeader>
      <SHeaderMainContent>
        <Image src={appLogo} alt="app-logo" width={132} />
        <SHeaderActions>
          <Button type="text">
            <Link href={"/competition"}>{t("join")}</Link>
          </Button>
          <Button type="text">
            <Link href={"/create"}>{t("create")}</Link>
          </Button>
        </SHeaderActions>
      </SHeaderMainContent>
      <div>
        <Button>{t("login")}</Button>
      </div>
    </SHeader>
  );
};
