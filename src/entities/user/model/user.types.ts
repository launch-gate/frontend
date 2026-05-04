export type AccountType = "ORGANIZER" | "PARTICIPANT";
export type UserContactType = "TELEGRAM" | "VK" | "EMAIL";

export interface IContactRequest {
  type: UserContactType;
  value: string;
  primaryContact?: boolean;
}

export interface IContactResponse {
  id?: number;
  type?: UserContactType;
  value?: string;
  primaryContact?: boolean;
}

export interface IUserProfileResponse {
  id?: number;
  email?: string;
  accountType?: AccountType;
  fullName?: string;
  nickname?: string;
  bio?: string;
  contacts?: IContactResponse[];
}

export interface IUpdateProfileRequest {
  fullName?: string;
  nickname?: string;
  bio?: string;
  contacts?: IContactRequest[];
}
