import styled from "styled-components";
import { Breadcrumb } from "antd";

export const SBreadcrumb = styled(Breadcrumb)`
  font-size: 14px;
  padding: 0 120px 20px 120px;

  &.ant-breadcrumb {
    li {
      display: flex;
      align-items: center;
    }

    & .ant-breadcrumb-link {
      & a {
        transition: background-color 0.25s;
        color: inherit;
        height: max-content;
        padding: 4px;
      }
    }
  }
`;
