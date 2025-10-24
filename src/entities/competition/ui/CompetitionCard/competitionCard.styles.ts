import styled from "styled-components";

export const SCompetitionCard = styled.div`
  display: grid;
  grid-template-columns: 4fr 5fr;
  border-radius: 12px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
`;

export const SCardImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray.primary};
  padding: 16px;
  border-radius: inherit;
`;

export const STagsSection = styled.div`
  display: flex;
  gap: 12px;
`;

export const SParticipantsNumber = styled.div`
  ${({ theme }) => theme.font.body}
`;

export const SMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 74px;
  padding: 24px;
`;

export const SMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const STitle = styled.div`
  ${({ theme }) => theme.font.title2}
`;

export const SSubTitle = styled.div`
  display: flex;
  gap: 58px;
`;

export const SSubtitleText = styled.div`
  ${({ theme }) => theme.font.subtitle}
`;

export const SGeneralInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

export const SGeneral = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SGeneralText = styled.div`
  ${({ theme }) => theme.font.body}
`;
