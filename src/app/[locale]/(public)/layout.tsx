import { PropsWithChildren } from "react";

import { PublicLayout } from "@/screens/PublicLayout";

export default async function Layout({ children }: PropsWithChildren) {
  return <PublicLayout>{children}</PublicLayout>;
}
