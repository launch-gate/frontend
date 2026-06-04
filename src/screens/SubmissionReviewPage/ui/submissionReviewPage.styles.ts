import styled from "styled-components";

export const SAiReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 14px;
  background:
    linear-gradient(
      135deg,
      rgba(246, 245, 255, 0.95),
      rgba(255, 255, 255, 0.96)
    ),
    ${({ theme }) => theme.colors.white};

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const SAiFieldsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SAiFieldCard = styled.div`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 14px 34px rgba(30, 30, 54, 0.07);
`;

export const SAiFieldToggle = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 18px;
  border: 0;
  background: linear-gradient(135deg, #ffffff, #fafaff);
  color: ${({ theme }) => theme.colors.gray.dark};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #fbfbff, #f3f0ff);
  }
`;

export const SAiFieldTitleBlock = styled.div`
  min-width: 0;
`;

export const SAiFieldMeta = styled.div`
  ${({ theme }) => theme.font.caption};
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SAiFieldBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

export const SAiBadge = styled.span<{ $tone?: "success" | "muted" | "score" }>`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 999px;
  ${({ theme }) => theme.font.caption};
  background: ${({ $tone, theme }) => {
    if ($tone === "success") return "#e9f8ef";
    if ($tone === "score") return theme.colors.lightViolet;
    return theme.colors.gray.fill;
  }};
  color: ${({ $tone, theme }) => {
    if ($tone === "success") return "#237344";
    if ($tone === "score") return theme.colors.violet;
    return theme.colors.gray.mid;
  }};
`;

export const SAiFieldBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 18px 18px;
`;

export const SAiCriterionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray.fill};
`;

export const SAiCriterionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const SAiCriterionTitle = styled.div`
  ${({ theme }) => theme.font.subtitle};
  color: ${({ theme }) => theme.colors.gray.dark};
  line-height: 1.35;
`;

export const SAiCriterionBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

export const SAiAnswer = styled.div`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
  line-height: 1.55;
  white-space: pre-wrap;
`;

export const SAiEvidence = styled.div`
  ${({ theme }) => theme.font.caption};
  padding: 10px 12px;
  border-left: 3px solid ${({ theme }) => theme.colors.violet};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray.mid};
  line-height: 1.45;
`;
