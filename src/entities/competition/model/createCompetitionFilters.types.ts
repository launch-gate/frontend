import { ChangeEvent } from "react";
import { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

import { ITag } from "@/entities/tags";
import { InputProps } from "@/shared/components";
import { ICreateCompetitionRequest } from "@/entities/competition/api/createCompetition";
import { IUpload } from "@/features/UploadImage";

export type RoleType = "ADMIN";

export type ContactType = "VK" | "TG" | "MAIL";
export interface IContactInfo {
  contactsType: ContactType;
  source: string;
}
export interface IContact {
  isPrimary: boolean;
  contactInfo: IContactInfo;
}
export interface IEventContact {
  contactInfo: string;
  description: string;
}
export interface IManager {
  inSystem: boolean;
  userId: number;
  isCreator: boolean;
  role: RoleType;
  contacts: IContact[];
}
export type PrizeType = "MONEY" | "CRYPTO" | "CUSTOM";
export interface IPrize {
  medalPlace: number;
  type: PrizeType;
  source: string;
}
export interface Iprize {
  description: string;
  prizes: IPrize[];
}
export type CompetitionType = "HACKATHON" | "IDEATON" | "RESEARCH";
export type CompetitionFormatType = "ONLINE" | "OFFLINE" | "HYBRID";

export interface ICreateCompetition {
  currentStage: number;
  name: string;
  isDraft: boolean;
  registrationDateRange: Pair<DateType>;
  competitionDateRange: Pair<DateType>;
  resultDateRange: Pair<DateType>;
  shortDescription: string;
  tagInfos: ITag["id"][];
  competitionType: CompetitionType | null;
  competitionFormat: CompetitionFormatType | null;
  isPublic: boolean;
  participantAgeRange: Pair<number>;
  targetAudience: string;
  isTeamRequired: boolean;
  teamSizeRange: Pair<number>;
  isCountry: boolean;
  managers: IManager[];
  eventContacts: IEventContact[];
  prize: Iprize;
  mainImageUrl: IUpload | null;
}

export type StageType = number;
export type Pair<T> = T[];
export type DateType = number | null | undefined;

export interface ICreateCompetitionFormik {
  currentStage: { value: StageType; onChange: (stage: StageType) => void };
  name: {
    value: string;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  registrationDateRange: {
    value: Pair<DateType>;
    onChange: RangePickerProps["onChange"];
    placeholder: [string, string];
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  competitionDateRange: {
    value: Pair<DateType>;
    onChange: RangePickerProps["onChange"];
    placeholder: [string, string];
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  resultDateRange: {
    value: Pair<DateType>;
    onChange: RangePickerProps["onChange"];
    placeholder: [string, string];
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  shortDescription: {
    value: string;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  tagInfos: {
    value: ITag["id"][];
    onChange: (tagValues: ITag["id"][]) => void;
    placeholder: string;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  competitionType: {
    value: CompetitionType | null;
    placeholder: string;
    onChange: (competitionType: CompetitionType) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  competitionFormat: {
    value: CompetitionFormatType | null;
    placeholder: string;
    onChange: (competitionType: CompetitionFormatType) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  isPublic: {
    value: boolean;
    placeholder: string;
    onChange: (e: boolean) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  participantAgeRange: {
    value: Pair<number>;
    onChange: (values: Pair<number>) => void;
    placeholder: Pair<string>;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  targetAudience: {
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  isTeamRequired: {
    value: boolean;
    placeholder: string;
    onChange: (e: boolean) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  teamSizeRange: {
    value: Pair<number>;
    onChange: (values: Pair<number>) => void;
    placeholder: Pair<string>;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  isCountry: {
    value: boolean;
    placeHolder: string;
    onChange: (e: boolean) => void;
    validateStatus: InputProps["validateStatus"];
    help: InputProps["help"];
  };
  mainImageUrl: {
    value: IUpload | null;
    onChange: (upload: IUpload | null) => void;
  };
  prize: {
    description: {
      value: string;
      placeHolder: string;
      onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
      validateStatus: InputProps["validateStatus"];
      help: InputProps["help"];
    };
    prizesInfo: {
      value: IPrize[];
      placeHolder: string;
      onChange: (prizesInfo: IPrize[]) => void;
    };
  };
  submitForm: (form: ICreateCompetitionRequest) => void;
}

export interface ICreateCompetitionStore {
  createCompetitionState: ICreateCompetition;

  setState: (state: ICreateCompetition) => void;
  resetState: () => void;
  getState: () => ICreateCompetition;
}
