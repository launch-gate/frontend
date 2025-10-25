import React, { FC } from "react";
import { SliderRangeProps } from "antd/es/slider";
import { SliderSingleProps } from "antd/lib";

import { SSlider } from "./slider.styles";

export const SliderSingle: FC<SliderSingleProps> = (props) => {
  return <SSlider {...props} />;
};

export const SliderRange: FC<SliderRangeProps> = (props) => {
  return <SSlider {...props} />;
};
