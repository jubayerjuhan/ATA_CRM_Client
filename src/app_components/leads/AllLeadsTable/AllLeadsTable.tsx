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

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

interface AllLeadsTableProps {
  customers: any;
  loading: boolean;
}

export const AllLeadsTable: React.FC<AllLeadsTableProps> = ({
  customers,
  loading,
}) => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "customer",
        header: "Customer",
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: "name",
            header: "Name",
            size: 200,
            filterVariant: "autocomplete",
          },
          {
            accessorKey: "status",
            id: "status",
            header: "Lead Status",
            size: 200,
            Cell: ({ cell }) => {
              const status = cell.getValue<string>();
              return status === "Ticket Sent"
                ? "Sale Converted"
                : status === "Itenary Email Sent"
                ? "Payment Link Sent"
                : status;
            },
          },
          {
            accessorKey: "email",
            header: "Email",
            size: 250,
            enableClickToCopy: true,
          },
          {
            accessorKey: "phone",
            header: "Phone",
            size: 150,
          },
        ],
      },

      {
        id: "travelInfo",
        header: "Travel Information",
        columns: [
          {
            accessorKey: "departure.name",
            header: "Departure",
            size: 200,
          },
          {
            accessorKey: "arrival.name",
            header: "Arrival",
            size: 200,
          },
          {
            accessorKey: "travelDate",
            header: "Travel Date",
            size: 150,
            Cell: ({ cell }) => {
              const date = cell.getValue<string>();
              return date ? new Date(date).toLocaleDateString() : "N/A";
            },
          },
          {
            accessorKey: "returnDate",
            header: "Return Date",
            size: 150,
            Cell: ({ cell }) => {
              const date = cell.getValue<string>();
              return date ? new Date(date).toLocaleDateString() : "N/A";
            },
          },
          {
            accessorKey: "airline.name",
            header: "Airlines Name",
            size: 120,
            Cell: ({ cell }) => {
              const airline = cell.getValue<string>();
              return airline
                ? `${airline} (${cell.row.original.airline?.iata})`
                : "N/A";
            },
          },
          // {
          //   accessorKey: "pnr",
          //   header: "PNR",
          //   size: 100,
          // },
        ],
      },
      {
        id: "bookingDetails",
        header: "Booking Details",
        columns: [
          {
            accessorKey: "callFor",
            header: "Call For",
            size: 120,
          },
          {
            accessorKey: "leadType",
            header: "Lead Type",
            size: 120,
          },

          {
            accessorKey: "quotedAmount",
            header: "Quoted Amount",
            size: 150,
            Cell: ({ cell }) =>
              `${
                cell.getValue<string>() ? `$${cell.getValue<string>()}` : "N/A"
              }`,
          },
          {
            accessorKey: "payment.status",
            header: "Payment Status",
            size: 150,
          },
        ],
      },
      {
        id: "passengerInfo",
        header: "Passenger Information",
        columns: [
          {
            accessorKey: "passengerType",
            header: "Passenger Type",
            size: 150,
          },
          {
            accessorKey: "adult",
            header: "Adults",
            size: 100,
          },
          {
            accessorKey: "child",
            header: "Children",
            size: 100,
          },
          {
            accessorKey: "infant",
            header: "Infants",
            size: 100,
          },
        ],
      },
      {
        accessorFn: (row) => {
          //convert to Date for sorting and filtering
          const sDay = new Date(row.createdAt);
          sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
          return sDay;
        },
        id: "createdAt",
        header: "Case Date",
        filterVariant: "date-range",
        sortingFn: "datetime",
        enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date ? date.toLocaleDateString() : "N/A";
        }, //render Date as a string
        Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
      },
      {
        accessorKey: "claimed_by.name",
        header: "Claimed By",
        size: 150,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: customers ? customers : [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
      placeholder: "Search Leads",
    },
    renderDetailPanel: ({ row }) => {
      const customerData = row.original;
      console.log(customerData, "customerData...");
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
          }}
        >
          <Box>
            <Button
              style={{
                backgroundColor: "white",
                color: "#1C7ED6",
                border: "1px solid #1C7ED6",
              }}
              leftIcon={<FaRegUser size={16} />}
              onClick={() => {
                window.open(`/dashboard/lead/${customerData?._id}`);
                console.log(
                  `Open WhatsApp chat for ${customerData.firstName} ${customerData.lastName}`
                );
              }}
            >
              See Customer Details
            </Button>
          </Box>
          <Box>
            <Button
              leftIcon={<IconBrandWhatsapp size={18} />}
              onClick={() => {
                window.open(`https://wa.me/${customerData.phone}`);
                console.log(
                  `Open WhatsApp chat for ${customerData.firstName} ${customerData.lastName}`
                );
              }}
            >
              WhatsApp
            </Button>
          </Box>
          <Box>
            <Title order={4}>Latest Note</Title>
            <Text>
              <ul>
                {customerData.call_logs && customerData.call_logs.length > 0
                  ? (() => {
                      const latestLog =
                        customerData.call_logs[
                          customerData.call_logs.length - 1
                        ];
                      const parsedDate = moment(latestLog?.dateTime).format(
                        "DD-MM-YYYY hh:mm a"
                      );
                      return (
                        <li key={latestLog.dateTime}>
                          <div>
                            <p>{parsedDate}</p>
                            <p>
                              Added By:{" "}
                              {latestLog.added_by?.name
                                ? latestLog.added_by.name
                                : "N/A"}
                            </p>
                            <p>
                              {latestLog.notes
                                ? latestLog.notes
                                : "No Notes Available"}
                            </p>
                          </div>
                        </li>
                      );
                    })()
                  : "No Notes Available."}
              </ul>
            </Text>
          </Box>
        </Box>
      );
    },
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
        <Title order={3} className="text-[#F16861]">
          All Leads
        </Title>
      </Box>
      <MantineReactTable table={table} />
    </div>
  );
};
