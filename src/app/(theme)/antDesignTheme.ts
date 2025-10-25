import { ThemeConfig } from "antd/es/config-provider/context";
import { DefaultTheme } from "styled-components";

export const getAntdTheme = (
  styledComponentsTheme: DefaultTheme,
): ThemeConfig => ({
  token: {
    fontFamily: `var(--font-sansation)`,
    fontSize: 16,
    borderRadius: 12,
    lineHeight: 1,
  },
  components: {
    Button: {
      borderRadius: 100,
    },
    DatePicker: {
      colorPrimary: styledComponentsTheme.colors.violet,
      activeBorderColor: styledComponentsTheme.colors.violet,
      hoverBorderColor: styledComponentsTheme.colors.violet,
      activeShadow: `0 0 0 2px ${styledComponentsTheme.colors.violet}20`,
    },
    Select: {
      colorPrimary: styledComponentsTheme.colors.violet,
      colorPrimaryHover: styledComponentsTheme.colors.violet,
      colorPrimaryBorder: styledComponentsTheme.colors.violet,
      optionSelectedBg: `${styledComponentsTheme.colors.lightViolet}`,
      multipleItemBg: `${styledComponentsTheme.colors.lightViolet}`,
    },
    Switch: {
      colorPrimary: styledComponentsTheme.colors.violet,
      colorPrimaryHover: styledComponentsTheme.colors.violet,
      colorPrimaryBorder: styledComponentsTheme.colors.violet,
      handleBg: "#ffffff",
      trackMinWidth: 44,
      trackHeight: 22,
      handleSize: 18,
    },
  },
});
