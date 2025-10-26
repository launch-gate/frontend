import { SelectProps } from "antd";
import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Input, Select, TextArea, DateRangePicker } from "@/shared/components";

import {
  DateType,
  ICreateCompetitionFormik,
  Pair,
} from "../../model/createCompetitionFilters.types";
import { SFormItem, SFormTitle } from "./createStages.styles";

const tagOptions: SelectProps["options"] = [
  { label: "Tag1", value: 1 },
  { label: "Tag2", value: 2 },
  { label: "Tag3", value: 3 },
  { label: "Tag4", value: 4 },
];

const organisationsOptions: SelectProps["options"] = [
  { label: "Компания1", value: 1 },
  { label: "Компания2", value: 2 },
  { label: "Компания3", value: 3 },
  { label: "Компания4", value: 4 },
  { label: "Компания5", value: 5 },
];

const competitionTypeOptions: SelectProps["options"] = [
  { label: "Хакатона", value: "HACKATHON" },
  { label: "Идеатон", value: "IDEATON" },
  { label: "Исследование", value: "RESEARCH" },
];

const competitionFormatOptions: SelectProps["options"] = [
  { label: "Онлнай", value: "ONLINE" },
  { label: "Оффлайн", value: "OFFLINE" },
  { label: "Гибридный формат", value: "HYBRID" },
];

const managersOptions: SelectProps["options"] = [
  { label: "Менеджер Иван", value: "1" },
  { label: "Менеджер Алиса", value: "2" },
  { label: "Менеджер Игорь", value: "3" },
  { label: "Менеджер Алексей", value: "4" },
];

export const BasicsCompetition: FC<ICreateCompetitionFormik> = ({
  name,
  registrationDateRange,
  competitionDateRange,
  resultDateRange,
  shortDescription,
  tagInfos,
  competitionType,
  competitionFormat,
}) => {
  const timestampsToDayjs = (
    timestamps: Pair<DateType>,
  ): [Dayjs | null, Dayjs | null] => {
    return [
      timestamps[0] ? dayjs(timestamps[0]) : null,
      timestamps[1] ? dayjs(timestamps[1]) : null,
    ];
  };
  return (
    <>
      <SFormItem>
        <SFormTitle>Название</SFormTitle>
        <Input
          placeholder={name.placeHolder}
          value={name.value}
          onChange={name.onChange}
          help={name.help}
          validateStatus={name.validateStatus}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Даты регистрации</SFormTitle>
        <DateRangePicker
          placeholder={registrationDateRange.placeholder}
          value={timestampsToDayjs(registrationDateRange.value)}
          onChange={registrationDateRange.onChange}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Даты конкурса</SFormTitle>
        <DateRangePicker
          placeholder={competitionDateRange.placeholder}
          value={timestampsToDayjs(competitionDateRange.value)}
          onChange={competitionDateRange.onChange}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Даты подведения итогов</SFormTitle>
        <DateRangePicker
          placeholder={resultDateRange.placeholder}
          value={timestampsToDayjs(resultDateRange.value)}
          onChange={resultDateRange.onChange}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Краткое описание</SFormTitle>
        <TextArea
          size="large"
          placeholder={shortDescription.placeHolder}
          value={shortDescription.value}
          onChange={shortDescription.onChange}
          validateStatus={shortDescription.validateStatus}
          help={shortDescription.help}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Теги конкурса</SFormTitle>
        <Select
          mode="multiple"
          options={tagOptions}
          placeholder={tagInfos.placeholder}
          value={tagInfos.value}
          onChange={tagInfos.onChange}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Организация</SFormTitle>
        <Select
          options={organisationsOptions}
          placeholder="Выберите организацию"
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Тип конкурса</SFormTitle>
        <Select
          options={competitionTypeOptions}
          placeholder={competitionType.placeholder}
          value={competitionType.value}
          onChange={competitionType.onChange}
          help={competitionType.help}
          validateStatus={competitionType.validateStatus}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Формат конкурса</SFormTitle>
        <Select
          options={competitionFormatOptions}
          placeholder={competitionFormat.placeholder}
          value={competitionFormat.value}
          onChange={competitionFormat.onChange}
          help={competitionFormat.help}
          validateStatus={competitionFormat.validateStatus}
        />
      </SFormItem>
    </>
  );
};
