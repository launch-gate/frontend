import { Segmented, SegmentedProps } from "antd";
import styled from "styled-components";

export const SSegmented = styled(Segmented).attrs<SegmentedProps>({})`
  &.ant-segmented {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray.primary};
    padding: 4px;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: none;
    width: 100%;
  }

  .ant-segmented-group {
    gap: 4px;
    width: 100%;
  }

  .ant-segmented-item {
    border-radius: 30px;
    flex: 1;
    text-align: center;
  }

  &.ant-segmented .ant-segmented-item-label {
    padding: 6px 12px;
  }

  &.ant-segmented .ant-segmented-item-selected {
    border-radius: 30px;
    background: ${({ theme }) => theme.colors.violet};
    color: ${({ theme }) => theme.colors.white};
  }

  &.ant-segmented .ant-segmented-thumb {
    border-radius: 30px;
    background: ${({ theme }) => theme.colors.violet};
    box-shadow: none;
  }
`;
