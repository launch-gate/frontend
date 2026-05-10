import { IMentorCommentListResponse } from "../../model/mentor.types";

export interface IGetStageSubmissionMentorCommentsVariables {
  stageSubmissionId: number;
}

export type IGetStageSubmissionMentorCommentsResponse =
  IMentorCommentListResponse;
