import { FC } from "react";

import { Input } from "@/shared/components";

import { SFormItem, SFormTitle } from "./createStages.styles";
import { ICreateCompetitionFormik } from "../../model/createCompetitionFilters.types";

export const ManagersCompetition: FC<ICreateCompetitionFormik> = () => {
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
