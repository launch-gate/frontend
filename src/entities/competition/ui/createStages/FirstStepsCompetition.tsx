import { Input } from "@/shared/components";

import { SFormItem, SFormTitle } from "./createStages.styles";

export const FirstStepsCompetition = () => {
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
    </>
  );
};
