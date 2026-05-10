import { array, number, object, string } from "yup";

const tagSchema = object({
  name: string().required("РќР°Р·РІР°РЅРёРµ С‚РµРіР° РѕР±СЏР·Р°С‚РµР»СЊРЅРѕ"),
  id: number()
    .required("ID С‚РµРіР° РѕР±СЏР·Р°С‚РµР»СЊРЅРѕ")
    .positive(
      "ID РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РїРѕР»РѕР¶РёС‚РµР»СЊРЅС‹Рј С‡РёСЃР»РѕРј",
    ),
});

export const tagsArraySchema = array()
  .of(tagSchema)
  .required("РњР°СЃСЃРёРІ С‚РµРіРѕРІ РѕР±СЏР·Р°С‚РµР»РµРЅ");
