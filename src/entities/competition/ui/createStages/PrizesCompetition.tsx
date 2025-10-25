import { ChangeEvent, FC, useState } from "react";

import { Button, Input, Select, TextArea } from "@/shared/components";

import {
  SFormItem,
  SFormTitle,
  SPlaceLabel,
  SPrizeActions,
  SPrizeContainer,
  SPrizeFields,
  SPrizeHeader,
  SPrizeItem,
} from "./createStages.styles";
import {
  medalTypesOptions,
  Prize,
  PrizeData,
} from "../../model/prizesTypes.types";
import { ICreateCompetitionFormik } from "../../model/createCompetitionFilters.types";

export const PrizesCompetition: FC<ICreateCompetitionFormik> = () => {
  const [prizeData, setPrizeData] = useState<PrizeData>({
    description: "",
    prizes: [],
  });

  const addPrize = () => {
    const newPlace = prizeData.prizes.length + 1;
    setPrizeData({
      ...prizeData,
      prizes: [
        ...prizeData.prizes,
        {
          medalPlace: newPlace,
          type: "MONEY",
          source: "",
        },
      ],
    });
  };

  const removePrize = (index: number) => {
    const updatedPrizes = prizeData.prizes.filter((_, i) => i !== index);
    const renumberedPrizes = updatedPrizes.map((prize, idx) => ({
      ...prize,
      medalPlace: idx + 1,
    }));
    setPrizeData({
      ...prizeData,
      prizes: renumberedPrizes,
    });
  };

  const updatePrize = (index: number, field: keyof Prize, value: string) => {
    const updatedPrizes = [...prizeData.prizes];
    updatedPrizes[index] = {
      ...updatedPrizes[index],
      [field]: field === "medalPlace" ? parseInt(value) || 1 : value,
    };
    setPrizeData({
      ...prizeData,
      prizes: updatedPrizes,
    });
  };

  const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrizeData({
      ...prizeData,
      description: e.target.value,
    });
  };

  const getPlaceLabel = (place: number) => {
    return `${place} место`;
  };

  const getPlaceholder = (type: string) => {
    switch (type) {
      case "MONEY":
        return "Сумма в рублях";
      case "CRYPTO":
        return "Сумма в криптовалюте";
      case "CUSTOM":
        return "Описание приза";
      default:
        return "";
    }
  };

  return (
    <>
      <SFormItem>
        <SFormTitle>Призовой фонд</SFormTitle>
        <TextArea
          onChange={updateDescription}
          placeholder="Описание призового фонда"
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Призы</SFormTitle>
        <SPrizeContainer>
          {prizeData.prizes.map((prize, index) => (
            <SPrizeItem key={index}>
              <SPrizeHeader>
                <SPlaceLabel>{getPlaceLabel(prize.medalPlace)}</SPlaceLabel>
                <Button type="text" danger onClick={() => removePrize(index)}>
                  Удалить
                </Button>
              </SPrizeHeader>

              <SPrizeFields>
                <Select
                  value={prize.type}
                  onChange={(value) => updatePrize(index, "type", value)}
                  options={medalTypesOptions}
                  allowClear={false}
                />

                <Input
                  placeholder={getPlaceholder(prize.type)}
                  value={prize.source}
                  onChange={(e) => updatePrize(index, "source", e.target.value)}
                />
              </SPrizeFields>
            </SPrizeItem>
          ))}
        </SPrizeContainer>
        <SPrizeActions>
          <Button type="dashed" onClick={addPrize}>
            + Добавить приз
          </Button>
        </SPrizeActions>
      </SFormItem>
    </>
  );
};
