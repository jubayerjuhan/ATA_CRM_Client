import React, { useMemo, useEffect, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Box, Menu, Text, Title, Select, TextInput, Group, Pagination } from "@mantine/core";
import {
  IconUserCircle,
  IconSend,
  IconBrandWhatsapp,
  IconSearch,
} from "@tabler/icons-react";
import { FaRegUser } from "react-icons/fa";
import { useDebouncedValue } from "@mantine/hooks";

import moment from "moment";
import { LeadType } from "@/types";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface MyCustomersTableProps {
  customers: {
    firstLead: LeadType;
    latestLead: LeadType;
    totalLeads: number;
  }[];
  loading: boolean;
  title?: string;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearch: (search: string) => void;
  onSort: (field: string, order: "asc" | "desc") => void;
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export const CustomerHistoryTable: React.FC<MyCustomersTableProps> = ({
  customers,
  loading,
  title,
  pagination,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onSort,
  searchTerm,
  sortBy,
  sortOrder,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localPageInput, setLocalPageInput] = useState(pagination.currentPage.toString());
  const [debouncedSearchTerm] = useDebouncedValue(localSearchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchTerm, onSearch]);

  useEffect(() => {
    setLocalPageInput(pagination.currentPage.toString());
  }, [pagination.currentPage]);

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(localPageInput);
    if (pageNumber && pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      onPageChange(pageNumber);
    } else {
      // Reset to current page if invalid input
      setLocalPageInput(pagination.currentPage.toString());
    }
  };
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) =>
          `${row.latestLead.firstName} ${row.latestLead.lastName}`,
        id: "name",
        header: "Name",
        size: 200,
        Cell: ({ cell }) => (
          <p style={{ textDecoration: "none" }}>{cell.getValue<string>()}</p>
        ),
      },

      {
        id: "email",
        accessorFn: (row) => `${row.latestLead.email} `,
        header: "Email",
        size: 250,
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <Text size="sm" style={{ textDecoration: "none" }}>
            {cell.getValue<string>()}
          </Text>
        ),
      },
      {
        accessorFn: (row) => `${row.latestLead.phone} `,
        header: "Phone",
        size: 150,
      },
      {
        accessorFn: (row) =>
          moment(row.firstLead.createdAt).local().format("DD-MM-YYYY"),
        id: "profileCreationDate",
        header: "Profile Creation Date",
        size: 200,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },
      {
        accessorFn: (row) => `${row.firstLead.departure?.city}`,
        id: "firstDeparture",
        header: "First Departure",
        size: 200,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },
      {
        accessorFn: (row) => `${row.firstLead.arrival?.city}`,
        id: "firstDestination",
        header: "First Destination",
        size: 200,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },
      {
        accessorFn: (row) => `${row.totalLeads}`,
        id: "totalLeads",
        header: "Total Inquiries",
        size: 200,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },

      {
        accessorFn: (row) => row.latestLead.id,
        id: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ cell }) => (
          <Button
            style={{ color: "#f26863", border: "1px solid #f26863" }}
            variant="outline"
            onClick={() => {
              const email = cell.row.original.latestLead.email;
              const name = `${cell.row.original.latestLead.firstName} ${cell.row.original.latestLead.lastName}`;
              window.location.href = `/lead-search?email=${encodeURIComponent(
                email
              )}&name=${encodeURIComponent(name)}`;
            }}
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: customers ? customers : [],
    enableColumnFilterModes: false,
    enableColumnOrdering: true,
    enableFacetedValues: false,
    enableGrouping: false,
    enablePinning: true,
    enablePagination: false, // Disable client-side pagination
    enableGlobalFilter: false, // Disable client-side search
    enableColumnFilters: false, // Disable client-side column filters
    enableSorting: false, // We'll handle sorting server-side
    positionToolbarAlertBanner: "bottom",
    enableRowActions: false,
    enableRowSelection: false,
    mantineTableProps: {
      withBorder: true,
      withColumnBorders: false,
      striped: true,
    },
  });

  if (loading) {
    return (
      <LoadingSpinner
        message="Loading customer data..."
        size="lg"
      />
    );
  }

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <Box sx={{ padding: "16px 0px", color: "#F16861" }}>
        <Title order={3} className="text-[#F16861]">
          {title ? title : "Customer History"}
        </Title>
      </Box>

      {/* Search and Controls */}
      <Box sx={{ padding: "16px 0px", marginBottom: "16px" }}>
        <Group position="apart" align="end">
          <TextInput
            placeholder="Search customers by name or email..."
            value={localSearchTerm}
            onChange={(event) => setLocalSearchTerm(event.currentTarget.value)}
            icon={<IconSearch size={16} />}
            style={{ width: "300px" }}
            disabled={loading}
          />
          <Group>
            <Text size="sm">Page size:</Text>
            <Select
              value={pagination.limit.toString()}
              onChange={(value) => onPageSizeChange(parseInt(value || "100"))}
              data={[
                { value: "25", label: "25" },
                { value: "50", label: "50" },
                { value: "100", label: "100" },
                { value: "200", label: "200" },
              ]}
              style={{ width: "80px" }}
              disabled={loading}
            />
          </Group>
        </Group>
      </Box>

      {/* Table with Loading Overlay */}
      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {loading && (
          <>
            {/* Backdrop */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                zIndex: 9,
                backdropFilter: "blur(2px)",
              }}
            />
            {/* Centered Spinner */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                zIndex: 10,
                borderRadius: "16px",
                padding: "2rem 3rem",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                border: "1px solid rgba(241, 104, 97, 0.1)",
              }}
            >
              <LoadingSpinner
                message="Fetching data..."
                size="md"
              />
            </Box>
          </>
        )}
        {customers.length === 0 && !loading ? (
          <Box
            sx={{
              textAlign: "center",
              padding: "3rem 1rem",
              color: "#666",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "1rem" }}>📊</div>
            <Title order={3} color="dimmed" style={{ marginBottom: "0.5rem" }}>
              No customers found
            </Title>
            <Text color="dimmed">
              {searchTerm ? "Try adjusting your search criteria" : "No customer data available"}
            </Text>
          </Box>
        ) : (
          <MantineReactTable table={table} />
        )}
      </Box>

      {/* Pagination Controls */}
      <Box sx={{ padding: "16px 0px" }}>
        <Group position="apart" align="center">
          <Text size="sm" color="dimmed">
            Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of{" "}
            {pagination.totalCount} customers
          </Text>
          <Group align="center" spacing="md">
            <Pagination
              value={pagination.currentPage}
              onChange={onPageChange}
              total={pagination.totalPages}
              size="sm"
              withEdges
              disabled={loading}
            />
            <Group align="center" spacing="xs">
              <Text size="sm">Go to:</Text>
              <TextInput
                placeholder="Page"
                size="xs"
                style={{ width: "70px" }}
                value={localPageInput}
                onChange={(event) => setLocalPageInput(event.currentTarget.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handlePageInputSubmit();
                  }
                }}
                onBlur={handlePageInputSubmit}
                disabled={loading}
              />
              <Text size="sm" color="dimmed">
                of {pagination.totalPages}
              </Text>
            </Group>
          </Group>
        </Group>
      </Box>
    </div>
  );
};
