import { Input } from "@/shared/components";

import { SFormItem, SFormTitle } from "./createStages.styles";

export const BasicsCompetition = () => {
  return (
    <>
      <SFormItem>
        <SFormTitle>Базовая</SFormTitle>
        <Input placeholder={"Базовая"} />
      </SFormItem>
      <SFormItem>
        <SFormTitle>Информация</SFormTitle>
        <Input placeholder={"Информация"} />
      </SFormItem>
    </>
  );
};
