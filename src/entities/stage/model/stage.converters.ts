import { IValueRequest, IValueRequestInput } from "./stage.types";

export const toValueRequest = ({
  fileIds,
  ...value
}: IValueRequestInput): IValueRequest => ({
  ...value,
  fileIds: Array.isArray(fileIds) ? fileIds.join(",") : fileIds,
});
