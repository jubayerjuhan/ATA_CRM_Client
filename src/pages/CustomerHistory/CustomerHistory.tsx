import { client } from "@/api/api";
import { CustomerHistoryTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { AppDispatch, AppState, LeadType } from "@/types";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export const CustomerHistory: React.FC = () => {
  const { profile } = useSelector((state: AppState) => state.auth);
  const { auth } = useSelector((state: AppState) => state);
  const [customers, setCustomers] = useState<
    { firstLead: LeadType; latestLead: LeadType; totalLeads: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 25,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("firstLead.createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const dispatch = useDispatch<AppDispatch>();

  const fetchCustomerHistory = useCallback(async (
    page: number = 1,
    limit: number = 25,
    search: string = "",
    sortField: string = "firstLead.createdAt",
    sortDirection: "asc" | "desc" = "desc"
  ) => {
    setLoading(true);
    const url = `/customers/unique-customers-paginated`;
    try {
      const { data } = await client.get(url, {
        params: {
          page,
          limit,
          search,
          sortBy: sortField,
          sortOrder: sortDirection,
        },
      });
      setCustomers(data.customers);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomerHistory(pagination.currentPage, pagination.limit, searchTerm, sortBy, sortOrder);
  }, [fetchCustomerHistory, pagination.currentPage, pagination.limit, searchTerm, sortBy, sortOrder]);

  const handleDownloadCSV = async () => {
    if (profile?.role !== "admin") return;

    setLoading(true);
    try {
      // For large datasets, we'll fetch all data for CSV export
      const { data } = await client.get(`/customers/unique-customers-paginated`, {
        params: {
          page: 1,
          limit: pagination.totalCount, // Get all records
          search: searchTerm,
          sortBy,
          sortOrder,
        },
      });
      downloadCSV(data.customers);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination(prev => ({
      ...prev,
      limit: pageSize,
      currentPage: 1 // Reset to first page when changing page size
    }));
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page when searching
  };

  const handleSort = (field: string, order: "asc" | "desc") => {
    setSortBy(field);
    setSortOrder(order);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page when sorting
  };

  return (
    <DashboardLayout>
      {profile?.role === "admin" && (
        <div className="mb-4">
          <Button onClick={handleDownloadCSV} disabled={loading}>
            {loading ? "Preparing CSV..." : "Download as CSV"}
          </Button>
        </div>
      )}
      <CustomerHistoryTable
        customers={customers}
        loading={loading}
        title="Customer's Log"
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearch={handleSearch}
        onSort={handleSort}
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </DashboardLayout>
  );
};

const downloadCSV = (data: any[]) => {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Profile Creation Date",
    "First Departure",
    "First Destination",
    "Total Inquiries",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        `${row.latestLead.firstName} ${row.latestLead.lastName}`,
        row.latestLead.email,
        row.latestLead.phone,
        moment(row.firstLead.createdAt).format("DD-MM-YYYY"),
        row.firstLead.departure?.city,
        row.firstLead.arrival?.city,
        row.totalLeads,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "customer_history.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default CustomerHistory;
