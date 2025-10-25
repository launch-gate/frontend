import React, { FC } from "react";
import { RangePickerProps } from "antd/es/date-picker";

import { SDateRangePicker } from "./dateRangePicker.styles";

export const DateRangePicker: FC<RangePickerProps> = ({ ...props }) => {
  return <SDateRangePicker {...props} />;
};
