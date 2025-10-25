import styled from "styled-components";

import { AppBanner } from "@/shared/components";

export const SCompetitionsListPage = styled.div`
  display: flex;
  gap: 24px;
  padding: 106px 206px 0 206px;
  position: relative;
`;

export const SBannerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  max-height: 580px;
  overflow: hidden;
  filter: grayscale(0.4);
`;

export const SFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 58px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;
  flex: 1;
`;

export const SBanner = styled(AppBanner).attrs({ absolute: false })`
  max-height: 540px;
`;
