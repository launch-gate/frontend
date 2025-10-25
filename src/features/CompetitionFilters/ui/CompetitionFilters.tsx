import { SegmentedProps } from "antd";
import { useState } from "react";

import { Segmented, Checkbox } from "@/shared/components";

import {
  SCheckboxFilter,
  SCheckboxFiltersSection,
  SCheckboxSection,
  SCompetitionFilters,
  SFilterTitle,
} from "./competitionFilters.styles";

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
      <SCheckboxFiltersSection>
        <SCheckboxFilter>
          <SFilterTitle>Формат проведения</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>Онлайн</Checkbox>
            <Checkbox>Офлайн</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>

        <SCheckboxFilter>
          <SFilterTitle>Статус</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>Открыт</Checkbox>
            <Checkbox>Идет</Checkbox>
            <Checkbox>Закончен</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>

        <SCheckboxFilter>
          <SFilterTitle>Длительность</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>Меньше недели</Checkbox>
            <Checkbox>Меньше 2 недель</Checkbox>
            <Checkbox>Меньше месяца</Checkbox>
            <Checkbox>Тут свой фильтр</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>

        <SCheckboxFilter>
          <SFilterTitle>Предметные области</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>IT</Checkbox>
            <Checkbox>Дизайн</Checkbox>
            <Checkbox>Биология</Checkbox>
            <Checkbox>Прочее</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>

        <SCheckboxFilter>
          <SFilterTitle>Город проведения</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>Москва</Checkbox>
            <Checkbox>Санкт-Петербург</Checkbox>
            <Checkbox>Краснодар</Checkbox>
            <Checkbox>Нижний Новгород</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>

        <SCheckboxFilter>
          <SFilterTitle>Призовой фонд</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>000</Checkbox>
            <Checkbox>111</Checkbox>
            <Checkbox>222</Checkbox>
            <Checkbox>333</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>

        <SCheckboxFilter>
          <SFilterTitle>Критерия участия</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>Любой</Checkbox>
            <Checkbox>Студенты</Checkbox>
            <Checkbox>Школьники</Checkbox>
            <Checkbox>Специалисты</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>
      </SCheckboxFiltersSection>
    </SCompetitionFilters>
  );
};
