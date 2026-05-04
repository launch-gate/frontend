import { array, object, string, mixed, number } from "yup";

import {
  contactRequestSchema,
  userProfileSchema,
} from "@/entities/user/model/user.validation";
import { AccountType } from "@/entities/user";

export const registerRequestSchema = object({
  email: string().email().required(),
  password: string().min(6).max(120).required(),
  accountType: mixed<AccountType>()
    .oneOf(["ORGANIZER", "PARTICIPANT"])
    .required(),
  fullName: string().optional(),
  nickname: string().optional(),
  bio: string().optional(),
  contacts: array().of(contactRequestSchema).optional(),
});

export const loginRequestSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export const authResponseSchema = object({
  accessToken: string().optional(),
  tokenType: string().optional(),
  expiresInSeconds: number().integer().optional(),
  user: userProfileSchema.optional(),
}).required();
