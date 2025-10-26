"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { TabsProps } from "antd";

import { Button, Tabs, Tag } from "@/shared/components";
import { useGetCompetition } from "@/entities/competition/getCompetition";
import { routes } from "@/shared/config";
import { formatUtcToShortDate } from "@/shared/lib";
import { MainInfo } from "@/entities/competition";

import {
  SCompetitionPage,
  SImgTemplate,
  SInfoAdditionalSection,
  SInfoMainSection,
  SMainContent,
  SMainContentInfo,
  SMainContentTextInfo,
  SMainContentTextSubInfo,
  SName,
  STagsSection,
  STopBlock,
} from "./competitionPage.styles";

export const CompetitionPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || null;
  if (!id) router.push(routes.COMPETITIONS_PAGE);
  const { data } = useGetCompetition(Number(id));

  const tabsItems: TabsProps["items"] = [
    { label: "Главная", key: "1", children: <MainInfo {...data} /> },
    { label: "Требования", key: "2", children: <div>wws</div> },
    { label: "Правила участия", key: "3", children: <div>wws</div> },
    { label: "Ресурсы", key: "4", children: <div>wws</div> },
    { label: "Спонсоры и партнеры", key: "5", children: <div>wws</div> },
  ];

  return (
    <SCompetitionPage>
      <STopBlock>
        <SName>{data?.name}</SName>
        <SMainContent>
          <SImgTemplate />
          <SMainContentInfo>
            <SMainContentTextInfo>
              <SInfoMainSection>
                <div>{data?.competitionFormat}</div>
                <div>Регистрация</div>
              </SInfoMainSection>
              <SMainContentTextSubInfo>
                <SInfoAdditionalSection>
                  <div>
                    Даты проведения:{" "}
                    {formatUtcToShortDate(data?.registrationDateRange[0] || 0)}{" "}
                    -{" "}
                    {formatUtcToShortDate(data?.registrationDateRange[1] || 0)}
                  </div>
                  <div>
                    Призовой фонд:{" "}
                    {data?.prize.prizes.map((prize, index) => (
                      <div key={index}>
                        {prize.medalPlace} место - {prize.type} {prize.source}
                      </div>
                    ))}
                  </div>
                </SInfoAdditionalSection>
                <div>Организатор</div>
                <STagsSection>
                  {data?.tagInfos.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </STagsSection>
              </SMainContentTextSubInfo>
            </SMainContentTextInfo>
            <Button color="violet">Принять участие</Button>
          </SMainContentInfo>
        </SMainContent>
      </STopBlock>
      <div>
        <Tabs type="card" defaultActiveKey="1" items={tabsItems} />
      </div>
    </SCompetitionPage>
  );
};
