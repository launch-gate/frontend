import { object, string, number, array, boolean, mixed } from "yup";

export const createCompetitionValidationSchema = object({
  currentStage: number()
    .required("Текущий этап обязателен")
    .min(0, "Текущий этап не может быть отрицательным"),

  name: string()
    .required("Название конкурса обязательно")
    .min(3, "Название должно содержать минимум 3 символа"),

  isDraft: boolean().required("Статус черновика обязателен"),

  registrationDateRange: array()
    .length(
      2,
      "Диапазон дат регистрации должен содержать начальную и конечную дату",
    )
    .required("Диапазон дат регистрации обязателен"),

  competitionDateRange: array()
    .length(
      2,
      "Диапазон дат проведения должен содержать начальную и конечную дату",
    )
    .required("Диапазон дат проведения обязателен"),

  resultDateRange: array()
    .length(
      2,
      "Диапазон дат результатов должен содержать начальную и конечную дату",
    )
    .required("Диапазон дат результатов обязателен"),

  shortDescription: string()
    .required("Краткое описание обязательно")
    .min(6, "Краткое описание должно содержать минимум 6 символов"),

  tagInfos: array()
    .required("Теги обязательны")
    .min(1, "Должен быть выбран хотя бы один тег"),

  competitionType: mixed().nullable().required("Тип конкурса обязателен"),

  competitionFormat: mixed().nullable().required("Формат конкурса обязателен"),

  isPublic: boolean().required("Публичный статус обязателен"),

  participantAgeRange: array()
    .length(
      2,
      "Диапазон возраста участников должен содержать минимальный и максимальный возраст",
    )
    .required("Диапазон возраста участников обязателен"),

  targetAudience: string()
    .required("Целевая аудитория обязательна")
    .min(6, "Описание целевой аудитории должно содержать минимум 6 символов"),

  isTeamRequired: boolean().required("Статус командности обязателен"),

  teamSizeRange: array()
    .length(
      2,
      "Диапазон размера команды должен содержать минимальный и максимальный размер",
    )
    .required("Диапазон размера команды обязателен"),

  isCountry: boolean().required("Статус странового ограничения обязателен"),

  /*managers: array()
    .required("Менеджеры обязательны")
    .min(1, "Должен быть назначен хотя бы один менеджер"),

  eventContacts: array()
    .required("Контакты мероприятия обязательны")
    .min(1, "Должен быть указан хотя бы один контакт"),*/

  prize: object({
    description: string()
      .required("Описание призов обязательно")
      .min(6, "Описание призов должно содержать минимум 6 символов"),
    prizes: array()
      .required("Призы обязательны")
      .min(1, "Должен быть указан хотя бы один приз"),
  }).required("Информация о призах обязательна"),
});
