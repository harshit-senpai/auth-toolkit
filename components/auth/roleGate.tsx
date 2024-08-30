"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import { FormErrors } from "../FormErrors";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRoles) {
    return <FormErrors message="You are not authorized to access this page" />;
  }

  return <>{children}</>;
};
