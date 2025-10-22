import styled from "styled-components";

export const SFormTitle = styled.div`
  ${({ theme }) => theme.font.title2}
`;

export const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
