import React, { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Box, Menu, Title } from "@mantine/core";
import { IconUserCircle, IconSend } from "@tabler/icons-react";
import moment from "moment";

interface AllCustomersProps {
  refunds: any;
  loading: boolean;
}

export const RefundListTable: React.FC<AllCustomersProps> = ({
  refunds,
  loading,
}) => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "Refunds",
        header: "Customer",
        columns: [
          {
            accessorFn: (row) => `${row.surname} ${row.firstName}`,
            id: "name",
            header: "Name",
            size: 200,
            filterVariant: "autocomplete",
          },
          {
            accessorKey: "mobileNumber",
            id: "mobileNumber",
            header: "Mobile Number",
            size: 200,
          },
          {
            accessorKey: "email",
            header: "Email",
            size: 250,
            enableClickToCopy: true,
          },
          {
            accessorKey: "airline",
            header: "Airline",
            size: 150,
          },
          {
            accessorKey: "ticketNumber",
            header: "Ticket Number",
            size: 150,
          },
          {
            accessorKey: "pnrNumber",
            header: "PNR Number",
            size: 150,
          },
          {
            accessorFn(originalRow) {
              return `${moment(originalRow.dateOfTravel).format("DD-MM-YYYY")}`;
            },
            header: "Date Of Travel",
            size: 150,
          },
          {
            accessorKey: "route",
            header: "Route",
            size: 150,
          },
          {
            accessorKey: "modeOfPayment",
            header: "Payment Method",
            size: 150,
          },
          {
            accessorKey: "accountName",
            header: "Account Name",
            size: 150,
          },
          {
            accessorKey: "bankName",
            header: "Bank Name",
            size: 150,
          },
          {
            accessorKey: "bsb",
            header: "BSB",
            size: 150,
          },
          {
            accessorKey: "accountNumber",
            header: "Account Number",
            size: 150,
          },
        ],
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: refunds ? refunds : [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enablePinning: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    mantinePaginationProps: {
      radius: "xl",
      size: "lg",
    },
    mantineSearchTextInputProps: {
      placeholder: "Search Refunds",
    },
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
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
      <Box sx={{ padding: "16px 0px", color: "#3960be" }}>
        <Title order={3}>Refund Requests</Title>
      </Box>
      <MantineReactTable table={table} />
    </div>
  );
};
