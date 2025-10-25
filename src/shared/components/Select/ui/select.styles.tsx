import styled from "styled-components";
import { Select } from "antd";

import { Cross } from "@/shared/assets";

export const SSelect = styled(Select).attrs((props) => ({
  allowClear: props.allowClear === false ? false : { clearIcon: <Cross /> },
}))`
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  &.ant-select-multiple .ant-select-selector {
    border-radius: 60px;
    padding: 14px 44px;
    height: fit-content;
  }

  &.ant-select-single {
    height: unset;
  }

  &.ant-select-multiple
    .ant-select-selection-overflow
    .ant-select-selection-item {
    margin-inline-end: 10px;
  }

  .ant-select-clear {
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colors.gray.dark};
    inset-inline-end: 44px;

    &:hover {
      color: ${({ theme }) => theme.colors.violet};
    }
  }

  &.ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector:after,
  &.ant-select-single .ant-select-selector .ant-select-selection-item,
  &.ant-select-single .ant-select-selector .ant-select-selection-wrap:after {
    line-height: unset;
  }

  .ant-select-arrow {
    display: none;
  }
`;
