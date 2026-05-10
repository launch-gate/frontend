import styled from "styled-components";

export const SFieldLabelRow = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
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

export const SContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SContactHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SContactRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

export const SContactPrimaryLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  color: ${({ theme }) => theme.colors.gray.dark};
  ${({ theme }) => theme.font.caption};

  input {
    accent-color: ${({ theme }) => theme.colors.violet};
  }
`;

export const SContactEmpty = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray.mid};
  ${({ theme }) => theme.font.body};
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
