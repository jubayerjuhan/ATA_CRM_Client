import { client } from "@/api/api";
import { RefundListTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import React from "react";
import toast from "react-hot-toast";

const RefundList = () => {
  const [refunds, setRefunds] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchRefunds = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/refund");
        setRefunds(data);
      } catch (error) {
        toast.error("Failed to fetch refunds");
      } finally {
        setLoading(false);
      }
    };
    fetchRefunds();
  }, []);
  return (
    <DashboardLayout>
      <RefundListTable refunds={refunds} loading={loading} />
    </DashboardLayout>
  );
};

export default RefundList;
