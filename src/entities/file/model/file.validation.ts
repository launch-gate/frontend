import { number, object, string } from "yup";

export const fileSchema = object({
  id: number().integer().optional(),
  originalFilename: string().optional(),
  contentType: string().optional(),
  sizeBytes: number().integer().optional(),
}).required();

export const downloadUrlSchema = object({
  url: string().optional(),
}).required();
