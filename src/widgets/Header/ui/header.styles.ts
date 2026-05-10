import styled from "styled-components";

export const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 20px 120px;
  background-color: #fff;

  @media (max-width: 1100px) {
    align-items: flex-start;
    flex-direction: column;
    padding: 20px 48px;
  }

  @media (max-width: 640px) {
    padding: 18px 24px;
  }
`;

export const SHeaderMainContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  min-width: 0;

  @media (max-width: 1100px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
    width: 100%;
  }
`;

export const SHeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
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

  /* кнопка не перехватывает клики — Link снаружи обрабатывает навигацию */
  .ant-btn {
    pointer-events: none;
  }
  .ant-btn-text:not(:disabled):hover {
    background-color: transparent !important;
  }
`;

export const SUserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SUserName = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  max-width: 220px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.gray.dark};
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.font.body};
`;
