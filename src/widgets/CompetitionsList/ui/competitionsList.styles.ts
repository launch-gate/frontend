import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

const shimmerBg = `
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 600px 100%;
  animation: shimmer 1.4s infinite linear;
`;

export const SSkeletonCard = styled.div`
  display: grid;
  grid-template-columns: 4fr 5fr;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  height: 200px;
`;

export const SSkeletonLeft = styled.div`
  ${shimmerBg}
  animation-name: ${shimmer};
`;

export const SSkeletonRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
`;

export const SSkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  height: ${({ $height }) => $height ?? "16px"};
  width: ${({ $width }) => $width ?? "100%"};
  border-radius: 6px;
  ${shimmerBg}
  animation-name: ${shimmer};
`;

export const SStateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 48px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  width: 100%;
`;

export const SStateTitle = styled.div`
  ${({ theme }) => theme.font.subtitle};
  color: ${({ theme }) => theme.colors.gray.dark};
  font-weight: 600;
`;

export const SStateText = styled.div`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
`;
