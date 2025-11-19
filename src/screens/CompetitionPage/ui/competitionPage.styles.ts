import styled from "styled-components";

export const SCompetitionPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 38px 120px 0 120px;
  gap: 40px;
  background: ${({ theme }) => theme.colors.gray.fill};
`;

export const STopBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  background: ${({ theme }) => theme.colors.gray.fill};
`;

export const SName = styled.div`
  ${({ theme }) => theme.font.title2}
`;

export const SMainContent = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 5fr 2fr;
`;

export const SImgTemplate = styled.div.attrs<{ $mainImageUrl: string }>({})`
  width: 100%;
  height: 428px;
  background: ${({ theme }) => theme.colors.gray.primary};
  background-image: url(${({ $mainImageUrl }) => $mainImageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const SMainContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
`;

export const SMainContentTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 74px;
`;

export const SMainContentTextSubInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

export const SInfoMainSection = styled.div`
  display: flex;
  gap: 58px;
`;

export const SInfoAdditionalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const STagsSection = styled.div`
  display: flex;
  gap: 12px;
`;
