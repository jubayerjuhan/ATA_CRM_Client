import { MyCustomersTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { client } from "@/api/api";
import { AppState } from "@/types";
import moment from "moment";
import React, { Profiler, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";
import toast from "react-hot-toast";

const cancelledCustomersTableProfiler = createTableProfilerCallback(
  "CancelledCustomersTable"
);

export const CancelledCustomers = () => {
  const { auth } = useSelector((state: AppState) => state);
  const { profile } = useSelector((state: AppState) => state.auth);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [customers, setCustomers] = React.useState<any[]>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  useTableRenderTracker("CancelledCustomersTable", {
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
        const { data } = await client.get(`/leads/cancelled-leads/list`, {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
          signal: controller.signal as any,
        });
        setCustomers(data.leads || []);
        setRowCount(data.pagination?.totalCount ?? 0);
      } catch (error: any) {
        if (error?.name !== "CanceledError") {
          toast.error("Failed to fetch lost sales");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
    return () => controller.abort();
  }, [auth.profile?._id, pagination.pageIndex, pagination.pageSize]);

  return (
    <DashboardLayout>
      {profile?.role === "admin" && (
        <div style={{ width: "100%" }}>
          <Button
            onClick={async () => {
              await downloadCSVFromServer();
            }}
            disabled={loading}
          >
            Download In CSV
          </Button>
        </div>
      )}

      <Profiler
        id="CancelledCustomersTable"
        onRender={cancelledCustomersTableProfiler}
      >
        <MyCustomersTable
          title="Lost Sales"
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

const fetchAllPages = async (endpoint: string) => {
  const pageSize = 200;
  let page = 1;
  const allRows: any[] = [];

  while (true) {
    const { data } = await client.get(endpoint, {
      params: { page, limit: pageSize },
    });
    const rows = data.leads || [];
    allRows.push(...rows);
    const pagination = data.pagination;
    if (!pagination?.hasNextPage) break;
    page += 1;
  }

  return allRows;
};

const downloadCSVFromServer = async () => {
  try {
    toast.loading("Preparing CSV...", { id: "csv-lost" });
    const data = await fetchAllPages("/leads/cancelled-leads/list");
    downloadCSV(data);
    toast.success("CSV ready", { id: "csv-lost" });
  } catch (error) {
    toast.error("Failed to prepare CSV", { id: "csv-lost" });
  }
};

const downloadCSV = (data: any[]) => {
  const headers = [
    "Booking ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Lead Status",
    "Followup Date",
    "Profile Creation Date",
    "Departure",
    "Arrival",
    "Airline",
    "Payment Status",
    "Passenger Type",
    "Post Code",
    "Case Date",
    "Call For",
    "Travel Date",
    "Return Date",
    "Adult",
    "Child",
    "Infant",
    "Lead Origin",
    "Claimed By",
    "Quoted Amount",
    "Follow Up Date",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        row.booking_id,
        row.firstName,
        row.lastName,
        row.email,
        row.phone,
        row.status,
        row.follow_up_date
          ? moment(row.follow_up_date).format("DD-MM-YYYY")
          : "n/a",
        moment(row.createdAt).format("DD-MM-YYYY"),
        row.departure?.name,
        row.arrival?.name,
        row.airline?.name,
        row.payment?.status,
        row.passengerType,
        row.postCode,
        moment(row.caseDate).format("DD-MM-YYYY"),
        row.callFor,
        moment(row.travelDate).format("DD-MM-YYYY"),
        moment(row.returnDate).format("DD-MM-YYYY"),
        row.adult,
        row.child,
        row.infant,
        row.leadOrigin,
        row.claimed_by?.name,
        row.quoted_amount?.total,
        row.follow_up_date
          ? moment(row.follow_up_date).format("DD-MM-YYYY")
          : "n/a",
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "sales_lost.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
