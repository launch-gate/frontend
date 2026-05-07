import styled from "styled-components";

export const SCompetitionsListPage = styled.div`
  display: flex;
  gap: 24px;
  padding: 170px 206px 40px 206px;
  position: relative;
`;

export const SBannerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 440px;
  overflow: hidden;
`;

export const SSearchBanner = styled.div`
  width: 100%;
  height: 440px;
  background: linear-gradient(287.17deg, #1e0492 21.86%, #09012c 87.44%);
  position: relative;
  overflow: hidden;
`;

export const SBannerWord = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  font-family: "Sansation Light", "Sansation", sans-serif;
  font-weight: 300;
  font-size: 178px;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  opacity: 0.24;
  background: linear-gradient(180deg, #937bff 0%, #3e2a99 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

export const SSearchButton = styled.div`
  background-color: ${({ theme }) => theme.colors.violet};
  color: ${({ theme }) => theme.colors.white};
  padding: 6px 20px;
  border-radius: 40px;
  cursor: pointer;
  white-space: nowrap;
  ${({ theme }) => theme.font.body};
  font-weight: 500;
  user-select: none;

  &:hover {
    opacity: 0.88;
  }
`;
