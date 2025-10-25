import { FC, useState } from "react";

import { Input, SliderRange, Switch } from "@/shared/components";

import { ICreateCompetitionFormik } from "../../model/createCompetitionFilters.types";
import { SFormItem, SFormTitle } from "./createStages.styles";

export const RestrictionsCompetition: FC<ICreateCompetitionFormik> = () => {
  const [ageRange, setAgeRange] = useState([16, 45]);
  const [teamSize, setTeamSize] = useState([2, 5]);

  return (
    <>
      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch>Публичный ли конкурс?</Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>
          Минимальный и максимальный возраст - от {ageRange[0]} до {ageRange[1]}{" "}
          лет
        </SFormTitle>
        <SliderRange
          min={0}
          max={100}
          value={ageRange}
          onChange={setAgeRange}
          range
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Целевая аудитория</SFormTitle>
        <Input placeholder={"Напиши на кого ориентирован конкурс"} />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch>Нужна ли команда?</Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>
          Размер команды- от {teamSize[0]} до {teamSize[1]} человек
        </SFormTitle>
        <SliderRange
          min={1}
          max={10}
          value={teamSize}
          onChange={setTeamSize}
          range
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch>Вся страна участвует?</Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>Для участия</SFormTitle>
        <Input placeholder={"Для участия"} />
      </SFormItem>
    </>
  );
};
