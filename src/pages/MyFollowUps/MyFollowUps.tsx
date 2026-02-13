import { FollowupTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { client } from "@/api/api";
import { AppState } from "@/types";
import React, { Profiler, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";
import toast from "react-hot-toast";

const myFollowupsTableProfiler = createTableProfilerCallback("MyFollowupsTable");

export const MyFollowUps = () => {
  const { auth } = useSelector((state: AppState) => state);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [followUps, setFollowUps] = React.useState<any[]>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  useTableRenderTracker("MyFollowupsTable", {
    rows: followUps.length,
    loading,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  useEffect(() => {
    const fetchMyFollowUps = async () => {
      setLoading(true);
      try {
        const { data } = await client.get(`/followups/my-follow-ups`, {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
        });
        setFollowUps(data.followups || []);
        setRowCount(data.pagination?.totalCount ?? 0);
      } catch (error) {
        toast.error("Failed to fetch my followups");
      } finally {
        setLoading(false);
      }
    };
    fetchMyFollowUps();
  }, [auth.profile?._id, pagination.pageIndex, pagination.pageSize]);

  return (
    <DashboardLayout>
      <Profiler id="MyFollowupsTable" onRender={myFollowupsTableProfiler}>
        <FollowupTable
          title="My Follow Up's"
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
