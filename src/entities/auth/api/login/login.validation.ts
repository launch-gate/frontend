import {
  authResponseSchema,
  loginRequestSchema,
} from "../../model/auth.validation";

export const loginRequestValidationSchema = loginRequestSchema;
export const loginResponseValidationSchema = authResponseSchema;
