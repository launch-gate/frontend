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
    Form: {
      itemMarginBottom: 16,
      verticalLabelPadding: "0 0 8px",
      labelFontSize: 14,
    },
    Button: {
      borderRadius: 100,
      colorPrimaryHover: styledComponentsTheme.colors.violet,
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
    Slider: {
      colorPrimary: styledComponentsTheme.colors.violet,
      colorPrimaryBorder: styledComponentsTheme.colors.violet,
      trackBg: styledComponentsTheme.colors.violet,
      trackHoverBg: styledComponentsTheme.colors.violet,
      handleColor: styledComponentsTheme.colors.violet,
      handleActiveColor: styledComponentsTheme.colors.violet,
      dotBorderColor: `${styledComponentsTheme.colors.violet}`,
      dotActiveBorderColor: styledComponentsTheme.colors.violet,
      railBg: "#f0f0f0",
      railHoverBg: "#e1e1e1",
      handleLineWidth: 2,
      handleSize: 16,
      handleSizeHover: 18,
      controlSize: 16,
      colorTextDisabled: "#00000040",
      colorBgContainerDisabled: "#00000040",
    },
    Tabs: {
      colorPrimary: styledComponentsTheme.colors.violet,
      colorPrimaryHover: styledComponentsTheme.colors.violet,
      colorPrimaryActive: styledComponentsTheme.colors.violet,
      itemSelectedColor: styledComponentsTheme.colors.violet,
      itemHoverColor: styledComponentsTheme.colors.violet,
      itemActiveColor: styledComponentsTheme.colors.violet,
      inkBarColor: styledComponentsTheme.colors.violet,
    },
  },
});
