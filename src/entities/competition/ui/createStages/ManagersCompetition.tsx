import { Input } from "@/shared/components";

import { SFormItem, SFormTitle } from "./createStages.styles";

export const ManagersCompetition = () => {
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
