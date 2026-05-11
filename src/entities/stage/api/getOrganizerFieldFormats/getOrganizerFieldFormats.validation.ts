import { array, object, string } from "yup";

export const fieldFormatItemSchema = object({
  format: string().optional(),
  category: string().optional(),
});

export const getOrganizerFieldFormatsResponseSchema = object({
  formats: array().of(fieldFormatItemSchema).optional(),
}).required();
