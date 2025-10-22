import { Input } from "@/shared/components";

import { SFormItem, SFormTitle } from "./createStages.styles";

export const RequirementsCompetition = () => {
  return (
    <>
      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Input placeholder={"Требования"} />
      </SFormItem>
      <SFormItem>
        <SFormTitle>Для участия</SFormTitle>
        <Input placeholder={"Для участия"} />
      </SFormItem>
    </>
  );
};
