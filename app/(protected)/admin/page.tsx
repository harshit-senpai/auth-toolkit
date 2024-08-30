"use client";

import { RoleGate } from "@/components/auth/roleGate";
import { FormSuccess } from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onAPIRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("OK");
      } else {
        toast.error("FORBIDDEN");
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-semibold">Admin-only API route</p>
          <Button onClick={onAPIRouteClick}>Click to text</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-semibold">Admin-only Server Action</p>
          <Button>Click to text</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
