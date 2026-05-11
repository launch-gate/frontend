import styled from "styled-components";

export const SFieldCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  background: ${({ theme }) => theme.colors.white};
`;

export const SFieldHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const SFieldTitle = styled.div`
  ${({ theme }) => theme.font.body};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const SFieldMeta = styled.div`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SFieldHint = styled.div`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
  font-style: italic;
`;

export const SFieldExample = styled.div`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.violet};
`;

export const SFieldBadge = styled.span<{ $required?: boolean }>`
  ${({ theme }) => theme.font.caption};
  padding: 2px 8px;
  border-radius: 20px;
  background: ${({ $required, theme }) =>
    $required ? theme.colors.lightViolet : theme.colors.gray.fill};
  color: ${({ $required, theme }) =>
    $required ? theme.colors.violet : theme.colors.gray.mid};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const SResourceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  background: ${({ theme }) => theme.colors.white};
`;

export const SResourceTitle = styled.div`
  ${({ theme }) => theme.font.body};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const SResourceDesc = styled.div`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
  line-height: 1.4;
`;

export const SResourceLink = styled.a`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.violet};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

export const SGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const SMetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray.fill};
`;

export const SMetaLabel = styled.div`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SMetaValue = styled.div`
  ${({ theme }) => theme.font.body};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

/* ─── Form ─────────────────────────────────────────────────────────────── */

export const SFormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SFormLabel = styled.label`
  ${({ theme }) => theme.font.body};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const SFormHint = styled.div`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SFormTextarea = styled.textarea<{ $disabled?: boolean }>`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
  resize: vertical;
  outline: none;
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.gray.fill : theme.colors.white};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "text")};
  &:focus {
    border-color: ${({ theme }) => theme.colors.violet};
  }
`;

export const SFormInput = styled.input<{ $disabled?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
  outline: none;
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.gray.fill : theme.colors.white};
  &:focus {
    border-color: ${({ theme }) => theme.colors.violet};
  }
`;

export const SFormSelect = styled.select<{ $disabled?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
  outline: none;
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.gray.fill : theme.colors.white};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

export const SSubmitRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
`;

/* ─── Badges ────────────────────────────────────────────────────────────── */

export const SSubmittedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.lightViolet};
  color: ${({ theme }) => theme.colors.violet};
  ${({ theme }) => theme.font.caption};
  font-weight: 600;
`;

export const SDeadlineBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 20px;
  background: #fff0f0;
  color: #d93025;
  ${({ theme }) => theme.font.caption};
  font-weight: 600;
`;

export const SEliminatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  background: #fff8e1;
  color: #f59e0b;
  ${({ theme }) => theme.font.caption};
  font-weight: 600;
`;

/* ─── Navigation ────────────────────────────────────────────────────────── */

export const SStageNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 4px;
`;

export const SStageNavLabel = styled.div`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
  text-align: center;
`;

/* ─── Access block ──────────────────────────────────────────────────────── */

export const SAccessBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray.fill};
  text-align: center;
`;

export const SAccessTitle = styled.div`
  ${({ theme }) => theme.font.body};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const SAccessText = styled.div`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
`;
