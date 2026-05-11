import styled from "styled-components";

export const SStageActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const SIconRow = styled.div`
  display: flex;
  gap: 4px;
`;

export const SIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray.mid};
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.dark};
    border-color: ${({ theme }) => theme.colors.gray.mid};
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const STabs = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.gray.fill};
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 8px;
`;

export const STab = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.white : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.gray.dark : theme.colors.gray.mid};
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 4px rgba(0,0,0,0.10)" : "none"};
  transition: all 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.dark};
  }
`;
