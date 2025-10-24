import { SegmentedProps } from "antd";
import { useState } from "react";

import { Segmented } from "@/shared/components";

import { SCompetitionFilters } from "./competitionFilters.styles";

export type IITem = "competition" | "event";

const options: SegmentedProps["options"] = [
  {
    label: "Конкурсы",
    value: "competition",
  },
  {
    label: "Событие",
    value: "event",
  },
];

export const CompetitionFilters = () => {
  const [option, setOptions] = useState<IITem>("competition");
  const handleSwitch = (value: unknown) => {
    const item = value as IITem;
    setOptions(item);
  };

  return (
    <SCompetitionFilters>
      <div>
        <Segmented value={option} options={options} onChange={handleSwitch} />
      </div>
      <div>filters</div>
    </SCompetitionFilters>
  );
};
