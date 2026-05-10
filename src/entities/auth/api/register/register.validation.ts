import {
  authResponseSchema,
  registerRequestSchema,
} from "../../model/auth.validation";

export const registerRequestValidationSchema = registerRequestSchema;
export const registerResponseValidationSchema = authResponseSchema;
