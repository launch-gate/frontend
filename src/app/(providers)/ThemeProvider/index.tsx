"use client";

import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import ru from "dayjs/locale/ru";
import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ConfigProvider } from "antd";

import { getAntdTheme } from "../../(theme)/antDesignTheme";

dayjs.locale(ru);
dayjs.extend(utc);
dayjs.extend(timezone);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const styledComponentsTheme = useTheme();

  const antDesign = getAntdTheme(styledComponentsTheme);

  useEffect(() => setMounted(true), []);

  return (
    <ConfigProvider locale={ruRU} theme={antDesign}>
      {mounted && <>{children}</>}
    </ConfigProvider>
  );
};
