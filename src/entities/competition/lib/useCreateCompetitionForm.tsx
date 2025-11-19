"use client";

import { useFormik } from "formik";
import { ChangeEvent, useCallback, useEffect } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

import { createCompetitionStore } from "@/entities/competition";
import { ITag } from "@/entities/tags";
import { routes } from "@/shared/config";
import { IUpload } from "@/features/UploadImage";
import { useNotify } from "@/shared/components";

import { createCompetitionValidationSchema } from "../model/createCompetitionForm.validation";
import {
  CompetitionFormatType,
  CompetitionType,
  ICreateCompetition,
  ICreateCompetitionFormik,
  IPrize,
  Pair,
} from "../model/createCompetitionFilters.types";
import { useCreateCompetition } from "../api/createCompetition";

export const useCreateCompetitionForm = (): ICreateCompetitionFormik => {
  const router = useRouter();
  const notify = useNotify();
  const { mutateAsync, isError: createCompetitionError } =
    useCreateCompetition();
  const { createCompetitionState, setState } = createCompetitionStore();
  const onSubmit = async (form: ICreateCompetition) => {
    const { currentStage, ...requestForm } = form;

    mutateAsync(requestForm)
      .then(async () => {
        notify({
          message: "Успех",
          type: "success",
          description: "Фото успешно загружено",
        });
        router.push(routes.COMPETITIONS_PAGE);
      })
      .catch((err) => {
        notify({
          message: "Ошибка",
          type: "error",
          description: "Ошибка при отправке формы",
        });
      });
  };
  const { values, setValues, errors, touched, submitForm, setFieldTouched } =
    useFormik<ICreateCompetition>({
      initialValues: createCompetitionState,
      onSubmit,
      validationSchema: createCompetitionValidationSchema,
      validateOnBlur: true,
      validateOnChange: true,
    });
  console.log(errors);
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
    setFieldTouched("name", true, true);
    setValues((prev) => ({ ...prev, name: e.target.value }));
  };
  const onChangeShortDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFieldTouched("shortDescription", true, true);
    setValues((prev) => ({ ...prev, shortDescription: e.target.value }));
  };
  const onRegistrationDateRangeChange: RangePickerProps["onChange"] = (
    dates,
  ) => {
    const dateRange = dates as [Dayjs | null, Dayjs | null] | null;
    const startDate = dateRange?.[0] ? dateRange[0].utc().valueOf() : null;
    const endDate = dateRange?.[1] ? dateRange[1].utc().valueOf() : null;
    setFieldTouched("registrationDateRange", true, true);
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
    setFieldTouched("competitionDateRange", true, true);
    setValues((prev) => ({
      ...prev,
      competitionDateRange: [startDate, endDate],
    }));
  };
  const onResultDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    const [start, end] = dates || [null, null];
    const startDate = start ? start.utc().valueOf() : null;
    const endDate = end ? end.utc().valueOf() : null;
    setFieldTouched("resultDateRange", true, true);
    setValues((prev) => ({
      ...prev,
      resultDateRange: [startDate, endDate],
    }));
  };
  const onTagInfoChange = (tags: ITag["id"][]) => {
    setFieldTouched("tagInfos", true, true);
    setValues((prev) => ({
      ...prev,
      tagInfos: tags,
    }));
  };
  const onCompetitionTypeChange = (competitionType: CompetitionType) => {
    setFieldTouched("competitionType", true, true);
    setValues((prev) => ({
      ...prev,
      competitionType,
    }));
  };
  const onCompetitionFormatChange = (
    competitionFormat: CompetitionFormatType,
  ) => {
    setFieldTouched("competitionFormat", true, true);
    setValues((prev) => ({
      ...prev,
      competitionFormat,
    }));
  };
  const onIsPublicChange = (isPublic: boolean) => {
    setFieldTouched("isPublic", true, true);
    setValues((prev) => ({
      ...prev,
      isPublic,
    }));
  };
  const onParticipantAgeRangeChange = (participantAgeRange: Pair<number>) => {
    setFieldTouched("participantAgeRange", true, true);
    setValues((prev) => ({
      ...prev,
      participantAgeRange,
    }));
  };
  const onTargetAudienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldTouched("targetAudience", true, true);
    setValues((prev) => ({ ...prev, targetAudience: e.target.value }));
  };
  const onIsTeamRequiredChange = (isTeamRequired: boolean) => {
    setFieldTouched("isTeamRequired", true, true);
    setValues((prev) => ({
      ...prev,
      isTeamRequired,
    }));
  };
  const onTeamSizeRangeChange = (teamSizeRange: Pair<number>) => {
    setFieldTouched("teamSizeRange", true, true);
    setValues((prev) => ({
      ...prev,
      teamSizeRange,
    }));
  };
  const onIsCountryChange = (isCountry: boolean) => {
    setFieldTouched("isCountry", true, true);
    setValues((prev) => ({
      ...prev,
      isCountry,
    }));
  };
  const onPrizeDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFieldTouched("prize.description", true, true);
    setValues((prev) => ({
      ...prev,
      prize: { ...prev.prize, description: e.target.value },
    }));
  };
  const onPrizesChange = (prizes: IPrize[]) => {
    setFieldTouched("prize.prizes", true, true);
    setValues((prev) => ({
      ...prev,
      prize: { ...prev.prize, prizes: prizes },
    }));
  };

  const onMainImageChange = (upload: IUpload | null) => {
    setFieldTouched("imageUrl", true, true);
    setValues((prev) => ({ ...prev, mainImageUrl: upload }));
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
      validateStatus: errors.name && "error",
      help: touched.name && errors.name,
    },
    registrationDateRange: {
      value: values.registrationDateRange,
      onChange: onRegistrationDateRangeChange,
      placeholder: ["Начало регистрации", "Конец регистрации"],
      validateStatus: errors.registrationDateRange && "error",
      help: touched.registrationDateRange && errors.registrationDateRange,
    },
    competitionDateRange: {
      value: values.competitionDateRange,
      onChange: onCompetitionDateRangeChange,
      placeholder: ["Начало конкурса", "Конец конкурса"],
      validateStatus: errors.competitionDateRange && "error",
      help: touched.competitionDateRange && errors.competitionDateRange,
    },
    resultDateRange: {
      value: values.resultDateRange,
      onChange: onResultDateRangeChange,
      placeholder: ["Начало подведения итогов", "Конец подведения итогов"],
      validateStatus: errors.resultDateRange && "error",
      help: touched.resultDateRange && errors.resultDateRange,
    },
    shortDescription: {
      value: values.shortDescription,
      onChange: onChangeShortDescription,
      placeHolder: "Краткое описание конкурса",
      validateStatus: errors.shortDescription && "error",
      help: errors.shortDescription,
    },
    tagInfos: {
      value: values.tagInfos,
      onChange: onTagInfoChange,
      placeholder: "Теги конкурса",
      validateStatus: errors.tagInfos && "error",
      help: touched.tagInfos && errors.tagInfos,
    },
    competitionType: {
      value: values.competitionType,
      onChange: onCompetitionTypeChange,
      placeholder: "Тип конкурса",
      validateStatus: errors.competitionType && "error",
      help: touched.competitionType && errors.competitionType,
    },
    competitionFormat: {
      value: values.competitionFormat,
      onChange: onCompetitionFormatChange,
      placeholder: "Тип проведения конкурса",
      validateStatus: errors.competitionFormat && "error",
      help: touched.competitionFormat && errors.competitionFormat,
    },
    isPublic: {
      value: values.isPublic,
      onChange: onIsPublicChange,
      placeholder: "Публичный ли конкурс?",
      validateStatus: errors.isPublic && "error",
      help: touched.isPublic && errors.isPublic,
    },
    participantAgeRange: {
      value: values.participantAgeRange,
      onChange: onParticipantAgeRangeChange,
      placeholder: ["Минимальный возраст", "Максимальный возраст"],
      validateStatus: errors.participantAgeRange && "error",
      help: touched.participantAgeRange && errors.participantAgeRange,
    },
    targetAudience: {
      value: values.targetAudience,
      onChange: onTargetAudienceChange,
      placeholder: "Целевая аудитория",
      validateStatus: errors.targetAudience && "error",
      help: touched.targetAudience && errors.targetAudience,
    },
    isTeamRequired: {
      value: values.isTeamRequired,
      onChange: onIsTeamRequiredChange,
      placeholder: "Нужна ли команда?",
      validateStatus: errors.isTeamRequired && "error",
      help: touched.isTeamRequired && errors.isTeamRequired,
    },
    teamSizeRange: {
      value: values.teamSizeRange,
      onChange: onTeamSizeRangeChange,
      placeholder: [
        "Минимальный размер команды",
        "Максимальный размер команды",
      ],
      validateStatus: errors.teamSizeRange && "error",
      help: touched.teamSizeRange && errors.teamSizeRange,
    },
    isCountry: {
      value: values.isCountry,
      onChange: onIsCountryChange,
      placeHolder: "Вся страна участвует?",
      validateStatus: errors.isCountry && "error",
      help: touched.isCountry && errors.isCountry,
    },
    prize: {
      description: {
        value: values.prize.description,
        onChange: onPrizeDescriptionChange,
        placeHolder: "Описание призового фонда",
        validateStatus: errors.prize?.description && "error",
        help: touched.prize?.description && errors.prize?.description,
      },
      prizesInfo: {
        value: values.prize.prizes,
        onChange: onPrizesChange,
        placeHolder: "Информация о призе",
      },
    },
    mainImageUrl: {
      value: values.mainImageUrl,
      onChange: onMainImageChange,
    },
    submitForm: submitForm,
  };
};
