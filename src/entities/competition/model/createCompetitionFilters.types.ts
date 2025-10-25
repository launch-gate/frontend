import { ChangeEvent } from "react";
import { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

export type RoleType = "ADMIN";
export interface ITag {
  name: string;
  id: number;
}
export type ContactType = "VK" | "TG" | "MAIL";
export interface IContactInfo {
  contactsType: ContactType;
  source: string;
}
export interface IContactInfo {
  contactsTypeString: string; //TODO поменять на contactsType
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
  hostId: number;
}
export type PrizeType = "MONEY" | "CRYPTO" | "CUSTOM";
export interface IPrize {
  medalPlace: number;
  type: PrizeType;
  source: string;
}
export interface IPrizeInfo {
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
  prizeInfo: IPrizeInfo;
}

export type StageType = number;
export type Pair<T> = T[];
export type DateType = number | null | undefined;
export type DateDayjsType = Dayjs | null;

export interface ICreateCompetitionFormik {
  currentStage: { value: StageType; onChange: (stage: StageType) => void };
  name: {
    value: string;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  registrationDateRange: {
    value: Pair<DateType>;
    onChange: RangePickerProps["onChange"];
    placeholder: Pair<string>;
  };
  competitionDateRange: {
    value: Pair<DateType>;
    onChange: RangePickerProps["onChange"];
    placeholder: Pair<string>;
  };
  resultDateRange: {
    value: Pair<DateType>;
    onChange: RangePickerProps["onChange"];
    placeholder: Pair<string>;
  };
  shortDescription: {
    value: string;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };
  tagInfos: {
    value: ITag["id"][];
    onChange: (tagValues: ITag["id"][]) => void;
    placeholder: string;
  };
  competitionType: {
    value: string | null;
    placeholder: string;
    onChange: (competitionType: CompetitionType) => void;
  };
  isPublic: {
    value: boolean;
    placeholder: string;
    onChange: (e: boolean) => void;
  };
  participantAgeRange: {
    value: Pair<number>;
    onChange: (values: Pair<number>) => void;
    placeholder: Pair<string>;
  };
  targetAudience: {
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  isTeamRequired: {
    value: boolean;
    placeholder: string;
    onChange: (e: boolean) => void;
  };
  teamSizeRange: {
    value: Pair<number>;
    onChange: (values: Pair<number>) => void;
    placeholder: Pair<string>;
  };
  isCountry: {
    value: boolean;
    placeHolder: string;
    onChange: (e: boolean) => void;
  };
  prizeInfo: {
    description: {
      value: string;
      placeHolder: string;
      onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    };
    prizesInfo: {
      value: IPrize[];
      placeHolder: string;
      onChange: (prizesInfo: IPrize[]) => void;
    };
  };
}

export interface ICreateCompetitionStore {
  createCompetitionState: ICreateCompetition;

  setState: (state: ICreateCompetition) => void;
  resetState: () => void;
  getState: () => ICreateCompetition;
}
