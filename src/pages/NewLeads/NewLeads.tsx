import React, { useCallback, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { DashboardLayout } from "@/app_components/DashboardLayout";

import { claimLead, getAllLeads } from "@/redux/actions";
import { AppDispatch, AppState, LeadType } from "@/types";
import { NewLeadsTable } from "@/app_components";

export const NewLeads = () => {
  const [claimLeadLoading, setClaimLeadLoading] = React.useState(false);
  const { lead: leadState } = useSelector((state: AppState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [unclaimedLeads, setUnclaimedLeads] = React.useState<LeadType[]>([]);

  const fetchAllLeads = useCallback(async () => {
    await dispatch(getAllLeads());
  }, [dispatch]);

  useEffect(() => {
    fetchAllLeads();
  }, [fetchAllLeads]);

  useEffect(() => {
    if (leadState.leads) {
      const unclaimedLeads = leadState.leads.filter((lead) => !lead.claimed_by);
      setUnclaimedLeads(unclaimedLeads);
    }
  }, [leadState.leads]);

  const onClaimLead = async (lead: LeadType) => {
    if (claimLeadLoading) {
      return;
    }
    setClaimLeadLoading(true);

    const claimStatusSuccess = await claimLead(lead);

    if (claimStatusSuccess) {
      await fetchAllLeads();
    }
    setClaimLeadLoading(false);
  };

  return (
    <DashboardLayout>
      <NewLeadsTable
        claimLeadLoading={claimLeadLoading}
        onClaimLead={onClaimLead}
        leads={unclaimedLeads}
        loading={leadState.loading}
      />
    </DashboardLayout>
  );
};
