import { useFormik } from "formik";
import { ChangeEvent, useCallback, useEffect } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { debounce } from "lodash";

import { createCompetitionStore } from "@/entities/competition";

import {
  CompetitionType,
  ICreateCompetition,
  ICreateCompetitionFormik,
  IPrize,
  ITag,
  Pair,
} from "../model/createCompetitionFilters.types";

export const useCreateCompetitionForm = (): ICreateCompetitionFormik => {
  const { createCompetitionState, setState } = createCompetitionStore();
  const onSubmit = (form: ICreateCompetition) => console.log(form);
  const { values, setValues, errors, submitForm } =
    useFormik<ICreateCompetition>({
      initialValues: createCompetitionState,
      onSubmit,
      enableReinitialize: true,
    });
  const debouncedSetState = useCallback(
    debounce((newValues: ICreateCompetition) => {
      setState(newValues);
    }, 300),
    [setState],
  );
  useEffect(() => {
    debouncedSetState(values);
  }, [values, setState]);

  const onCurrentStageChange = (currentStage: number) => {
    setValues((prev) => ({
      ...prev,
      currentStage,
    }));
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, name: e.target.value }));
  };
  const onChangeShortDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, shortDescription: e.target.value }));
  };
  const onRegistrationDateRangeChange: RangePickerProps["onChange"] = (
    dates,
  ) => {
    const dateRange = dates as [Dayjs | null, Dayjs | null] | null;
    const startDate = dateRange?.[0] ? dateRange[0].utc().valueOf() : null;
    const endDate = dateRange?.[1] ? dateRange[1].utc().valueOf() : null;
    setValues((prev) => ({
      ...prev,
      registrationDateRange: [startDate, endDate],
    }));
  };
  const onCompetitionDateRangeChange: RangePickerProps["onChange"] = (
    dates,
  ) => {
    const [start, end] = dates || [null, null];
    const startDate = start ? start.utc().valueOf() : null;
    const endDate = end ? end.utc().valueOf() : null;
    setValues((prev) => ({
      ...prev,
      competitionDateRange: [startDate, endDate],
    }));
  };
  const onResultDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    const [start, end] = dates || [null, null];
    const startDate = start ? start.utc().valueOf() : null;
    const endDate = end ? end.utc().valueOf() : null;
    setValues((prev) => ({
      ...prev,
      resultDateRange: [startDate, endDate],
    }));
  };
  const onTagInfoChange = (tags: ITag["id"][]) => {
    setValues((prev) => ({
      ...prev,
      tagInfos: tags,
    }));
  };
  const onCompetitionTypeChange = (competitionType: CompetitionType) => {
    setValues((prev) => ({
      ...prev,
      competitionType,
    }));
  };
  const onIsPublicChange = (isPublic: boolean) => {
    setValues((prev) => ({
      ...prev,
      isPublic,
    }));
  };
  const onParticipantAgeRangeChange = (participantAgeRange: Pair<number>) => {
    setValues((prev) => ({
      ...prev,
      participantAgeRange,
    }));
  };
  const onTargetAudienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, targetAudience: e.target.value }));
  };
  const onIsTeamRequiredChange = (isTeamRequired: boolean) => {
    setValues((prev) => ({
      ...prev,
      isTeamRequired,
    }));
  };
  const onTeamSizeRangeChange = (teamSizeRange: Pair<number>) => {
    setValues((prev) => ({
      ...prev,
      teamSizeRange,
    }));
  };
  const onIsCountryChange = (isCountry: boolean) => {
    setValues((prev) => ({
      ...prev,
      isCountry,
    }));
  };
  const onPrizeDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({
      ...prev,
      prizeInfo: { ...prev.prizeInfo, description: e.target.value },
    }));
  };
  const onPrizesChange = (prizes: IPrize[]) => {
    setValues((prev) => ({
      ...prev,
      prizeInfo: { ...prev.prizeInfo, prizes: prizes },
    }));
  };

  return {
    currentStage: {
      value: values.currentStage,
      onChange: onCurrentStageChange,
    },
    name: {
      value: values.name,
      onChange: onChangeName,
      placeHolder: "Например, Хакатон по продвижению проекта",
    },
    registrationDateRange: {
      value: values.registrationDateRange,
      onChange: onRegistrationDateRangeChange,
      placeholder: ["start", "end"],
    },
    competitionDateRange: {
      value: values.competitionDateRange,
      onChange: onCompetitionDateRangeChange,
      placeholder: ["start", "end"],
    },
    resultDateRange: {
      value: values.resultDateRange,
      onChange: onResultDateRangeChange,
      placeholder: ["start", "end"],
    },
    shortDescription: {
      value: values.shortDescription,
      onChange: onChangeShortDescription,
      placeHolder: "Например, Хакатон по продвижению проекта",
    },
    tagInfos: {
      value: values.tagInfos,
      onChange: onTagInfoChange,
      placeholder: "Tags",
    },
    competitionType: {
      value: values.competitionType,
      onChange: onCompetitionTypeChange,
      placeholder: "competitionType",
    },
    isPublic: {
      value: values.isPublic,
      onChange: onIsPublicChange,
      placeholder: "isPublic",
    },
    participantAgeRange: {
      value: values.participantAgeRange,
      onChange: onParticipantAgeRangeChange,
      placeholder: ["from", "to"],
    },
    targetAudience: {
      value: values.targetAudience,
      onChange: onTargetAudienceChange,
      placeholder: "targetAudience",
    },
    isTeamRequired: {
      value: values.isTeamRequired,
      onChange: onIsTeamRequiredChange,
      placeholder: "isTeamRequired",
    },
    teamSizeRange: {
      value: values.participantAgeRange,
      onChange: onTeamSizeRangeChange,
      placeholder: ["from", "to"],
    },
    isCountry: {
      value: values.isCountry,
      onChange: onIsCountryChange,
      placeHolder: "isCountry",
    },
    prizeInfo: {
      description: {
        value: values.prizeInfo.description,
        onChange: onPrizeDescriptionChange,
        placeHolder: "prizeInfo",
      },
      prizesInfo: {
        value: values.prizeInfo.prizes,
        onChange: onPrizesChange,
        placeHolder: "prizeInfo",
      },
    },
  };
};
