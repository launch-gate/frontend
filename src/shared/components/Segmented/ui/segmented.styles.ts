import { Segmented, SegmentedProps } from "antd";
import styled from "styled-components";

export const SSegmented = styled(Segmented).attrs<SegmentedProps>({})`
  &.ant-segmented {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray.primary};
    padding: 6px;
    border-radius: 50px;
  }

  .ant-segmented-group {
    gap: 10px;
  }

  .ant-segmented-item {
    border-radius: 30px;
  }

  &.ant-segmented .ant-segmented-item-label {
    padding: 10px 20px;
  }

  &.ant-segmented .ant-segmented-item-selected {
    border-radius: 30px;
    background: ${({ theme }) => theme.colors.violet};
    color: ${({ theme }) => theme.colors.white};
  }
`;
