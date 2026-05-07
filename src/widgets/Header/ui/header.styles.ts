import styled from "styled-components";

export const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 120px;
  background-color: #fff;
`;

export const SHeaderMainContent = styled.div`
  display: flex;
  gap: 40px;
`;

export const SHeaderActions = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

export const SNavItem = styled.div<{ $active: boolean }>`
  padding: 6px 16px;
  border-radius: 20px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.gray.primary : "transparent"};
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.primary};
  }

  /* убираем собственный hover Ant Design у кнопки внутри */
  .ant-btn-text:not(:disabled):hover {
    background-color: transparent !important;
  }
`;
