import { useDispatch } from "react-redux";
import { Profiler, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DashboardLayout } from "@/app_components/DashboardLayout";
import { UsersTable } from "@/app_components/UsersTable/UsersTable";

import { getAllUsers } from "@/redux/actions/userActions";
import { AppDispatch, AppState } from "@/types";
import { AddUserFormModal } from "@/app_components";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";

const usersTableProfiler = createTableProfilerCallback("UsersTable");

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<any[]>([]);

  const { user } = useSelector((state: AppState) => state);
  useTableRenderTracker("UsersTable", {
    rows: users.length,
    loading: user.loading,
  });

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
      <AddUserFormModal />
      <Profiler id="UsersTable" onRender={usersTableProfiler}>
        <UsersTable users={users} loading={user.loading} />
      </Profiler>
    </DashboardLayout>
  );
};
