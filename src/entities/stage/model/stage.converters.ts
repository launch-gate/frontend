import { IValueRequest, IValueRequestInput } from "./stage.types";

export const toValueRequest = ({
  fileIds,
  ...value
}: IValueRequestInput): IValueRequest => ({
  ...value,
  fileIds: Array.isArray(fileIds) ? fileIds.join(",") : fileIds,
});

/** Нормализует fileFormats из ответа бэкенда: массив → строка через запятую */
export const normalizeFileFormats = (
  fileFormats?: string | string[] | null,
): string | undefined => {
  if (!fileFormats) return undefined;
  return Array.isArray(fileFormats) ? fileFormats.join(",") : fileFormats;
};
