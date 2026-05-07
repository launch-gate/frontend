import styled from "styled-components";

export const SFormTitle = styled.div`
  ${({ theme }) => theme.font.title2}
`;

export const SRequiredStar = styled.span`
  color: #c0392b;
  margin-left: 4px;
`;

export const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SPrizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

export const SPrizeItem = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.violet};
  border-radius: 28px;
`;

export const SPrizeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SPlaceLabel = styled.div`
  color: ${({ theme }) => theme.colors.violet};
`;

export const SPrizeFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 12px;
`;

export const SPrizeActions = styled.div`
  display: flex;
  justify-content: center;
`;

export const SRangeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SRangeInput = styled.input`
  width: 70px;
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

export const SRangeSep = styled.span`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

export const SCardItem = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.violet};
  border-radius: 28px;
`;

export const SCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SCardLabel = styled.div`
  color: ${({ theme }) => theme.colors.violet};
`;

export const SCardFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SCardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 12px;
`;

export const SCardActions = styled.div`
  display: flex;
  justify-content: center;
`;

export const SCardToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
`;
