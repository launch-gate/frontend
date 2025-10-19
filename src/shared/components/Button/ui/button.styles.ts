import { Button } from "antd";
import styled from "styled-components";

import { getButtonColorStyles } from "../lib/getButtonColorStyles";
import { SButtonProps } from "../model/button.types";

export const SButton = styled(Button).attrs<SButtonProps>({})`
  &.ant-btn-variant-outlined {
    ${({ $color }) => getButtonColorStyles($color)};
    padding: 12px 32px;
    min-height: max-content;
    min-width: max-content;
  }
`;
