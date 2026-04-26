export const dynamic = "force-dynamic";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return <>{children}</>;
}
