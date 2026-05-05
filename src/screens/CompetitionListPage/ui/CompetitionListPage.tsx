"use client";

import { ChangeEvent, useState } from "react";

import { competitionFilterStore } from "@/entities/competition";
import { CompetitionFilters } from "@/features/CompetitionFilters";
import { Input } from "@/shared/components";
import { CompetitionsList } from "@/widgets/CompetitionsList";

import {
  SBanner,
  SBannerWrapper,
  SCompetitionsListPage,
  SMainContent,
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
        <SBanner />
      </SBannerWrapper>

      <CompetitionFilters />
      <SMainContent>
        <Input
          onChange={handleChangeInputSearch}
          value={inputSearch}
          placeholder="Например, конкурс для биологов..."
        />
        <CompetitionsList />
      </SMainContent>
    </SCompetitionsListPage>
  );
};
