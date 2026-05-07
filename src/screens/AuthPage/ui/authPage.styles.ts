import styled from "styled-components";

export const SAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const SAuthStatus = styled.div<{ $tone: "success" | "error" }>`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid
    ${({ $tone }) => ($tone === "success" ? "#9ad7ad" : "#f1a6a6")};
  background: ${({ $tone }) => ($tone === "success" ? "#f1fbf4" : "#fff4f4")};
  color: ${({ $tone }) => ($tone === "success" ? "#236b36" : "#9b2d2d")};
  ${({ theme }) => theme.font.body};
`;

export const SAuthProfileGrid = styled.div`
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 10px 18px;
  color: ${({ theme }) => theme.colors.gray.mid};
  ${({ theme }) => theme.font.body};
`;

export const SAuthValue = styled.strong`
  min-width: 0;
  color: ${({ theme }) => theme.colors.gray.dark};
  font-weight: 500;
  word-break: break-word;
`;

export const SRequiredMark = styled.span`
  color: #c0392b;
  margin-left: 2px;
`;
