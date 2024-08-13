import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DashboardLayout } from "@/app_components/DashboardLayout";
import { UsersTable } from "@/app_components/UsersTable/UsersTable";

import { getAllUsers } from "@/redux/actions/userActions";
import { AppDispatch, AppState } from "@/types";

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<any[]>([]);

  const { user } = useSelector((state: AppState) => state);

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getAllUsers());
    };
    // Fetch users data from the server
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    if (user.users) {
      setUsers(user.users);
    }
  }, [user.users]);

  return (
    <DashboardLayout>
      <UsersTable users={users} loading={user.loading} />
    </DashboardLayout>
  );
};
