import styled from "styled-components";
import { Input } from "antd";

export const STextArea = styled(Input.TextArea)`
  &.ant-input {
    padding: 14px 44px;
    height: auto;
    min-height: 150px;
  }
  &.ant-input-outlined:focus,
  &.ant-input-outlined:hover {
    border-color: ${({ theme }) => theme.colors.violet};
  }
`;
