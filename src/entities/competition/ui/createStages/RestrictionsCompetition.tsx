import { Input, Switch } from "@/shared/components";

import { SFormItem, SFormTitle, SSwitchContainer } from "./createStages.styles";

export const RestrictionsCompetition = () => {
  return (
    <>
      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch>Публичный ли конкурс?</Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch>Нужна ли команда?</Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>Требования</SFormTitle>
        <Switch>Вся страна участвует?</Switch>
      </SFormItem>

      <SFormItem>
        <SFormTitle>Для участия</SFormTitle>
        <Input placeholder={"Для участия"} />
      </SFormItem>
    </>
  );
};
