import { client } from "@/api/api";
import { FacebookLeadTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import React from "react";
import toast from "react-hot-toast";

export const FacebookLeadList = () => {
  const [leads, setLeads] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/facebook-leads");
        setLeads(data);
      } catch (error) {
        toast.error("Failed to fetch Facebook leads");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  return (
    <DashboardLayout>
      <FacebookLeadTable leads={leads} loading={loading} setLeads={setLeads} />
    </DashboardLayout>
  );
};
