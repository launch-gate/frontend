import { Input } from "@/shared/components";

import { SFormItem, SFormTitle } from "./createStages.styles";

export const PrizesCompetition = () => {
  return (
    <>
      <SFormItem>
        <SFormTitle>Базовые материалы</SFormTitle>
        <Input placeholder={"Базовые материалы"} />
      </SFormItem>
      <SFormItem>
        <SFormTitle>Доп материалы</SFormTitle>
        <Input placeholder={"Доп материалы"} />
      </SFormItem>
    </>
  );
};
