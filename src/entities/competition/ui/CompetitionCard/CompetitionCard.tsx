"use client";

import Link from "next/link";
import { FC } from "react";

import { Tag } from "@/shared/components";
import { IGetCreateCompetition } from "@/entities/competition/api";
import { formatUtcToShortDate } from "@/shared/lib";

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

export const CompetitionCard: FC<IGetCreateCompetition> = ({
  name,
  competitionFormat,
  tagInfos,
  prize,
  registrationDateRange,
  id,
}) => {
  const cardHref = `/competition/${id}`;

  return (
    <Link href={cardHref} prefetch={false}>
      <SCompetitionCard>
        <SCardImage>
          <STagsSection>
            {tagInfos.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </STagsSection>
          <SParticipantsNumber>Кол-во участников: ...</SParticipantsNumber>
        </SCardImage>
        <SMainContent>
          <SMainInfo>
            <STitle>{name}</STitle>
            <SSubTitle>
              <SSubtitleText>{competitionFormat}</SSubtitleText>
              <SSubtitleText>Регистрация</SSubtitleText>
            </SSubTitle>
          </SMainInfo>
          <SGeneralInfo>
            <SGeneral>
              <SGeneralText>
                Даты проведения:{" "}
                {formatUtcToShortDate(registrationDateRange[0] || 0)} -{" "}
                {formatUtcToShortDate(registrationDateRange[1] || 0)}
              </SGeneralText>
              <SGeneralText>{prize.description}</SGeneralText>
            </SGeneral>
            <SGeneralText>Организатор: ...</SGeneralText>
          </SGeneralInfo>
        </SMainContent>
      </SCompetitionCard>
    </Link>
  );
};
