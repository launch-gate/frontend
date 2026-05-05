"use client";

import Link from "next/link";
import { FC } from "react";

import {
  ContestStatus,
  IContestInfoResponse,
  ParticipationMode,
} from "@/entities/contest";
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

const statusLabels: Record<ContestStatus, string> = {
  DRAFT: "Черновик",
  FINISHED: "Завершён",
  PUBLISHED: "Опубликован",
  RUNNING: "Идёт",
};

const participationModeLabels: Record<ParticipationMode, string> = {
  INDIVIDUAL: "Индивидуально",
  TEAM: "Командно",
};

const formatDate = (date?: string) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const CompetitionCard: FC<IContestInfoResponse> = ({
  id,
  title,
  description,
  status,
  participationMode,
  registrationEndsAt,
  startsAt,
  endsAt,
  contacts,
}) => {
  const cardHref = id ? `/contests/${id}` : "/contests";

  return (
    <Link href={cardHref} prefetch={false}>
      <SCompetitionCard>
        <SCardImage>
          <STagsSection>
            {status && <Tag>{statusLabels[status]}</Tag>}
            {participationMode && (
              <Tag>{participationModeLabels[participationMode]}</Tag>
            )}
          </STagsSection>
          <SParticipantsNumber>
            Регистрация до {formatDate(registrationEndsAt)}
          </SParticipantsNumber>
        </SCardImage>
        <SMainContent>
          <SMainInfo>
            <STitle>{title ?? `Конкурс #${id ?? "-"}`}</STitle>
            <SSubTitle>
              <SSubtitleText>
                Старт: {formatDate(startsAt)}
              </SSubtitleText>
              <SSubtitleText>
                Финиш: {formatDate(endsAt)}
              </SSubtitleText>
            </SSubTitle>
          </SMainInfo>
          <SGeneralInfo>
            <SGeneral>
              <SGeneralText>
                {description || "Описание конкурса пока не заполнено."}
              </SGeneralText>
              <SGeneralText>
                Контакты организатора: {contacts || "-"}
              </SGeneralText>
            </SGeneral>
          </SGeneralInfo>
        </SMainContent>
      </SCompetitionCard>
    </Link>
  );
};
