import styled from "styled-components";

export const SPage = styled.div`
  background: ${({ theme }) => theme.colors.white};
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 120px;
  padding-top: 40px;
`;

export const SContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 120px;
  padding-top: 40px;
  padding-bottom: 40px;
`;

export const SImgTemplate = styled.div`
  width: 100%;
  height: 370px;
  background: ${({ theme }) => theme.colors.gray.primary};
  border-radius: 12px;
`;

export const SBlocksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SBlock = styled.div`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.fill};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SBlockTitle = styled.div`
  ${({ theme }) => theme.font.title2};
`;
