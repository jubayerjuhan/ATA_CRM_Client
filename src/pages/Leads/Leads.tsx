import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DashboardLayout } from "@/app_components/DashboardLayout";

import { getAllLeads } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";
import { AllLeadsTable } from "@/app_components";

export const Leads = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAllLeads = async () => {
      await dispatch(getAllLeads());
    };
    fetchAllLeads();
  }, [dispatch]);

  console.log("object");
  return (
    <DashboardLayout>
      <AllLeadsTable customers={leadState.leads} loading={leadState.loading} />
    </DashboardLayout>
  );
};
