"use client";

import React, { FC } from "react";
import { OutputData } from "@editorjs/editorjs";

import { CompetitionContactsBlock } from "@/entities/competition";
import { GetCompetitionType } from "@/entities/competition/api/getCompetition/getCompetition.types";
import { Viewer } from "@/features/Viewer";

import {
  SBlock,
  SBlocksSection,
  SBlockTitle,
  SContent,
  SImgTemplate,
  SPage,
} from "./infoPages.styles";

export const MainInfo: FC<Partial<GetCompetitionType>> = ({
  shortDescription = "[]",
  prize,
}) => {
  const shortDescriptionObject = JSON.parse(shortDescription);
  const shortDescriptionViewerData: OutputData = {
    blocks: shortDescriptionObject as OutputData["blocks"],
  };
  const prizesDescriptionObject = JSON.parse(prize?.description || "[]");
  const prizesDescriptionViewerData: OutputData = {
    blocks: prizesDescriptionObject as OutputData["blocks"],
  };

  return (
    <SPage>
      <SContent>
        <SBlocksSection>
          <SBlock>
            <SBlockTitle>Краткое описание</SBlockTitle>
            <Viewer data={shortDescriptionViewerData} />
          </SBlock>
          <SBlock>
            <SBlockTitle>Описание призового фонда</SBlockTitle>
            <Viewer data={prizesDescriptionViewerData} />
          </SBlock>
        </SBlocksSection>
      </SContent>
      <CompetitionContactsBlock />
    </SPage>
  );
};
