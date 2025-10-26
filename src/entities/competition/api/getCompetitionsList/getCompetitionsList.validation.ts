import { object, string, number, array, boolean, mixed } from "yup";

import {
  CompetitionFormatType,
  CompetitionType,
  ContactType,
  PrizeType,
  RoleType,
} from "../../model/createCompetitionFilters.types";

const contactInfoSchema = object({
  contactsType: mixed<ContactType>()
    .oneOf(["VK", "TG", "MAIL"])
    .required("Тип контакта обязателен"),
  source: string().required("Источник контакта обязателен"),
});

const contactSchema = object({
  isPrimary: boolean().required("Статус основного контакта обязателен"),
  contactInfo: contactInfoSchema.required("Информация о контакте обязательна"),
});

const managerSchema = object({
  inSystem: boolean().required("Статус в системе обязателен"),
  userId: number().required("ID пользователя обязателен"),
  isCreator: boolean().required("Статус создателя обязателен"),
  role: mixed<RoleType>().oneOf(["ADMIN"]).required("Роль обязательна"),
  contacts: array().of(contactSchema).required("Контакты обязательны"),
});

const eventContactSchema = object({
  contactInfo: string().required("Контактная информация обязательна"),
  description: string().required("Описание контакта обязательно"),
});

const prizeSchema = object({
  medalPlace: number().required("Место приза обязательно"),
  type: mixed<PrizeType>()
    .oneOf(["MONEY", "CRYPTO", "CUSTOM"])
    .required("Тип приза обязателен"),
  source: string().required("Источник приза обязателен"),
});

const prizeInfoSchema = object({
  description: string().nullable(),
  prizes: array().of(prizeSchema).required("Призы обязательны"),
});

export const competitionItemSchema = object({
  id: number().required(),

  name: string().required("Название конкурса обязательно"),

  isDraft: boolean().required("Статус черновика обязателен"),

  registrationDateRange: array()
    .length(
      2,
      "Диапазон дат регистрации должен содержать начальную и конечную дату",
    )
    .required("Диапазон дат регистрации обязателен"),

  competitionDateRange: array().required("Диапазон дат проведения обязателен"),

  resultDateRange: array().required("Диапазон дат результатов обязателен"),

  shortDescription: string()
    .required("Краткое описание обязательно")
    .min(6, "Краткое описание должно содержать минимум 6 символов"),

  tagInfos: array()
    .of(string().required("Тег обязателен"))
    .required("Теги обязательны"),

  competitionType: mixed<CompetitionType>()
    .oneOf(["HACKATHON", "IDEATON", "RESEARCH"], "Неверный тип конкурса")
    .required("Тип конкурса обязателен"),

  competitionFormat: mixed<CompetitionFormatType>()
    .oneOf(["ONLINE", "OFFLINE", "HYBRID"], "Неверный формат конкурса")
    .required("Формат конкурса обязателен"),

  isPublic: boolean().required("Публичный статус обязателен"),

  participantAgeRange: array()
    .of(number().required("Возраст должен быть числом"))
    .required("Диапазон возраста участников обязателен"),

  targetAudience: string().required("Целевая аудитория обязательна"),

  isTeamRequired: boolean().required("Статус командности обязателен"),

  teamSizeRange: array()
    .of(number().required("Размер команды должен быть числом"))
    .required("Диапазон размера команды обязателен"),

  isCountry: boolean().required("Статус странового ограничения обязателен"),

  managers: array().of(managerSchema).required("Менеджеры обязательны"),

  eventContacts: array()
    .of(eventContactSchema)
    .required("Контакты мероприятия обязательны"),

  prize: prizeInfoSchema.required("Информация о призах обязательна"),
});

export const competitionsListValidationSchema = array()
  .of(competitionItemSchema)
  .required("Список конкурсов обязателен")
  .min(0, "Список конкурсов не может быть отрицательным");
