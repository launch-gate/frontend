import { SelectProps } from "antd";

import { Input, Select, TextArea } from "@/shared/components";
import { DateRangePicker } from "@/shared/components/DateRangePicker";

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

const managersOptions: SelectProps["options"] = [
  { label: "Менеджер Иван", value: 1 },
  { label: "Менеджер Алиса", value: 2 },
  { label: "Менеджер Игорь", value: 3 },
  { label: "Менеджер Алексей", value: 4 },
];

export const BasicsCompetition = () => {
  return (
    <>
      <SFormItem>
        <SFormTitle>Название</SFormTitle>
        <Input placeholder={"Например, Хакатон по продвижению проекта"} />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Дата старта подачи заявок</SFormTitle>
        <Input placeholder={"Форма календаря выпадающая"} />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Даты регистрации</SFormTitle>
        <DateRangePicker
          placeholder={["Начало регистрации", "Конец регистрации"]}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Даты конкурса</SFormTitle>
        <DateRangePicker placeholder={["Начало конкурса", "Конец конкурса"]} />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Даты подведения итогов</SFormTitle>
        <DateRangePicker
          placeholder={["Начало подведения итогов", "Конец подведения итогов"]}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Краткое описание</SFormTitle>
        <TextArea
          size="large"
          placeholder="Опишите самую важную информацию о проекте"
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Теги конкурса</SFormTitle>
        <Select
          mode="multiple"
          options={tagOptions}
          placeholder="Выберите теги конкурса"
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
          placeholder="Выберите тип конкурса"
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Менеджеры</SFormTitle>
        <Select
          mode="multiple"
          options={managersOptions}
          placeholder="Выберите менеджеров"
        />
      </SFormItem>
    </>
  );
};
