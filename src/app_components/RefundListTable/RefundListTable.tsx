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
      placeholder: "Search Employees",
    },
    // renderDetailPanel: ({ row }) => {
    //   const customerData = row.original;
    //   console.log(customerData, "customerData...");
    //   return (
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "flex-start",
    //         alignItems: "center",
    //         gap: "16px",
    //         padding: "16px",
    //       }}
    //     >
    //       <Box>
    //         <Button
    //           style={{
    //             backgroundColor: "white",
    //             color: "#1C7ED6",
    //             border: "1px solid #1C7ED6",
    //           }}
    //           leftIcon={<FaRegUser size={16} />}
    //           onClick={() => {
    //             window.open(`/dashboard/lead/${customerData?._id}`);
    //             console.log(
    //               `Open WhatsApp chat for ${customerData.firstName} ${customerData.lastName}`
    //             );
    //           }}
    //         >
    //           See Customer Details
    //         </Button>
    //       </Box>
    //       <Box>
    //         <Button
    //           leftIcon={<IconBrandWhatsapp size={18} />}
    //           onClick={() => {
    //             window.open(`https://wa.me/${customerData.phone}`);
    //             console.log(
    //               `Open WhatsApp chat for ${customerData.firstName} ${customerData.lastName}`
    //             );
    //           }}
    //         >
    //           WhatsApp
    //         </Button>
    //       </Box>
    //       <Box>
    //         <Title order={4}>Call Logs</Title>
    //         <Text>
    //           <ul>
    //             {customerData.call_logs
    //               ? customerData.call_logs.map((log: any) => {
    //                   console.log(
    //                     typeof log.dateTime,
    //                     log.dateTime,
    //                     log.notes,
    //                     "notes..."
    //                   );
    //                   const parsedDate = moment(Number(log.dateTime)).format(
    //                     "DD-MM-YYYY hh:mm a"
    //                   );
    //                   return (
    //                     <li key={log.dateTime}>
    //                       <div>
    //                         <strong>{log.callType}</strong>

    //                         <p>{parsedDate}</p>
    //                         <p>
    //                           {log.notes ? log.notes : "No Notes Available"}
    //                         </p>
    //                       </div>
    //                     </li>
    //                   );
    //                 })
    //               : "No call logs available."}
    //           </ul>
    //         </Text>
    //       </Box>
    //     </Box>
    //   );
    // },
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
