import { client } from "@/api/api";
import { WhatsAppLeadsTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import React from "react";
import toast from "react-hot-toast";

const WhatsAppLeadsList = () => {
  const [leads, setLeads] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/whatsapp-leads/my-leads");
        setLeads(data);
      } catch (error) {
        toast.error("Failed to fetch WhatsApp leads");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  return (
    <DashboardLayout>
      <WhatsAppLeadsTable leads={leads} loading={loading} />
    </DashboardLayout>
  );
};

export default WhatsAppLeadsList;
