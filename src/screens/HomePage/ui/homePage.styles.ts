import styled from "styled-components";

import { Button } from "@/shared/components";

export const SHomePage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const SHomePageBanner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: -webkit-linear-gradient(
    287.17deg,
    #1e0492 21.86%,
    #09012c 87.44%
  );
  background: linear-gradient(287.17deg, #1e0492 21.86%, #09012c 87.44%);
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

export const SBannerContent = styled.div`
  position: relative;
  color: #fff;
  max-width: 1440px;
  width: 100%;
  justify-content: center;
  z-index: 1;
`;

export const SColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const SButtonsFirstRow = styled.div`
  display: flex;
  gap: 14px;
`;

export const SButtonsThirdRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const SInfoThirdRow = styled.div`
  display: flex;
  gap: 16px;
`;

export const SCircleButtonsFirstRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const SLine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  svg {
    height: 100%;
    width: auto;
  }
`;

export const SGradientText = styled.div`
  font-weight: 300;
  font-size: 178px;
  letter-spacing: 0;
  background: linear-gradient(180deg, #937bff 0%, #3e2a99 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

export const SFirstRow = styled.div`
  display: flex;
  gap: 128px;
  align-items: center;
`;

export const SSecondRow = styled.div`
  display: flex;
  gap: 34px;
  align-items: center;
`;

export const SThirdRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const SForthRow = styled.div`
  display: flex;
  gap: 68px;
  align-items: center;
`;

export const SSecondRowContent = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

export const SLoader = styled.div`
  padding: 16px 14px 24px 14px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  border-radius: 12px;
`;

export const SLoaderBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SLoaderBottomStatus = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 48px;
  color: ${({ theme }) => theme.colors.gray.dark};
  font-weight: 400;
`;

export const SDots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const SCols = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  overflow: hidden;
  flex: 1;
`;

export const SLoadingRectangle = styled.div`
  width: 8px;
  height: 20px;
  background: ${({ theme }) => theme.colors.gray.fill};
`;

export const SDot = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => theme.colors.gray.dark};
  border-radius: 50%;
`;

export const SLargeButton = styled(Button).attrs(() => ({
  shape: "circle",
  color: "transparentWhite",
}))`
  &.ant-btn-variant-outlined {
    height: 130px;
    width: 130px;
    font-size: 54px;
    border: 4px solid ${({ theme }) => theme.colors.white};
  }
`;
