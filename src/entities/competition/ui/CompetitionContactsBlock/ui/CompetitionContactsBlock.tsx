import React from "react";

import { Button } from "@/shared/components";

import {
  SBlock,
  SContact,
  SContactsSection,
  SContactTemplate,
  SMainInfo,
  SSubInfo,
  STitle,
} from "./competitionContactsBlock.styles";

export const CompetitionContactsBlock = () => {
  return (
    <SBlock>
      <SMainInfo>
        <STitle>Важные ссылки</STitle>
        <SContactsSection>
          <SContact>
            <SContactTemplate />
            <div>Телеграмм</div>
          </SContact>
          <SContact>
            <SContactTemplate />
            <div>Вконтакте</div>
          </SContact>
          <SContact>
            <SContactTemplate />
            <div>Почта</div>
          </SContact>
        </SContactsSection>
      </SMainInfo>
      <SSubInfo>
        <div>Остались вопросы?</div>
        <Button type="text">Напиши менеджеру проекта</Button>
      </SSubInfo>
    </SBlock>
  );
};
