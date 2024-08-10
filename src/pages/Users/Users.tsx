import { DashboardLayout } from "@/app_components/DashboardLayout";
import { UsersTable } from "@/app_components/UsersTable/UsersTable";

export const Users = () => {
  return (
    <DashboardLayout>
      <UsersTable />
    </DashboardLayout>
  );
};
