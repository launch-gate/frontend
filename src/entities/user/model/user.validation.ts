import { array, mixed, object, string, number, boolean } from "yup";

import { AccountType, UserContactType } from "./user.types";

export const contactRequestSchema = object({
  type: mixed<UserContactType>().oneOf(["TELEGRAM", "VK", "EMAIL"]).required(),
  value: string().required(),
  primaryContact: boolean().optional(),
});

export const contactResponseSchema = object({
  id: number().integer().optional(),
  type: mixed<UserContactType>().oneOf(["TELEGRAM", "VK", "EMAIL"]).optional(),
  value: string().optional(),
  primaryContact: boolean().optional(),
});

export const userProfileSchema = object({
  id: number().integer().optional(),
  email: string().optional(),
  accountType: mixed<AccountType>()
    .oneOf(["ORGANIZER", "PARTICIPANT"])
    .optional(),
  fullName: string().optional(),
  nickname: string().optional(),
  bio: string().optional(),
  contacts: array().of(contactResponseSchema).optional(),
}).required();

export const updateProfileSchema = object({
  fullName: string().optional(),
  nickname: string().optional(),
  bio: string().optional(),
  contacts: array().of(contactRequestSchema).optional(),
});
