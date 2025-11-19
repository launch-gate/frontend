import { DefaultTheme } from "styled-components";
import React from "react";

import { SuccessCircle, ErrorCircle, InfoCircle } from "@/shared/assets";

import { SIcon } from "../ui/notification.styles";
import { IToastBarItem } from "../model/toastBar.types";

export const getToastBarStyles = (
  type: IToastBarItem["type"],
  theme: DefaultTheme,
  withDescription: boolean,
) => {
  switch (type) {
    case "success":
      return {
        color: "#006C4F",
        Icon: (
          <SIcon $with={withDescription} $type={type}>
            <SuccessCircle />
          </SIcon>
        ),
        bgColor: "#D7E8E2",
      };
    case "error":
      return {
        color: "#B11B37",
        Icon: (
          <SIcon $with={withDescription} $type={type}>
            <ErrorCircle />
          </SIcon>
        ),
        bgColor: "#FFE9ED",
      };
    case "warning":
      return {
        color: "#E86100",
        Icon: (
          <SIcon $with={withDescription} $type={type}>
            <InfoCircle />
          </SIcon>
        ),
        bgColor: "#FFF0E6",
      };
    case "info":
      return {
        color: theme.colors.gray.mid,
        Icon: (
          <SIcon $with={withDescription} $type={type}>
            <InfoCircle />
          </SIcon>
        ),
        bgColor: theme.colors.gray.fill,
      };
    default:
      return {};
  }
};
