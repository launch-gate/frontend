"use client";

import { useState } from "react";
import { SegmentedProps } from "antd";
import { Dayjs } from "dayjs";

import { competitionFilterStore } from "@/entities/competition";
import {
  Button,
  Checkbox,
  DateRangePicker,
  Input,
  Segmented,
} from "@/shared/components";
import { SliderRange } from "@/shared/components";

import {
  SActiveCount,
  SCheckboxFilter,
  SCheckboxFiltersSection,
  SCheckboxSection,
  SCompetitionFilters,
  SDurationCustom,
  SFilterActions,
  SFilterHeader,
  SFilterScrollBox,
  SFilterScrollList,
  SFilterTitle,
  SPrizeInputRow,
  SPrizeRangeInput,
  SPrizeSection,
} from "./competitionFilters.styles";

type ContestTypeItem = "competition" | "event";

const segmentedOptions: SegmentedProps["options"] = [
  { label: "Конкурсы", value: "competition" },
  { label: "Событие", value: "event" },
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

const SUBJECT_AREAS = [
  "IT",
  "Дизайн",
  "Биология",
  "Медицина",
  "Физика",
  "Химия",
  "История",
  "Экономика",
  "Психология",
  "Математика",
  "Юриспруденция",
  "Архитектура",
];

const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Краснодар",
  "Нижний Новгород",
  "Екатеринбург",
  "Новосибирск",
  "Казань",
  "Ростов-на-Дону",
  "Самара",
  "Уфа",
];

const MAX_PRIZE = 5_000_000;

export const CompetitionFilters = () => {
  const [contestType, setContestType] =
    useState<ContestTypeItem>("competition");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [durationRange, setDurationRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [prizeRange, setPrizeRange] = useState<[number, number]>([
    0,
    MAX_PRIZE,
  ]);

  const { competitionState, setFilters, resetFilters } =
    competitionFilterStore();

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

  const handlePrizeSlider = (val: [number, number]) => {
    setPrizeRange(val);
    setFilters({ prizeMin: val[0], prizeMax: val[1] });
  };

  const handlePrizeInput = (index: 0 | 1, raw: string) => {
    const num = Math.max(0, Math.min(MAX_PRIZE, Number(raw) || 0));
    const next: [number, number] = [...prizeRange] as [number, number];
    next[index] = num;
    if (next[0] > next[1]) next[index === 0 ? 1 : 0] = num;
    setPrizeRange(next);
    setFilters({ prizeMin: next[0], prizeMax: next[1] });
  };

  const handleReset = () => {
    resetFilters();
    setPrizeRange([0, MAX_PRIZE]);
    setDurationRange([null, null]);
    setSubjectSearch("");
    setCitySearch("");
  };

  const filteredSubjects = SUBJECT_AREAS.filter((s) =>
    s.toLowerCase().includes(subjectSearch.toLowerCase()),
  );

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase()),
  );

  const activeFilterCount =
    (competitionState.statuses?.length ?? 0) +
    (competitionState.duration ? 1 : 0) +
    (competitionState.prizeMin > 0 ? 1 : 0) +
    (competitionState.prizeMax < MAX_PRIZE ? 1 : 0);

  return (
    <SCompetitionFilters>
      <SFilterHeader>
        <Segmented
          value={contestType}
          options={segmentedOptions}
          onChange={(v) => setContestType(v as ContestTypeItem)}
        />
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
        {/* Формат проведения */}
        <SCheckboxFilter>
          <SFilterTitle>Формат проведения</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>Онлайн</Checkbox>
            <Checkbox>Офлайн</Checkbox>
            <Checkbox>Гибрид</Checkbox>
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

        {/* Предметные области */}
        <SCheckboxFilter>
          <SFilterTitle>Предметные области</SFilterTitle>
          <SFilterScrollBox>
            <Input
              placeholder="Поиск..."
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
            />
            <SFilterScrollList>
              {filteredSubjects.map((area) => (
                <Checkbox key={area}>{area}</Checkbox>
              ))}
            </SFilterScrollList>
          </SFilterScrollBox>
        </SCheckboxFilter>

        {/* Город проведения */}
        <SCheckboxFilter>
          <SFilterTitle>Город проведения</SFilterTitle>
          <SFilterScrollBox>
            <Input
              placeholder="Поиск..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
            />
            <SFilterScrollList>
              {filteredCities.map((city) => (
                <Checkbox key={city}>{city}</Checkbox>
              ))}
            </SFilterScrollList>
          </SFilterScrollBox>
        </SCheckboxFilter>

        {/* Призовой фонд */}
        <SCheckboxFilter>
          <SFilterTitle>Призовой фонд</SFilterTitle>
          <SPrizeSection>
            <SliderRange
              min={0}
              max={MAX_PRIZE}
              value={prizeRange}
              onChange={(val) => handlePrizeSlider(val as [number, number])}
              range
            />
            <SPrizeInputRow>
              <SPrizeRangeInput
                type="number"
                value={prizeRange[0]}
                min={0}
                max={prizeRange[1]}
                onChange={(e) => handlePrizeInput(0, e.target.value)}
              />
              <span>—</span>
              <SPrizeRangeInput
                type="number"
                value={prizeRange[1]}
                min={prizeRange[0]}
                max={MAX_PRIZE}
                onChange={(e) => handlePrizeInput(1, e.target.value)}
              />
            </SPrizeInputRow>
          </SPrizeSection>
        </SCheckboxFilter>

        {/* Критерии участия */}
        <SCheckboxFilter>
          <SFilterTitle>Критерии участия</SFilterTitle>
          <SCheckboxSection>
            <Checkbox>Любой</Checkbox>
            <Checkbox>Студенты</Checkbox>
            <Checkbox>Школьники</Checkbox>
            <Checkbox>Специалисты</Checkbox>
          </SCheckboxSection>
        </SCheckboxFilter>
      </SCheckboxFiltersSection>
    </SCompetitionFilters>
  );
};
