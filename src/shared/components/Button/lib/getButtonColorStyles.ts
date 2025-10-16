import { css } from "styled-components";

import { ButtonColorType } from "../model/button.types";

export const getButtonColorStyles = ($color: ButtonColorType) => {
  switch ($color) {
    case "black":
      return css`
        background-color: ${({ theme }) => theme.colors.gray.dark};
        color: ${({ theme }) => theme.colors.white};
      `;
    case "violet":
      return css`
        background-color: ${({ theme }) => theme.colors.violet};
        color: ${({ theme }) => theme.colors.white};
      `;
    case "gray":
      return css`
        background-color: ${({ theme }) => theme.colors.gray.fill};
        color: ${({ theme }) => theme.colors.gray.dark};
      `;
    case "white":
      return css`
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.gray.dark};
      `;
    case "transparentWhite":
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.white};
      `;
  }
};
