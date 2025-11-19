import styled, { css } from "styled-components";

import { Button } from "@/shared/components";

import { IToastBarItem } from "../model/toastBar.types";

export const STitle = styled.div<{ $showDescription: boolean }>`
  color: ${({ theme }) => theme.colors.gray.mid};
  ${({ theme }) => theme.font.title2};
  ${({ $showDescription }) =>
    $showDescription &&
    css`
      min-height: 40px;
      display: flex;
      align-items: center;
    `}
  body:has(&) {
    .ant-notification-notice-wrapper {
      box-shadow: none;
      background: transparent;
    }

    .ant-notification-notice-wrapper
      .ant-notification-notice-with-icon
      .ant-notification-notice-message,
    .ant-notification-notice-wrapper
      .ant-notification-notice-with-icon
      .ant-notification-notice-description {
      margin-inline-start: 50px;
    }
    .ant-notification-notice-wrapper .ant-notification-notice-description {
      margin-top: 4px;
    }
    .ant-notification-bottomLeft .ant-notification-notice {
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.06);
    }
  }
`;

export const SDescription = styled.div`
  color: ${({ theme }) => theme.colors.gray.mid};
  ${({ theme }) => theme.font.body.medium};
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-inline-end: 30px;
`;

export const SCloseIcon = styled.div`
  color: ${({ theme }) => theme.colors.gray.mid};
  align-self: center;
  display: flex;
  align-items: center;
`;

export const SIcon = styled.div<{
  $with: boolean;
  $type: IToastBarItem["type"];
}>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $with }) => {
    if ($with)
      return css`
        border-radius: 20px;
      `;
    return css`
      border-radius: 1000px;
    `;
  }}

  ${({ $type, theme }) => {
    switch ($type) {
      case "success":
        return css`
          background-color: #a3d2c1;
        `;
      case "warning":
        return css`
          background-color: #ffd2b3;
        `;
      case "info":
        return css`
          background-color: ${theme.colors.gray.mid};
        `;
      case "error":
        return css`
          background-color: #f9cac7;
        `;
      default:
        return css``;
    }
  }}

  svg {
    width: 24px;
  }
`;

export const STextButton = styled(Button).attrs({ type: "text" })`
  text-decoration-line: underline;
  line-height: 120%;
`;
