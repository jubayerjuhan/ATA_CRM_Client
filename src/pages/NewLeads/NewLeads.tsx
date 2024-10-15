import React, { useCallback, useEffect } from "react";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { claimLead } from "@/redux/actions";
import { LeadType } from "@/types";
import { NewLeadsTable } from "@/app_components";
import { client } from "@/api/api";

export const NewLeads = () => {
  const [claimLeadLoading, setClaimLeadLoading] = React.useState(false);

  const [unclaimedLeads, setUnclaimedLeads] = React.useState<LeadType[]>([]);

  const fetchUnclaimedLeads = useCallback(async () => {
    try {
      const response = await client.get("/leads/unclaimed");
      setUnclaimedLeads(response.data.leads);
    } catch (error) {
      console.error("Failed to fetch unclaimed leads", error);
    }
  }, []);

  useEffect(() => {
    fetchUnclaimedLeads();
  }, [fetchUnclaimedLeads]);

  const onClaimLead = async (lead: LeadType) => {
    if (claimLeadLoading) {
      return;
    }
    setClaimLeadLoading(true);

    const claimStatusSuccess = await claimLead(lead);

    if (claimStatusSuccess) {
      await fetchUnclaimedLeads();
    }
    setClaimLeadLoading(false);
  };

  return (
    <DashboardLayout>
      <NewLeadsTable
        claimLeadLoading={claimLeadLoading}
        onClaimLead={onClaimLead}
        leads={unclaimedLeads}
        loading={claimLeadLoading}
      />
    </DashboardLayout>
  );
};
