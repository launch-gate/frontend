import "styled-components";

import ru from "../locales/ru.json";

type Messages = typeof ru;

declare global {
  type IntlMessages = Messages;
}

export interface IFontTheme {
  title1: RuleSet<object>;
  title2: RuleSet<object>;
  subtitle: RuleSet<object>;
  body: RuleSet<object>;
  caption: RuleSet<object>;
  callout: RuleSet<object>;
}

export interface IColorsTheme {
  gray: {
    primary: string;
    dark: string;
    mid: string;
    fill: string;
  };
  white: string;
  violet: string;
  lightViolet: string;
}

export type ThemeTitleType = "light";

declare module "styled-components" {
  export interface DefaultTheme {
    title: ThemeTitleType;
    colors: IColorsTheme;
    font: IFontTheme;
  }
}
