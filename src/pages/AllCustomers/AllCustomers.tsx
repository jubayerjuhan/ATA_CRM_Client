import { Profiler, useEffect } from "react";
import { useState } from "react";

import { DashboardLayout } from "@/app_components/DashboardLayout";

import { client } from "@/api/api";
import { AppState } from "@/types";
import { AllCustomersTable } from "@/app_components";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const allCustomersProfiler = createTableProfilerCallback("AllCustomersTable");

export const AllCustomers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });
  useTableRenderTracker("AllCustomersTable", {
    rows: customers.length,
    loading,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchPage = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/customers", {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
          signal: controller.signal as any,
        });
        setCustomers(data.customers || []);
        setRowCount(data.pagination?.totalCount ?? 0);
      } catch (error: any) {
        if (error?.name !== "CanceledError") {
          toast.error("Failed to fetch customers");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
    return () => controller.abort();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <DashboardLayout>
      <Profiler id="AllCustomersTable" onRender={allCustomersProfiler}>
        <AllCustomersTable
          customers={customers}
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
