"use client";

import { useState } from "react";
import { Dayjs } from "dayjs";

import { competitionFilterStore } from "@/entities/competition";
import { Button, Checkbox, DateRangePicker } from "@/shared/components";

import {
  SActiveCount,
  SCheckboxFilter,
  SCheckboxFiltersSection,
  SCheckboxSection,
  SCompetitionFilters,
  SDurationCustom,
  SFilterActions,
  SFilterHeader,
  SFilterTitle,
} from "./competitionFilters.styles";

const participationModeOptions = [
  { label: "Командный", value: "TEAM" as const },
  { label: "Индивидуальный", value: "INDIVIDUAL" as const },
];

const statusOptions = [
  { label: "Открыт", value: "PUBLISHED" },
  { label: "Идёт", value: "RUNNING" },
  { label: "Закончен", value: "FINISHED" },
];

const durationOptions = [
  { label: "Меньше недели", value: "week" },
  { label: "Меньше 2 недель", value: "2weeks" },
  { label: "Меньше месяца", value: "month" },
];

export const CompetitionFilters = () => {
  const [durationRange, setDurationRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const { competitionState, setFilters, resetFilters } =
    competitionFilterStore();

  const handleParticipationModeToggle = (
    mode: "TEAM" | "INDIVIDUAL",
  ) => {
    const next =
      competitionState.participationMode === mode ? null : mode;
    setFilters({ participationMode: next });
  };

  const handleStatusToggle = (status: string) => {
    const current = competitionState.statuses ?? [];
    const updated = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    setFilters({ statuses: updated });
  };

  const handleDurationToggle = (value: string) => {
    const newDuration = competitionState.duration === value ? null : value;
    setFilters({ duration: newDuration, durationRange: [null, null] });
    if (newDuration !== "custom") setDurationRange([null, null]);
  };

  const handleReset = () => {
    resetFilters();
    setDurationRange([null, null]);
  };

  const activeFilterCount =
    (competitionState.participationMode ? 1 : 0) +
    (competitionState.statuses?.length ?? 0) +
    (competitionState.duration ? 1 : 0);

  return (
    <SCompetitionFilters>
      <SFilterHeader>
        <SFilterActions>
          {activeFilterCount === 0 ? (
            <SFilterTitle>Фильтры</SFilterTitle>
          ) : (
            <>
              <SActiveCount>Активных фильтров: {activeFilterCount}</SActiveCount>
              <Button type="text" onClick={handleReset}>
                Сбросить все фильтры
              </Button>
            </>
          )}
        </SFilterActions>
      </SFilterHeader>

      <SCheckboxFiltersSection>
        {/* Формат участия */}
        <SCheckboxFilter>
          <SFilterTitle>Формат участия</SFilterTitle>
          <SCheckboxSection>
            {participationModeOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                checked={competitionState.participationMode === opt.value}
                onChange={() => handleParticipationModeToggle(opt.value)}
              >
                {opt.label}
              </Checkbox>
            ))}
          </SCheckboxSection>
        </SCheckboxFilter>

        {/* Статус */}
        <SCheckboxFilter>
          <SFilterTitle>Статус</SFilterTitle>
          <SCheckboxSection>
            {statusOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                checked={competitionState.statuses?.includes(opt.value)}
                onChange={() => handleStatusToggle(opt.value)}
              >
                {opt.label}
              </Checkbox>
            ))}
          </SCheckboxSection>
        </SCheckboxFilter>

        {/* Длительность */}
        <SCheckboxFilter>
          <SFilterTitle>Длительность</SFilterTitle>
          <SCheckboxSection>
            {durationOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                checked={competitionState.duration === opt.value}
                onChange={() => handleDurationToggle(opt.value)}
              >
                {opt.label}
              </Checkbox>
            ))}
            <Checkbox
              checked={competitionState.duration === "custom"}
              onChange={() => handleDurationToggle("custom")}
            >
              Свой период
            </Checkbox>
            {competitionState.duration === "custom" && (
              <SDurationCustom>
                <DateRangePicker
                  value={durationRange}
                  onChange={(dates) => {
                    const range = (dates as
                      | [Dayjs | null, Dayjs | null]
                      | null) ?? [null, null];
                    setDurationRange(range);
                    setFilters({
                      durationRange: [
                        range[0]?.valueOf() ?? null,
                        range[1]?.valueOf() ?? null,
                      ],
                    });
                  }}
                  placeholder={["Начало", "Конец"]}
                />
              </SDurationCustom>
            )}
          </SCheckboxSection>
        </SCheckboxFilter>
      </SCheckboxFiltersSection>
    </SCompetitionFilters>
  );
};
