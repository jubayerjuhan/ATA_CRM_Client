import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DashboardLayout } from "@/app_components/DashboardLayout";

import { getAllCustomers } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";
import { AllCustomersTable } from "@/app_components";

export const AllCustomers = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAllLeads = async () => {
      await dispatch(getAllCustomers());
    };
    fetchAllLeads();
  }, [dispatch]);

  console.log("object");
  return (
    <DashboardLayout>
      <AllCustomersTable
        customers={leadState.leads}
        loading={leadState.loading}
      />
    </DashboardLayout>
  );
};
