export const formatUtcToShortDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
