import { client } from "@/api/api";
import { RefundListTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import React, { Profiler } from "react";
import toast from "react-hot-toast";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";

const refundListTableProfiler = createTableProfilerCallback("RefundListTable");

const RefundList = () => {
  const [refunds, setRefunds] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  useTableRenderTracker("RefundListTable", {
    rows: refunds.length,
    loading,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  React.useEffect(() => {
    const fetchRefunds = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/refund", {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
        });
        setRefunds(data.refunds || []);
        setRowCount(data.pagination?.totalCount ?? 0);
      } catch (error) {
        toast.error("Failed to fetch refunds");
      } finally {
        setLoading(false);
      }
    };
    fetchRefunds();
  }, [pagination.pageIndex, pagination.pageSize]);
  return (
    <DashboardLayout>
      <Profiler id="RefundListTable" onRender={refundListTableProfiler}>
        <RefundListTable
          refunds={refunds}
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

export default RefundList;
