import styled from "styled-components";

export const SCompetitionFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  padding: 20px 14px;
  width: 300px;
  min-width: 300px;
  height: fit-content;
`;

export const SFilterHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const SFilterActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 56px;
`;

export const SActiveCount = styled.div`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.violet};
  font-weight: 600;
  white-space: nowrap;
`;

export const SCheckboxFiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SCheckboxFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SCheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
`;

export const SFilterTitle = styled.div`
  ${({ theme }) => theme.font.body};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const SFilterScrollBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  overflow: hidden;
  padding: 8px;
`;

export const SFilterScrollList = styled.div`
  max-height: 152px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray.primary};
    border-radius: 2px;
  }
`;

export const SPrizeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px;
`;

export const SPrizeInputRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SPrizeRangeInput = styled.input`
  width: 90px;
  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
  text-align: center;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.violet};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

export const SDurationCustom = styled.div`
  padding-left: 8px;
  padding-top: 4px;
`;
