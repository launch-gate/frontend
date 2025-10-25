import { array, number, object, string } from "yup";

const tagSchema = object({
  name: string().required("Название тега обязательно"),
  id: number()
    .required("ID тега обязательно")
    .positive("ID должен быть положительным числом"),
});

export const tagsArraySchema = array()
  .of(tagSchema)
  .required("Массив тегов обязателен");
