import { Steps } from "antd";
import styled from "styled-components";

export const SSteps = styled(Steps)`
  @keyframes shake {
    0%,
    100% {
      transform: translate(0, 0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate(2px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translate(-2px);
    }
  }

  .ant-steps-item-active .ant-steps-item-icon {
    border: 1px solid ${({ theme }) => theme.colors.violet};
    box-shadow: 0px 0px 0px 2px rgba(62, 42, 153, 0.22);
  }

  .ant-steps-item-active .ant-steps-item-icon > .ant-steps-icon {
    color: ${({ theme }) => theme.colors.violet};
    font-weight: 500;
  }

  .ant-steps-item-icon .ant-steps-finish-icon {
    top: 2px;
  }

  .ant-steps-item-active .ant-steps-item-icon {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.violet};
  }

  &.ant-steps.ant-steps-with-progress
    .ant-steps-item-process
    .ant-steps-item-container
    .ant-steps-item-icon
    .ant-steps-icon {
    color: ${({ theme }) => theme.colors.violet};
  }

  .shake-animation {
    animation: shake 1s ease-in-out forwards;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: ${({ theme }) => theme.colors.violet};
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${({ theme }) => theme.colors.white};
  }

  &.ant-steps.ant-steps-label-vertical .ant-steps-item-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ant-steps-item-title {
    line-height: unset;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    background: ${({ theme }) => theme.colors.violet};
  }

  .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content {
    & > .ant-steps-item-title {
      color: initial;
    }
  }

  &.ant-steps .ant-steps-item-wait .ant-steps-item-icon {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.gray.mid};
  }

  .ant-progress-inner:not(.ant-progress-circle-gradient)
    .ant-progress-circle-path {
    stroke: ${({ theme }) => theme.colors.violet} !important;
  }
`;
