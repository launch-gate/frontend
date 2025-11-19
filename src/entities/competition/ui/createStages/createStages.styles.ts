import styled from "styled-components";

export const SFormTitle = styled.div`
  ${({ theme }) => theme.font.title2}
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

export const SImgContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.violet};
  display: flex;
  flex-direction: column;
  width: min-content;
`;
