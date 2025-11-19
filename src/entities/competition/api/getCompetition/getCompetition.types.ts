import { ICreateCompetitionRequest, IPrizes } from "@/entities/competition/api";
import { ITag } from "@/entities/tags";

export interface GetCompetitionType
  extends Omit<
    ICreateCompetitionRequest,
    "isDraft" | "shortDescription" | "tagInfos" | "mainImageUrl" | "prize"
  > {
  shortDescription: string;
  tagInfos: ITag["name"][];
  mainImageUrl: string;
  prize: IPrizes;
}
