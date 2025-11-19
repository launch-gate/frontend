"use client";

import Link from "next/link";
import { FC } from "react";
import { OutputData } from "@editorjs/editorjs";

import { Tag } from "@/shared/components";
import { IGetCreateCompetition } from "@/entities/competition/api";
import { formatUtcToShortDate } from "@/shared/lib";
import { Viewer } from "@/features/Viewer";

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
  competitionDateRange,
  id,
  mainImageUrl,
}) => {
  const cardHref = `/competition/${id}`;

  const prizesDescriptionObject = JSON.parse(prize?.description || "");
  const prizesDescriptionViewerData: OutputData = {
    blocks: prizesDescriptionObject as OutputData["blocks"],
  };

  return (
    <Link href={cardHref} prefetch={false}>
      <SCompetitionCard>
        <SCardImage $mainImageUrl={mainImageUrl}>
          <STagsSection>
            {tagInfos.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </STagsSection>
          <Tag>Кол-во участников: ...</Tag>
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
                {formatUtcToShortDate(competitionDateRange[0] || 0)} -{" "}
                {formatUtcToShortDate(competitionDateRange[1] || 0)}
              </SGeneralText>
              <SGeneralText>
                Описание призового фонда:
                <br />
                <Viewer data={prizesDescriptionViewerData} />
              </SGeneralText>
            </SGeneral>
            <SGeneralText>Организатор: ...</SGeneralText>
          </SGeneralInfo>
        </SMainContent>
      </SCompetitionCard>
    </Link>
  );
};
