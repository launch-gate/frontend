import styled from "styled-components";

export const SBlock = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray.fill};
`;

export const SMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const STitle = styled.div`
  ${({ theme }) => theme.font.subtitle}
`;

export const SContactsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SContact = styled.div`
  display: flex;
  gap: 10px;
`;

export const SSubInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SContactTemplate = styled.div`
  width: 26px;
  height: 26px;
  background: ${({ theme }) => theme.colors.gray.primary};
  border-radius: 12px;
`;
