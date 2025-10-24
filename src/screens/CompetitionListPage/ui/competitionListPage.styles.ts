import styled from "styled-components";

export const SCompetitionsListPage = styled.div`
  display: flex;
  gap: 24px;
  padding: 106px 206px 0 206px;
`;

export const SFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 58px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;
  flex: 1;
`;
