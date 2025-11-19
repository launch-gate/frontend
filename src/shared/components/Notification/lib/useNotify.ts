import { useContext } from "react";

import { NotificationContext } from "./NotificationContext";

export const useNotify = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotify must be used inside NotificationProvider");
  }

  return ctx.notify;
};
