import React, { useCallback, useEffect } from "react";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { LeadType } from "@/types";
import { NewLeadsTable } from "@/app_components";
import { client } from "@/api/api";

export const NewLeads = () => {
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

  return (
    <DashboardLayout>
      <NewLeadsTable leads={unclaimedLeads} />
    </DashboardLayout>
  );
};
