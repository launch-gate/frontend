import styled from "styled-components";

export const SCompetitionFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 58px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray.mid}
  overflow: hidden;
  padding: 20px 14px;
`;

export const SCheckboxFiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SCheckboxFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SCheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 40px;
`;

export const SFilterTitle = styled.div`
  ${({ theme }) => theme.font.body};
  padding: 10px 20px;
`;
