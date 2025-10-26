import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ValidationError } from "yup";

import API, { DetailsError, IError } from "@/shared/api";

import { ICreateCompetitionRequest } from "./createCompetition.types";

export const createCompetitionKey = "createCompetition";

const createCompetition = async (
  competition: ICreateCompetitionRequest,
): Promise<void> =>
  API<void>({
    url: "/competitions",
    method: "POST",
    data: competition,
  })
    .then(() => {
      return;
    })
    .catch(async (error: AxiosError<IError> | ValidationError) => {
      if (error instanceof AxiosError) {
        return Promise.reject(error);
      }
      const validation = error.inner.map((error) => error.message);
      throw new DetailsError("/competitions", { validation });
    });

export const useCreateCompetition = () =>
  useMutation<
    void,
    AxiosError<IError> | DetailsError,
    ICreateCompetitionRequest
  >({
    mutationKey: [createCompetitionKey],
    mutationFn: createCompetition,
  });

export * from "./createCompetition.types";
