import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LeadsTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";

import { getAllLeads } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";

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
      <LeadsTable
        leads={leadState.leads ? leadState.leads : []}
        loading={leadState.loading}
      />
    </DashboardLayout>
  );
};
