import styled from "styled-components";

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
