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
  &:hover {
    text-decoration: underline;
  }
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
