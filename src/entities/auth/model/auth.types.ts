import {
  IContactRequest,
  IUserProfileResponse,
  AccountType,
} from "@/entities/user";

export interface IRegisterRequest {
  email: string;
  password: string;
  accountType: AccountType;
  fullName?: string;
  nickname?: string;
  bio?: string;
  contacts?: IContactRequest[];
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken?: string;
  tokenType?: string;
  expiresInSeconds?: number;
  user?: IUserProfileResponse;
}
