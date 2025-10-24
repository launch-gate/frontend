"use client";

import { ChangeEvent, useState } from "react";

import { Input } from "@/shared/components";
import { CompetitionsList } from "@/widgets/CompetitionsList";
import { CompetitionFilters } from "@/features/CompetitionFilters";

import {
  SCompetitionsListPage,
  SFilters,
  SMainContent,
} from "./competitionListPage.styles";

export const CompetitionListPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  return (
    <SCompetitionsListPage>
      <SFilters>
        <CompetitionFilters />
      </SFilters>
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
