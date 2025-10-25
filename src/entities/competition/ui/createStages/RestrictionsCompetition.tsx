import { FC, useState } from "react";

import { Input, SliderRange, Switch } from "@/shared/components";

import { ICreateCompetitionFormik } from "../../model/createCompetitionFilters.types";
import { SFormItem, SFormTitle } from "./createStages.styles";

export const RestrictionsCompetition: FC<ICreateCompetitionFormik> = ({
  participantAgeRange,
  isPublic,
  targetAudience,
  isTeamRequired,
  teamSizeRange,
  isCountry,
}) => {
  return (
    <>
      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch value={isPublic.value} onChange={isPublic.onChange}>
          {isPublic.placeholder}
        </Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>
          Минимальный и максимальный возраст - от {participantAgeRange.value[0]}{" "}
          до {participantAgeRange.value[1]} лет
        </SFormTitle>
        <SliderRange
          min={0}
          max={100}
          value={participantAgeRange.value}
          onChange={participantAgeRange.onChange}
          range
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Целевая аудитория</SFormTitle>
        <Input
          placeholder={targetAudience.placeholder}
          value={targetAudience.value}
          onChange={targetAudience.onChange}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch value={isTeamRequired.value} onChange={isTeamRequired.onChange}>
          {isTeamRequired.placeholder}
        </Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>
          Размер команды- от {teamSizeRange.value[0]} до{" "}
          {teamSizeRange.value[1]} человек
        </SFormTitle>
        <SliderRange
          min={1}
          max={10}
          value={teamSizeRange.value}
          onChange={teamSizeRange.onChange}
          range
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch value={isCountry.value} onChange={isCountry.onChange}>
          {isCountry.placeHolder}
        </Switch>
      </SFormItem>
    </>
  );
};
