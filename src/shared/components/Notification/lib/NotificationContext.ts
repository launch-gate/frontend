"use client";

import { createContext } from "react";

import { IToastBarContext } from "../model/toastBar.types";

export const NotificationContext = createContext<IToastBarContext | undefined>(
  undefined,
);
