import styled from "styled-components";

export const SCompetitionCard = styled.div`
  display: grid;
  grid-template-columns: 4fr 5fr;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
`;

export const SCardImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray.primary};
  padding: 16px;
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
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
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
  gap: 8px;
`;

export const SGeneral = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SOrganizerText = styled.div`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SDescriptionText = styled.div`
  ${({ theme }) => theme.font.body};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
