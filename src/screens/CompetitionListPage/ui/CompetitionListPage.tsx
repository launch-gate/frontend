"use client";

import { ChangeEvent, useState } from "react";

import { competitionFilterStore } from "@/entities/competition";
import { CompetitionFilters } from "@/features/CompetitionFilters";
import { Input } from "@/shared/components";
import { CompetitionsList } from "@/widgets/CompetitionsList";

import {
  SBannerWord,
  SBannerWrapper,
  SCompetitionsListPage,
  SMainContent,
  SSearchBanner,
  SSearchButton,
} from "./competitionListPage.styles";

export const CompetitionListPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const setFilters = competitionFilterStore((state) => state.setFilters);

  const handleChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setInputSearch(search);
    setFilters({ search });
  };

  return (
    <SCompetitionsListPage>
      <SBannerWrapper>
        <SSearchBanner>
          <SBannerWord $left={103} $top={10}>Найти</SBannerWord>
          <SBannerWord $left={660} $top={10}>Конкурс</SBannerWord>
          <SBannerWord $left={424} $top={176}>Событие</SBannerWord>
        </SSearchBanner>
      </SBannerWrapper>

      <CompetitionFilters />

      <SMainContent>
        <Input
          onChange={handleChangeInputSearch}
          value={inputSearch}
          placeholder="Например, конкурс для биологов..."
          suffix={<SSearchButton>Найти</SSearchButton>}
        />
        <CompetitionsList />
      </SMainContent>
    </SCompetitionsListPage>
  );
};
