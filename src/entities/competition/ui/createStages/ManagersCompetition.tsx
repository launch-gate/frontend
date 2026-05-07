import { FC } from "react";
import { SelectProps } from "antd";

import { Button, Input, Select, Switch } from "@/shared/components";

import {
  SCardActions,
  SCardContainer,
  SCardFields,
  SCardHeader,
  SCardItem,
  SCardLabel,
  SCardRow,
  SCardToggleRow,
  SFormItem,
  SFormTitle,
  SRequiredStar,
} from "./createStages.styles";
import {
  ContactType,
  ICreateCompetitionFormik,
  IEventContact,
  IManager,
} from "../../model/createCompetitionFilters.types";

const contactTypeOptions: SelectProps["options"] = [
  { label: "ВКонтакте", value: "VK" },
  { label: "Telegram", value: "TG" },
  { label: "Email", value: "MAIL" },
];

const contactTypePlaceholder: Record<ContactType, string> = {
  VK: "Ссылка на группу ВК",
  TG: "Ссылка на канал или username",
  MAIL: "Адрес электронной почты",
};

export const ManagersCompetition: FC<ICreateCompetitionFormik> = ({
  managers,
  eventContacts,
  onClearStage,
}) => {
  const addContact = () => {
    eventContacts.onChange([
      ...eventContacts.value,
      { contactInfo: "", description: "" },
    ]);
  };

  const removeContact = (index: number) => {
    eventContacts.onChange(eventContacts.value.filter((_, i) => i !== index));
  };

  const updateContact = (
    index: number,
    field: keyof IEventContact,
    value: string,
  ) => {
    const updated = [...eventContacts.value];
    updated[index] = { ...updated[index], [field]: value };
    eventContacts.onChange(updated);
  };

  const addManager = () => {
    managers.onChange([
      ...managers.value,
      {
        inSystem: true,
        userId: 0,
        isCreator: false,
        role: "ADMIN",
        contacts: [{ isPrimary: true, contactInfo: { contactsType: "TG", source: "" } }],
      },
    ]);
  };

  const removeManager = (index: number) => {
    managers.onChange(managers.value.filter((_, i) => i !== index));
  };

  const updateManager = (
    index: number,
    field: keyof IManager,
    value: IManager[keyof IManager],
  ) => {
    const updated = [...managers.value];
    updated[index] = { ...updated[index], [field]: value };
    managers.onChange(updated);
  };

  const updateManagerContact = (
    managerIndex: number,
    field: "contactsType" | "source" | "isPrimary",
    value: string | boolean,
  ) => {
    const updated = [...managers.value];
    const manager = { ...updated[managerIndex] };
    const contact = { ...manager.contacts[0] };

    if (field === "isPrimary") {
      contact.isPrimary = value as boolean;
    } else {
      contact.contactInfo = { ...contact.contactInfo, [field]: value };
    }

    manager.contacts = [contact];
    updated[managerIndex] = manager;
    managers.onChange(updated);
  };

  return (
    <>
      <SFormItem>
        <SFormTitle>
          Контакты мероприятия<SRequiredStar>*</SRequiredStar>
        </SFormTitle>
        <SCardContainer>
          {eventContacts.value.map((contact, index) => (
            <SCardItem key={index}>
              <SCardHeader>
                <SCardLabel>Контакт {index + 1}</SCardLabel>
                <Button type="text" danger onClick={() => removeContact(index)}>
                  Удалить
                </Button>
              </SCardHeader>
              <SCardFields>
                <Input
                  placeholder="Ссылка, email или username"
                  value={contact.contactInfo}
                  onChange={(e) =>
                    updateContact(index, "contactInfo", e.target.value)
                  }
                />
                <Input
                  placeholder="Описание (например, «По вопросам регистрации»)"
                  value={contact.description}
                  onChange={(e) =>
                    updateContact(index, "description", e.target.value)
                  }
                />
              </SCardFields>
            </SCardItem>
          ))}
        </SCardContainer>
        <SCardActions>
          <Button type="dashed" onClick={addContact}>
            + Добавить контакт
          </Button>
        </SCardActions>
      </SFormItem>

      <SFormItem>
        <SFormTitle>Менеджеры проекта</SFormTitle>
        <SCardContainer>
          {managers.value.map((manager, index) => (
            <SCardItem key={index}>
              <SCardHeader>
                <SCardLabel>Менеджер {index + 1}</SCardLabel>
                <Button type="text" danger onClick={() => removeManager(index)}>
                  Удалить
                </Button>
              </SCardHeader>
              <SCardFields>
                <Input
                  placeholder="ID пользователя в системе"
                  value={manager.userId === 0 ? "" : String(manager.userId)}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    updateManager(index, "userId", val);
                  }}
                />
                <SCardToggleRow>
                  <Switch
                    checked={manager.isCreator}
                    onChange={(val) => updateManager(index, "isCreator", val)}
                  />
                  Является создателем
                </SCardToggleRow>
                <SCardRow>
                  <Select
                    options={contactTypeOptions}
                    value={manager.contacts[0]?.contactInfo.contactsType}
                    onChange={(val) =>
                      updateManagerContact(index, "contactsType", val as ContactType)
                    }
                    allowClear={false}
                  />
                  <Input
                    placeholder={
                      contactTypePlaceholder[
                        manager.contacts[0]?.contactInfo.contactsType ?? "TG"
                      ]
                    }
                    value={manager.contacts[0]?.contactInfo.source}
                    onChange={(e) =>
                      updateManagerContact(index, "source", e.target.value)
                    }
                  />
                </SCardRow>
                <SCardToggleRow>
                  <Switch
                    checked={manager.contacts[0]?.isPrimary}
                    onChange={(val) =>
                      updateManagerContact(index, "isPrimary", val)
                    }
                  />
                  Основной контакт
                </SCardToggleRow>
              </SCardFields>
            </SCardItem>
          ))}
        </SCardContainer>
        <SCardActions>
          <Button type="dashed" onClick={addManager}>
            + Добавить менеджера
          </Button>
        </SCardActions>
      </SFormItem>

      <Button color="gray" onClick={onClearStage}>
        Очистить все
      </Button>
    </>
  );
};
