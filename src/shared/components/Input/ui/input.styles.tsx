import styled from "styled-components";
import { Input } from "antd";

import { Cross } from "@/shared/assets";

export const SInput = styled(Input).attrs((props) => ({
  allowClear: {
    clearIcon: <Cross />,
  },
}))`
  &.ant-input-affix-wrapper {
    border-radius: 60px;
    padding: 14px 44px;
  }

  &.ant-input-outlined:hover,
  &.ant-input-outlined:focus-within {
    border-color: ${({ theme }) => theme.colors.violet};
    box-shadow: none;
  }

  &.ant-input-affix-wrapper .ant-input-clear-icon {
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colors.gray.dark};

    &:hover {
      color: ${({ theme }) => theme.colors.violet};
    }
  }
`;
