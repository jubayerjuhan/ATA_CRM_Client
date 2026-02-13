import { client } from "@/api/api";
import { WhatsAppLeadsTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import React, { Profiler } from "react";
import toast from "react-hot-toast";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";

const whatsAppLeadsTableProfiler = createTableProfilerCallback(
  "WhatsAppLeadsTable"
);

const WhatsAppLeadsList = () => {
  const [leads, setLeads] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  useTableRenderTracker("WhatsAppLeadsTable", {
    rows: leads.length,
    loading,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  React.useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/whatsapp-leads", {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
        });
        setLeads(data.leads || []);
        setRowCount(data.pagination?.totalCount ?? 0);
      } catch (error) {
        toast.error("Failed to fetch WhatsApp leads");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <DashboardLayout>
      <Profiler id="WhatsAppLeadsTable" onRender={whatsAppLeadsTableProfiler}>
        <WhatsAppLeadsTable
          leads={leads}
          loading={loading}
          pagination={pagination}
          rowCount={rowCount}
          onPaginationChange={(updater) => {
            setPagination((prev) =>
              typeof updater === "function" ? updater(prev) : updater
            );
          }}
        />
      </Profiler>
    </DashboardLayout>
  );
};

export default WhatsAppLeadsList;
