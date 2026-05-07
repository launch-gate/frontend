"use client";

import Link from "next/link";
import { Tooltip } from "antd";

import { Cross } from "@/shared/assets";
import { routes } from "@/shared/config";
import { Button, Steps } from "@/shared/components";
import {
  BasicsCompetition,
  ICreateCompetition,
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

const VIOLET = "rgba(30, 4, 146, 1)";
const GRAY_MID = "rgba(152, 152, 152, 1)";
const GRAY_LIGHT = "rgba(230, 230, 230, 1)";

// Outer ring (selection indicator)
const SIZE = 48;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 21;
const R_INNER = 14;
const CIRC_INNER = 2 * Math.PI * R_INNER;

const CircleStep = ({
  stepNum,
  percent,
  isActive,
}: {
  stepNum: number;
  percent: number;
  isActive: boolean;
}) => {
  const offset = CIRC_INNER * (1 - percent / 100);
  const isDone = percent === 100;
  const color = isActive ? VIOLET : GRAY_MID;
  const outerStroke = isActive ? VIOLET : GRAY_LIGHT;

  return (
    <Tooltip title={`${percent}% заполнено`} placement="top">
      <span style={{ display: "inline-flex", cursor: "pointer" }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          overflow="visible"
        >
          {/* Outer selection ring */}
          <circle
            cx={CX}
            cy={CY}
            r={R_OUTER}
            fill="none"
            stroke={outerStroke}
            strokeWidth="1.5"
          />

          {isDone ? (
            /* Filled inner circle when done */
            <circle cx={CX} cy={CY} r={R_INNER} fill={color} />
          ) : (
            <>
              {/* Inner background ring */}
              <circle
                cx={CX}
                cy={CY}
                r={R_INNER}
                fill="none"
                stroke={GRAY_LIGHT}
                strokeWidth="2.5"
              />
              {/* Inner progress arc (only for active) */}
              {percent > 0 && (
                <circle
                  cx={CX}
                  cy={CY}
                  r={R_INNER}
                  fill="none"
                  stroke={isActive ? VIOLET : GRAY_MID}
                  strokeWidth="2.5"
                  strokeDasharray={CIRC_INNER}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${CX} ${CY})`}
                />
              )}
            </>
          )}

          {isDone ? (
            <path
              d="M16 24 L21 29 L32 18"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <text
              x={CX}
              y={CY + 5}
              textAnchor="middle"
              fontSize="13"
              fill={color}
            >
              {stepNum}
            </text>
          )}
        </svg>
      </span>
    </Tooltip>
  );
};

const getStagePercent = (
  stageIndex: number,
  values: ICreateCompetition,
): number => {
  switch (stageIndex) {
    case 0: {
      const checks = [
        values.name.length >= 3,
        values.registrationDateRange[0] != null &&
          values.registrationDateRange[1] != null,
        values.competitionDateRange[0] != null &&
          values.competitionDateRange[1] != null,
        values.resultDateRange[0] != null && values.resultDateRange[1] != null,
        values.shortDescription.length >= 6,
        values.tagInfos.length > 0,
        values.competitionType != null,
        values.competitionFormat != null,
      ];
      return Math.round((checks.filter(Boolean).length / checks.length) * 100);
    }
    case 1: {
      const checks = [
        true, // isPublic всегда выбран
        values.participantAgeRange[0] >= 0 &&
          values.participantAgeRange[1] > values.participantAgeRange[0],
        values.targetAudience.length > 0,
        true, // isTeamRequired всегда выбран
        ...(values.isTeamRequired
          ? [
              values.teamSizeRange[0] >= 1 &&
                values.teamSizeRange[1] > values.teamSizeRange[0],
            ]
          : []),
        true, // isCountry всегда выбран
      ];
      return Math.round((checks.filter(Boolean).length / checks.length) * 100);
    }
    case 2: {
      const checks = [
        values.eventContacts.length > 0 &&
          values.eventContacts[0].contactInfo.length > 0,
        values.eventContacts.length > 0 &&
          values.eventContacts[0].description.length > 0,
        values.managers.length > 0 && values.managers[0].userId > 0,
        values.managers.length > 0 &&
          values.managers[0].contacts[0]?.contactInfo.source.length > 0,
      ];
      return Math.round((checks.filter(Boolean).length / checks.length) * 100);
    }
    case 3: {
      const checks = [
        values.prize.description.length > 0,
        values.prize.prizes.length > 0 &&
          values.prize.prizes.every((p) => p.source.length > 0),
      ];
      return Math.round((checks.filter(Boolean).length / checks.length) * 100);
    }
    default:
      return 0;
  }
};

const stageDefinitions = [
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
  const currentStage = args.currentStage.value;

  const showPrevButton = currentStage > 0;
  const showNextButton = currentStage < stageDefinitions.length - 1;
  const showFinishButton = currentStage === stageDefinitions.length - 1;

  const handleSubmitButtonClick = () => {
    const form: ICreateCompetitionRequest = {
      ...args.values,
      isDraft: false,
    };
    args.submitForm(form);
  };

  const items = stageDefinitions.map((stage, index) => ({
    title: stage.title,
    description: stage.description,
    icon: (
      <CircleStep
        stepNum={index + 1}
        percent={getStagePercent(index, args.values)}
        isActive={index === currentStage}
      />
    ),
  }));

  const CurrentStageComponent = stageDefinitions[currentStage].component;

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
          current={currentStage}
          labelPlacement="vertical"
          items={items}
          onChange={args.currentStage.onChange}
        />
        <SForm>
          <SFormContent>
            <CurrentStageComponent {...args} />
          </SFormContent>
          <SButtonSection>
            {showPrevButton && (
              <Button
                color="gray"
                onClick={() => args.currentStage.onChange(currentStage - 1)}
              >
                Назад
              </Button>
            )}
            {showNextButton && (
              <Button
                color="violet"
                onClick={() => args.currentStage.onChange(currentStage + 1)}
              >
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
