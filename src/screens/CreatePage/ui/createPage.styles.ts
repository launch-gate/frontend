import styled from "styled-components";

export const SCreatePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 62px;
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

export const SFormTitle = styled.div`
  ${({ theme }) => theme.font.title2}
`;

export const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SButtonSection = styled.div`
  display: flex;
  justify-content: center;
`;
