import React, { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Box, Button, Menu, Text, Title } from "@mantine/core";
import {
  IconUserCircle,
  IconSend,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { FaRegUser } from "react-icons/fa";

import moment from "moment";
import { LeadType } from "@/types";

// type Employee = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   jobTitle: string;
//   salary: number;
//   startDate: string;
//   signatureCatchPhrase: string;
//   avatar: string;
// };

interface MyCustomersTableProps {
  customers: {
    firstLead: LeadType;
    latestLead: LeadType;
    totalLeads: number;
  }[];
  loading: boolean;
  title?: string;
}

export const CustomerHistoryTable: React.FC<MyCustomersTableProps> = ({
  customers,
  loading,
  title,
}) => {
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
          moment(row.firstLead.createdAt).format("DD-MM-YYYY"),
        id: "profileCreationDate",
        header: "Profile Creation Date",
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
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enablePinning: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    mantinePaginationProps: {
      radius: "xl",
      size: "lg",
    },
    mantineSearchTextInputProps: {
      placeholder: "Search Customers",
    },
    enableRowActions: false,
    enableRowSelection: false,
  });

  if (loading) {
    return (
      <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
        <Title order={3}>Loading...</Title>
      </div>
    );
  }
  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ padding: "16px 0px", color: "#F16861" }}>
        <Title order={3} className="text-[#F16861]">
          {title ? title : "Customer History"}
        </Title>
      </Box>
      <MantineReactTable table={table} />
    </div>
  );
};
