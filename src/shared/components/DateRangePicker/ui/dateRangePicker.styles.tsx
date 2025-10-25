import styled from "styled-components";
import { DatePicker } from "antd";
import React from "react";

import { Cross } from "@/shared/assets";

export const SDateRangePicker = styled(DatePicker.RangePicker).attrs({
  allowClear: { clearIcon: <Cross /> },
})`
  &.ant-picker {
    padding: 14px 44px;
    border-radius: 60px;
  }

  &.ant-picker-range .ant-picker-clear {
    inset-inline-end: 44px;
  }

  .ant-picker-clear {
    background: transparent;
    color: ${(props) => props.theme.colors.violet}; /* ваш цвет */

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;
