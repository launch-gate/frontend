"use client";

import Link from "next/link";

import { Cross } from "@/shared/assets";
import { routes } from "@/shared/config";
import { Button, Steps } from "@/shared/components";
import {
  BasicsCompetition,
  createCompetitionStore,
  ManagersCompetition,
  PrizesCompetition,
  RestrictionsCompetition,
  useCreateCompetitionForm,
} from "@/entities/competition";
import { ICreateCompetitionRequest } from "@/entities/competition/api/createCompetition";

import {
  SButtonSection,
  SCloseIcon,
  SCreatePage,
  SForm,
  SFormContent,
  SMainContent,
  SPageHeader,
  STitle,
} from "./createPage.styles";

const items = [
  {
    title: "Базовая информация",
    description: "Название, дата проведения",
    component: BasicsCompetition,
  },
  {
    title: "Ограничения и правила",
    description: "Допустимый возраст, регион",
    component: RestrictionsCompetition,
  },
  {
    title: "Контакты и организаторы",
    description: "Информация о менеджерах проекта",
    component: ManagersCompetition,
  },
  {
    title: "Призы",
    description: "Места и призы",
    component: PrizesCompetition,
  },
];

export const CreatePage = () => {
  const args = useCreateCompetitionForm();
  const createCompetitionStoreState = createCompetitionStore().getState();
  const showPrevButton = args.currentStage.value > 0;
  const showNextButton = args.currentStage.value < items.length - 1;
  const showFinishButton = args.currentStage.value === items.length - 1;

  const handlePrevButtonClick = () =>
    args.currentStage.onChange(args.currentStage.value - 1);
  const handleNextButtonClick = () =>
    args.currentStage.onChange(args.currentStage.value + 1);
  const CurrentStageComponent = items[args.currentStage.value].component;

  const handleSubmitButtonClick = () => {
    const form: ICreateCompetitionRequest = {
      ...createCompetitionStoreState,
      isDraft: false,
      managers: [],
      eventContacts: [],
    };
    args.submitForm(form);
  };

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
          current={args.currentStage.value}
          percent={60}
          labelPlacement="vertical"
          items={items}
        />
        <SForm>
          <SFormContent>
            <CurrentStageComponent {...args} />
          </SFormContent>
          <SButtonSection>
            {showPrevButton && (
              <Button color="gray" onClick={handlePrevButtonClick}>
                Назад
              </Button>
            )}
            {showNextButton && (
              <Button color="violet" onClick={handleNextButtonClick}>
                Далее
              </Button>
            )}
            {showFinishButton && (
              <Button color="violet" onClick={handleSubmitButtonClick}>
                Завершить
              </Button>
            )}
          </SButtonSection>
        </SForm>
      </SMainContent>
    </SCreatePage>
  );
};
