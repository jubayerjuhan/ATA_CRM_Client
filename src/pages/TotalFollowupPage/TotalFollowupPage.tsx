import { client } from "@/api/api";
import { MyCustomersTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { AppState, LeadType } from "@/types";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";

export const TotalFollowups = () => {
  const { followUp: followUpState } = useSelector((state: AppState) => state);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [followUps, setFollowUps] = React.useState<LeadType[]>([]);

  useEffect(() => {
    const fetchTotalFollowups = async () => {
      setLoading(true);
      try {
        const { data } = await client.get(`/followups`);
        setFollowUps(data.totalFollowups);
      } catch (error) {
        toast.error("Failed to fetch total followups");
      } finally {
        setLoading(false);
      }
    };
    fetchTotalFollowups();
  }, []);

  return (
    <DashboardLayout>
      <MyCustomersTable
        title="Total Follow Up's"
        customers={followUps}
        loading={loading}
      />
    </DashboardLayout>
  );
};
