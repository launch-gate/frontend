import React, { FC } from "react";

import { CompetitionContactsBlock } from "@/entities/competition";
import { IGetCreateCompetition } from "@/entities/competition/api";

import {
  SBlock,
  SBlocksSection,
  SBlockTitle,
  SContent,
  SImgTemplate,
  SPage,
} from "./infoPages.styles";

export const MainInfo: FC<Partial<IGetCreateCompetition>> = ({
  shortDescription,
}) => {
  return (
    <SPage>
      <SContent>
        <SImgTemplate />
        <SBlocksSection>
          <SBlock>
            <SBlockTitle>Краткое описание</SBlockTitle>
            <div>{shortDescription}</div>
          </SBlock>
          <SBlock>
            <SBlockTitle>Описание призового фонда</SBlockTitle>
            <div>
              Призовой фонд хакатона составляет 500 000 рублей и распределяется
              между победителями и лауреатами специальных номинаций. Главный
              приз — 250 000 рублей, включающий денежное вознаграждение в
              размере 200 000 рублей и грант на реализацию проекта 50 000
              рублей, а также бесплатный доступ к API партнеров на год и
              интервью в профильных IT-изданиях. Второе место получает 150 000
              рублей: 120 000 рублей денежного приза и менторскую поддержку от
              экспертов индустрии с ускоренной программой акселерации. Третье
              место награждается 100 000 рублей: 80 000 рублей денежного приза,
              сертификатами на образовательные курсы и промо-поддержкой
              проектов.
            </div>
          </SBlock>
        </SBlocksSection>
      </SContent>
      <CompetitionContactsBlock />
    </SPage>
  );
};
