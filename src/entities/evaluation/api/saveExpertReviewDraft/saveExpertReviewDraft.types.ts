import {
  IReviewDraftRequest,
  IReviewResponse,
} from "../../model/evaluation.types";

export interface ISaveExpertReviewDraftVariables {
  assignmentId: number;
  data: IReviewDraftRequest;
}

export type ISaveExpertReviewDraftResponse = IReviewResponse;
