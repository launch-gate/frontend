"use client";

import Link from "next/link";

import { Tag } from "@/shared/components";

import {
  SCardImage,
  SCompetitionCard,
  SGeneral,
  SGeneralInfo,
  SGeneralText,
  SMainContent,
  SMainInfo,
  SParticipantsNumber,
  SSubTitle,
  SSubtitleText,
  STagsSection,
  STitle,
} from "./competitionCard.styles";

export const CompetitionCard = () => {
  const cardGUID = 1; //TODO изменить
  const cardHref = `/competition/${cardGUID}`;

  return (
    <Link href={cardHref} prefetch={false}>
      <SCompetitionCard>
        <SCardImage>
          <STagsSection>
            <Tag>тег</Tag>
            <Tag>тег</Tag>
          </STagsSection>
          <SParticipantsNumber>number</SParticipantsNumber>
        </SCardImage>
        <SMainContent>
          <SMainInfo>
            <STitle>Название</STitle>
            <SSubTitle>
              <SSubtitleText>Онлайн</SSubtitleText>
              <SSubtitleText>Регистрация</SSubtitleText>
            </SSubTitle>
          </SMainInfo>
          <SGeneralInfo>
            <SGeneral>
              <SGeneralText>Даты проведения</SGeneralText>
              <SGeneralText>Призовой фонд</SGeneralText>
            </SGeneral>
            <SGeneralText>Организатор</SGeneralText>
          </SGeneralInfo>
        </SMainContent>
      </SCompetitionCard>
    </Link>
  );
};
