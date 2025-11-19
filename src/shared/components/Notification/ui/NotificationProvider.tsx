"use client";

import { useTheme } from "styled-components";
import React, { FC, PropsWithChildren, useMemo } from "react";
import { ArgsProps, IconType } from "antd/es/notification/interface";
import { notification } from "antd";

import { Cross } from "@/shared/assets";
import { ButtonColorType } from "@/shared/components";

import { IToastBarContext } from "../model/toastBar.types";
import {
  SCloseIcon,
  SDescription,
  STextButton,
  STitle,
} from "./notification.styles";
import { getToastBarStyles } from "../lib/getToastBarStyles";
import { NotificationContext } from "../lib/NotificationContext";

const textButtonColorMap: Record<IconType, ButtonColorType> = {
  info: "violet",
  error: "black",
  success: "violet",
  warning: "violet",
};

export const ToastBarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [api, holder] = notification.useNotification({ maxCount: 5 });
  const theme = useTheme();

  const value = useMemo<IToastBarContext>(
    () => ({
      notify: ({
        type = "success",
        message,
        description,
        duration = 8,
        button,
      }) => {
        const { color, bgColor, Icon } = getToastBarStyles(
          type,
          theme,
          !!description,
        );
        const showDescription = description || button;

        const config: ArgsProps = {
          message: (
            <STitle $showDescription={!showDescription}>{message}</STitle>
          ),
          description: showDescription && (
            <SDescription>
              {description}
              {button && (
                <STextButton color={textButtonColorMap[type]}>
                  {button.buttonText}
                </STextButton>
              )}
            </SDescription>
          ),
          duration,
          placement: "bottomLeft",
          closable: { closeIcon: <Cross /> },
          icon: Icon,
          style: {
            borderRadius: 10,
            backgroundColor: bgColor,
            color,
            position: "sticky",
            padding: 14,
            display: "flex",
            alignItems: "center",
            width: 480,
            minHeight: 68,
          },
          closeIcon: (
            <SCloseIcon>
              <Cross />
            </SCloseIcon>
          ),
        };

        api[type](config);
      },
    }),
    [api, theme],
  );

  return (
    <NotificationContext.Provider value={value}>
      {holder}
      {children}
    </NotificationContext.Provider>
  );
};
