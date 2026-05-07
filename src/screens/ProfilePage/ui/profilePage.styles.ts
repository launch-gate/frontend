import styled from "styled-components";

export const SFieldLabelRow = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SPencilHint = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray.mid};
  opacity: 0.6;
`;

export const SAccountGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SAccountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SAccountLabel = styled.span`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
  min-width: 64px;
  flex-shrink: 0;
`;

export const SAccountValue = styled.span`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
  word-break: break-word;
  min-width: 0;
`;

export const SRoleBadge = styled.span<{ $role: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  ${({ theme }) => theme.font.caption};
  background: ${({ $role, theme }) =>
    $role === "ORGANIZER" ? theme.colors.lightViolet : "#e4f5e9"};
  color: ${({ $role, theme }) =>
    $role === "ORGANIZER" ? theme.colors.violet : "#2a6e3a"};
`;
