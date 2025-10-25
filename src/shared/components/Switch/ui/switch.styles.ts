import styled from "styled-components";
import { Switch } from "antd";

export const SSwitch = styled(Switch)`
  &.ant-switch {
    width: 20px;
  }
`;

export const SSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SText = styled.div`
  ${({ theme }) => theme.font.body}
`;
