import styled from "styled-components";

export const SCreatePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 62px;
  padding: 0 120px 40px 120px;
`;

export const SPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const STitle = styled.div`
  ${({ theme }) => theme.font.title1}
`;

export const SCloseIcon = styled.div`
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const SMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const SForm = styled.div`
  padding: 0 120px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const SFormContent = styled.div`
  display: grid;
  gap: 40px;
`;

export const SButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;
