import { FC } from "react";

import { Button, Input, SliderRange, Switch } from "@/shared/components";

import {
  ICreateCompetitionFormik,
  Pair,
} from "../../model/createCompetitionFilters.types";
import {
  SFormItem,
  SFormTitle,
  SRangeInput,
  SRangeRow,
  SRangeSep,
  SRequiredStar,
} from "./createStages.styles";

export const RestrictionsCompetition: FC<ICreateCompetitionFormik> = ({
  participantAgeRange,
  isPublic,
  targetAudience,
  isTeamRequired,
  teamSizeRange,
  isCountry,
  onClearStage,
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
        <SFormTitle>Возраст участников</SFormTitle>
        <SRangeRow>
          <SRangeInput
            type="number"
            min={0}
            max={participantAgeRange.value[1]}
            value={participantAgeRange.value[0] ?? ""}
            onChange={(e) =>
              participantAgeRange.onChange([
                Math.min(Number(e.target.value), participantAgeRange.value[1]),
                participantAgeRange.value[1],
              ] as Pair<number>)
            }
          />
          <SRangeSep>—</SRangeSep>
          <SRangeInput
            type="number"
            min={participantAgeRange.value[0]}
            max={100}
            value={participantAgeRange.value[1] ?? ""}
            onChange={(e) =>
              participantAgeRange.onChange([
                participantAgeRange.value[0],
                Math.max(Number(e.target.value), participantAgeRange.value[0]),
              ] as Pair<number>)
            }
          />
          <SRangeSep>лет</SRangeSep>
        </SRangeRow>
        <SliderRange
          min={0}
          max={100}
          value={participantAgeRange.value}
          onChange={participantAgeRange.onChange}
          range
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>
          Целевая аудитория<SRequiredStar>*</SRequiredStar>
        </SFormTitle>
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

      {isTeamRequired.value && (
        <SFormItem>
          <SFormTitle>Размер команды</SFormTitle>
          <SRangeRow>
            <SRangeInput
              type="number"
              min={1}
              max={teamSizeRange.value[1]}
              value={teamSizeRange.value[0] ?? ""}
              onChange={(e) =>
                teamSizeRange.onChange([
                  Math.min(Number(e.target.value), teamSizeRange.value[1]),
                  teamSizeRange.value[1],
                ] as Pair<number>)
              }
            />
            <SRangeSep>—</SRangeSep>
            <SRangeInput
              type="number"
              min={teamSizeRange.value[0]}
              max={10}
              value={teamSizeRange.value[1] ?? ""}
              onChange={(e) =>
                teamSizeRange.onChange([
                  teamSizeRange.value[0],
                  Math.max(Number(e.target.value), teamSizeRange.value[0]),
                ] as Pair<number>)
              }
            />
            <SRangeSep>чел.</SRangeSep>
          </SRangeRow>
          <SliderRange
            min={1}
            max={10}
            value={teamSizeRange.value}
            onChange={teamSizeRange.onChange}
            range
          />
        </SFormItem>
      )}

      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch value={isCountry.value} onChange={isCountry.onChange}>
          {isCountry.placeHolder}
        </Switch>
      </SFormItem>

      <Button color="gray" onClick={onClearStage}>
        Очистить все
      </Button>
    </>
  );
};
