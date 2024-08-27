import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { DashboardLayout } from "@/app_components/DashboardLayout";

import { getAllLeads } from "@/redux/actions";
import { AppDispatch, AppState, LeadType } from "@/types";
import { NewLeadsTable } from "@/app_components";

export const NewLeads = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [unclaimedLeads, setUnclaimedLeads] = React.useState<LeadType[]>([]);

  useEffect(() => {
    const fetchAllLeads = async () => {
      await dispatch(getAllLeads());
    };
    fetchAllLeads();
  }, [dispatch]);

  useEffect(() => {
    if (leadState.leads) {
      const unclaimedLeads = leadState.leads.filter((lead) => !lead.claimed_by);
      setUnclaimedLeads(unclaimedLeads);
    }
  }, [leadState.leads]);

  return (
    <DashboardLayout>
      <NewLeadsTable leads={unclaimedLeads} loading={false} />
    </DashboardLayout>
  );
};
