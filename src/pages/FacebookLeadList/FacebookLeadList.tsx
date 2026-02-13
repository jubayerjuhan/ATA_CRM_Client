import { client } from "@/api/api";
import { FacebookLeadTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import React, { Profiler } from "react";
import toast from "react-hot-toast";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";

const facebookLeadsTableProfiler = createTableProfilerCallback(
  "FacebookLeadTable"
);

export const FacebookLeadList = () => {
  const [leads, setLeads] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  useTableRenderTracker("FacebookLeadTable", {
    rows: leads.length,
    loading,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  React.useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/facebook-leads", {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
        });
        setLeads(data.leads || []);
        setRowCount(data.pagination?.totalCount ?? 0);
      } catch (error) {
        toast.error("Failed to fetch Facebook leads");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <DashboardLayout>
      <Profiler id="FacebookLeadTable" onRender={facebookLeadsTableProfiler}>
        <FacebookLeadTable
          leads={leads}
          loading={loading}
          setLeads={setLeads}
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
