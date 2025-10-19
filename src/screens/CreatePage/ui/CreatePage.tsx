"use client";

import Link from "next/link";

import { Cross } from "@/shared/assets";
import { routes } from "@/shared/config";
import { Button, Input } from "@/shared/components";
import { Steps } from "@/shared/components/Steps/ui/Steps";

import {
  SButtonSection,
  SCloseIcon,
  SCreatePage,
  SForm,
  SFormContent,
  SFormItem,
  SFormTitle,
  SMainContent,
  SPageHeader,
  STitle,
} from "./createPage.styles";

const items = [
  {
    title: "Первые шаги",
    description: "Название, дата проведения",
  },
  {
    title: "Основы",
    description: "Базовая информация",
  },
  {
    title: "Требования",
    description: "Условия для участия",
  },
  {
    title: "Оформление",
    description: "Внешний вид конкурса",
  },
  {
    title: "Страница конкурса",
    description: "Базовые и доп. материалы",
  },
];

export const CreatePage = () => {
  return (
    <SCreatePage>
      <SPageHeader>
        <STitle>Редактор конкурса</STitle>
        <SCloseIcon>
          <Link href={routes.HOME_PAGE}>
            <Cross />
          </Link>
        </SCloseIcon>
      </SPageHeader>
      <SMainContent>
        <Steps
          current={1}
          percent={60}
          labelPlacement="vertical"
          items={items}
        />
        <SForm>
          <SFormContent>
            <SFormItem>
              <SFormTitle>Название</SFormTitle>
              <Input placeholder={"Например, Хакатон по продвижению проекта"} />
            </SFormItem>
            <SFormItem>
              <SFormTitle>Дата старта подачи заявок</SFormTitle>
              <Input placeholder={"Форма календаря выпадающая"} />
            </SFormItem>
          </SFormContent>
          <SButtonSection>
            <Button color="violet">Далее</Button>
          </SButtonSection>
        </SForm>
      </SMainContent>
    </SCreatePage>
  );
};
