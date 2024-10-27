import { MyCustomersTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { getCancelledLeads } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const CancelledCustomers = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const { auth } = useSelector((state: AppState) => state);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchCancelledCustomers = async () => {
      await dispatch(getCancelledLeads());
    };
    fetchCancelledCustomers();
  }, [dispatch, auth.profile?._id]);

  return (
    <DashboardLayout>
      <MyCustomersTable
        title="Lost Sales"
        customers={leadState.leads}
        loading={leadState.loading}
      />
    </DashboardLayout>
  );
};
