"use client";

import Link from "next/link";
import { useState } from "react";

import { Cross } from "@/shared/assets";
import { routes } from "@/shared/config";
import { Button, Steps } from "@/shared/components";
import {
  BasicsCompetition,
  DecorationCompetition,
  ManagersCompetition,
  MaterialsCompetition,
  PrizesCompetition,
  RequirementsCompetition,
  RestrictionsCompetition,
} from "@/entities/competition";

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
  const [currentStep, setCurrentStep] = useState(0);
  const showPrevButton = currentStep > 0;
  const showNextButton = currentStep < items.length - 1;
  const showFinishButton = currentStep === items.length - 1;

  const handlePrevButtonClick = () => setCurrentStep((prev) => prev - 1);
  const handleNextButtonClick = () => setCurrentStep((prev) => prev + 1);

  const CurrentStageComponent = items[currentStep].component;

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
          current={currentStep}
          percent={60}
          labelPlacement="vertical"
          items={items}
        />
        <SForm>
          <SFormContent>
            <CurrentStageComponent />
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
              <Link href={routes.HOME_PAGE}>
                <Button color="violet">Завершить</Button>
              </Link>
            )}
          </SButtonSection>
        </SForm>
      </SMainContent>
    </SCreatePage>
  );
};
