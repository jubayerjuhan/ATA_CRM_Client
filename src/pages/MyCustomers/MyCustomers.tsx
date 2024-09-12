import { MyCustomersTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { getLeadsByUserId } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const MyCustomers = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const { auth } = useSelector((state: AppState) => state);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchMyCustomers = async () => {
      await dispatch(getLeadsByUserId(auth.profile?._id as string));
    };
    fetchMyCustomers();
  }, [dispatch, auth.profile?._id]);

  return (
    <DashboardLayout>
      <MyCustomersTable leads={leadState.leads} loading={leadState.loading} />
    </DashboardLayout>
  );
};
