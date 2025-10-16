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
  },
});
