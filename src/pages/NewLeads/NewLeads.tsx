import React, { Profiler, useCallback, useEffect } from "react";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { LeadType, PaginationInfo } from "@/types";
import { NewLeadsTable } from "@/app_components";
import { client } from "@/api/api";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";
import toast from "react-hot-toast";

const newLeadsTableProfiler = createTableProfilerCallback("NewLeadsTable");

export const NewLeads = () => {
  const [unclaimedLeads, setUnclaimedLeads] = React.useState<LeadType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 50,
  });
  useTableRenderTracker("NewLeadsTable", {
    rows: unclaimedLeads.length,
    loading,
    page: pagination.currentPage,
    pageSize: pagination.limit,
  });

  const fetchUnclaimedLeads = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);
    try {
      const response = await client.get("/leads/unclaimed", {
        params: { page: pagination.currentPage, limit: pagination.limit },
        signal: controller.signal as any,
      });
      setUnclaimedLeads(response.data.leads || []);
      setPagination((prev) => response.data.pagination || prev);
    } catch (error) {
      toast.error("Failed to fetch unclaimed leads");
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  }, [pagination.currentPage, pagination.limit]);

  useEffect(() => {
    fetchUnclaimedLeads();
  }, [fetchUnclaimedLeads]);

  return (
    <DashboardLayout>
      <Profiler id="NewLeadsTable" onRender={newLeadsTableProfiler}>
        <NewLeadsTable
          leads={unclaimedLeads}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) =>
            setPagination((prev) => ({ ...prev, currentPage: page }))
          }
        />
      </Profiler>
    </DashboardLayout>
  );
};
