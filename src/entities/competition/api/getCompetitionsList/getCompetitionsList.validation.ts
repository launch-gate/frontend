import { array, number, object, string } from "yup";

export const cargoTypeSchema = array()
  .of(
    object({
      cargoTypeGUID: string().required("CargoTypeGUID обязателен"),
      cargoTypeName: string().required("CargoTypeName обязателен"),
      cargoTypeMinT: number().defined(),
      cargoTypeMaxT: number().defined(),
    }),
  )
  .required();
