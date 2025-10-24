import { FC, PropsWithChildren } from "react";

import { STag } from "./tag.styles";

export const Tag: FC<PropsWithChildren> = ({ children }) => {
  return <STag>{children}</STag>;
};
