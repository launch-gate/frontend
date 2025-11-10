import { ChangeEvent, FC, useState } from "react";
import { OutputData } from "@editorjs/editorjs";

import { Button, Input, Select, TextArea } from "@/shared/components";
import { Editor } from "@/features/Editor";
import { Viewer } from "@/features/Viewer";

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
import { medalTypesOptions, Prize } from "../../model/prizesTypes.types";
import { ICreateCompetitionFormik } from "../../model/createCompetitionFilters.types";

export const PrizesCompetition: FC<ICreateCompetitionFormik> = ({ prize }) => {
  const addPrize = () => {
    const newPlace = prize.prizesInfo.value.length + 1;
    prize.prizesInfo.onChange([
      ...prize.prizesInfo.value,
      {
        medalPlace: newPlace,
        type: "MONEY",
        source: "",
      },
    ]);
  };
  const [data, setData] = useState<OutputData>({ blocks: [] });

  const removePrize = (index: number) => {
    const updatedPrizes = prize.prizesInfo.value.filter((_, i) => i !== index);
    const renumberedPrizes = updatedPrizes.map((prize, idx) => ({
      ...prize,
      medalPlace: idx + 1,
    }));
    prize.prizesInfo.onChange(renumberedPrizes);
  };

  const updatePrize = (index: number, field: keyof Prize, value: string) => {
    const updatedPrizes = [...prize.prizesInfo.value];
    updatedPrizes[index] = {
      ...updatedPrizes[index],
      [field]: field === "medalPlace" ? parseInt(value) || 1 : value,
    };
    prize.prizesInfo.onChange(updatedPrizes);
  };

  const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) =>
    prize.description.onChange(e);

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
          validateStatus={prize.description.validateStatus}
          help={prize.description.help}
        />
      </SFormItem>

      <SFormItem>
        <SFormTitle>Призы</SFormTitle>
        <SPrizeContainer>
          {prize.prizesInfo.value.map((prize, index) => (
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

        <Editor data={data} onChange={setData} />
        <Viewer data={data} />
      </SFormItem>
    </>
  );
};
