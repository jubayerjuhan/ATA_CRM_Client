import { client } from "@/api/api";
import { FollowupTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { LeadType } from "@/types";
import React, { Profiler, useEffect } from "react";
import toast from "react-hot-toast";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";

const totalFollowupsTableProfiler = createTableProfilerCallback(
  "TotalFollowupsTable"
);

export const TotalFollowups = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [followUps, setFollowUps] = React.useState<LeadType[]>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  useTableRenderTracker("TotalFollowupsTable", {
    rows: followUps.length,
    loading,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  useEffect(() => {
    const fetchTotalFollowups = async () => {
      setLoading(true);
      try {
        const { data } = await client.get(`/followups`, {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
        });
        setFollowUps(data.totalFollowups || []);
        setRowCount(data.pagination?.totalCount ?? 0);
      } catch (error) {
        toast.error("Failed to fetch total followups");
      } finally {
        setLoading(false);
      }
    };
    fetchTotalFollowups();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <DashboardLayout>
      <Profiler id="TotalFollowupsTable" onRender={totalFollowupsTableProfiler}>
        <FollowupTable
          title="Total Follow Up's"
          customers={followUps}
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
