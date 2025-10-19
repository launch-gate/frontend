"use client";

import { useTranslations } from "next-intl";

import { ArrowRight, BannerLine } from "@/shared/assets";
import { Button } from "@/shared/components/Button";

import {
  SBannerContent,
  SButton,
  SButtonsFirstRow,
  SButtonsThirdRow,
  SCircleButtonsFirstRow,
  SCols,
  SColumnFlex,
  SDot,
  SDots,
  SFirstRow,
  SForthRow,
  SGradientText,
  SHomePage,
  SHomePageBanner,
  SInfoThirdRow,
  SLargeButton,
  SLine,
  SLoader,
  SLoaderBottom,
  SLoaderBottomStatus,
  SLoadingRectangle,
  SSecondRow,
  SSecondRowContent,
  SThirdRow,
} from "./homePage.styles";

export const HomePage = () => {
  const t = useTranslations("pages.homePage");

  return (
    <SHomePage>
      <SHomePageBanner>
        <SBannerContent>
          <SFirstRow>
            <SColumnFlex>
              <SButtonsFirstRow>
                <SButton color={"white"}>#{t("newLook")}</SButton>
                <SCircleButtonsFirstRow>
                  <SButton shape="circle" color={"white"}>
                    #
                  </SButton>
                  <SButton shape="circle" color={"transparentWhite"}>
                    #
                  </SButton>
                </SCircleButtonsFirstRow>
              </SButtonsFirstRow>
              <div>
                {t("platformForFirst")}
                <br />
                {t("platformForSecond")}
              </div>
            </SColumnFlex>
            <SGradientText>{t("find")}</SGradientText>
          </SFirstRow>
          <SSecondRow>
            <SGradientText>{t("create")}</SGradientText>
            <SSecondRowContent>
              <SLoader>
                <SDots>
                  <SDot />
                  <SDot />
                  <SDot />
                </SDots>
                <SLoaderBottom>
                  <SLoaderBottomStatus>
                    <div>{t("joining")}</div>
                    <div>99%</div>
                  </SLoaderBottomStatus>
                  <SCols>
                    {Array.from({ length: 20 }, (_, index) => (
                      <SLoadingRectangle key={index} />
                    ))}
                  </SCols>
                </SLoaderBottom>
              </SLoader>
              <div>circles</div>
            </SSecondRowContent>
          </SSecondRow>
          <SThirdRow>
            <SInfoThirdRow>
              <SButtonsThirdRow>
                <SButton shape={"circle"} color={"white"}>
                  <ArrowRight />
                </SButton>
                <SButton shape={"circle"} color={"transparentWhite"}>
                  #
                </SButton>
              </SButtonsThirdRow>
              <div>
                {t("weHelpFirst")}
                <br />
                {t("weHelpSecond")}
              </div>
            </SInfoThirdRow>
            <SGradientText>{t("competition")}</SGradientText>
          </SThirdRow>
          <SForthRow>
            <SLargeButton>#</SLargeButton>
            <SGradientText>{t("event")}</SGradientText>
          </SForthRow>
        </SBannerContent>
        <SLine>
          <BannerLine />
        </SLine>
      </SHomePageBanner>
    </SHomePage>
  );
};
