import { css, DefaultTheme } from "styled-components";

import { IFontTheme, IColorsTheme } from "@/types";

const lightThemeColors: IColorsTheme = {
  gray: {
    primary: "rgba(230, 230, 230, 1)",
    dark: "rgba(19, 19, 19, 1)",
    mid: "rgba(152, 152, 152, 1)",
    fill: "rgba(245, 245, 245, 1)",
  },
  white: "rgba(255, 255, 255, 1)",
  violet: "rgba(30, 4, 146, 1)",
  lightViolet: "#D1CCEF",
};

const AppFonts = {
  Sansation: "var(--font-sansation)",
};

export const font: IFontTheme = {
  title1: css`
    font-family: ${AppFonts.Sansation};
    font-weight: 400;
    font-size: 48px;
    line-height: 1;
    letter-spacing: 0;
  `,
  title2: css`
    font-family: ${AppFonts.Sansation};
    font-weight: 400;
    font-size: 32px;
    line-height: 1;
    letter-spacing: 0;
  `,
  subtitle: css`
    font-family: ${AppFonts.Sansation};
    font-weight: 400;
    font-size: 20px;
    line-height: 1;
    letter-spacing: 0;
  `,
  body: css`
    font-family: ${AppFonts.Sansation};
    font-weight: 400;
    font-size: 16px;
    line-height: 1;
    letter-spacing: 0;
  `,
  caption: css`
    font-family: ${AppFonts.Sansation};
    font-weight: 400;
    font-size: 12px;
    line-height: 1;
    letter-spacing: 0;
  `,
  callout: css`
    font-family: ${AppFonts.Sansation};
    font-weight: 400;
    font-size: 10px;
    line-height: 1;
    letter-spacing: 0;
  `,
};

export const themeLight: DefaultTheme = {
  title: "light",
  colors: lightThemeColors,
  font,
};
