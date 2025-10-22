import { Input } from "@/shared/components";

import { SFormItem, SFormTitle } from "./createStages.styles";

export const DecorationCompetition = () => {
  return (
    <>
      <SFormItem>
        <SFormTitle>Внешний</SFormTitle>
        <Input placeholder={"Внешний"} />
      </SFormItem>
      <SFormItem>
        <SFormTitle>Вид</SFormTitle>
        <Input placeholder={"Вид"} />
      </SFormItem>
    </>
  );
};
