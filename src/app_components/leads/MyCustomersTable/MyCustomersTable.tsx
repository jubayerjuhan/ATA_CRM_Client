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

type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

interface MyCustomersTableProps {
  customers: any;
  loading: boolean;
}

export const MyCustomersTable: React.FC<MyCustomersTableProps> = ({
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
            Cell: ({ cell }) =>
              new Date(cell.getValue<string>()).toLocaleDateString(),
          },
          {
            accessorKey: "returnDate",
            header: "Return Date",
            size: 150,
            Cell: ({ cell }) =>
              new Date(cell.getValue<string>()).toLocaleDateString(),
          },
          {
            accessorKey: "airlinesCode",
            header: "Airlines Code",
            size: 120,
          },
          {
            accessorKey: "pnr",
            header: "PNR",
            size: 100,
          },
          {
            accessorKey: "pnr",
            header: "PNR",
            size: 100,
          },
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
            accessorKey: "status",
            header: "Status",
            size: 150,
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
        header: "Case  Date",
        filterVariant: "date-range",
        sortingFn: "datetime",
        enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
        Cell: ({ cell }) => {
          return cell.getValue<Date>()?.toLocaleDateString();
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
      placeholder: "Search Employees",
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
            <Title order={4}>Call Logs</Title>
            <Text>
              <ul>
                {customerData.call_logs
                  ? customerData.call_logs.map((log: any) => {
                      console.log(log.dateTime, log.notes);
                      const parsedDate = moment(Number(log.dateTime)).format(
                        "DD-MM-YYYY hh:mm a"
                      );
                      return (
                        <li key={log.dateTime}>
                          <div>
                            <strong>{log.callType}</strong>

                            <p>{parsedDate}</p>
                            <p>
                              {log.notes ? log.notes : "No Notes Available"}
                            </p>
                          </div>
                        </li>
                      );
                    })
                  : "No call logs available."}
              </ul>
            </Text>
          </Box>
        </Box>
      );
    },
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
    // renderTopToolbar: ({ table }) => {
    //   const handleDeactivate = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert("deactivating " + row.getValue("name"));
    //     });
    //   };

    //   const handleActivate = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert("activating " + row.getValue("name"));
    //     });
    //   };

    //   const handleContact = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert("contact " + row.getValue("name"));
    //     });
    //   };

    //   if (loading) {
    //     return <p>Loading...</p>;
    //   }

    //   return (
    //     <div>
    //       <Flex p="md" justify="space-between">
    //         <Flex gap="xs">
    //           {/* import MRT sub-components */}
    //           <MRT_GlobalFilterTextInput table={table} />
    //           <MRT_ToggleFiltersButton table={table} />
    //         </Flex>
    //         <Flex sx={{ gap: "8px" }}>
    //           <Button
    //             color="red"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleDeactivate}
    //             variant="filled"
    //           >
    //             Deactivate
    //           </Button>
    //           <Button
    //             color="green"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleActivate}
    //             variant="filled"
    //           >
    //             Activate
    //           </Button>
    //           <Button
    //             color="blue"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleContact}
    //             variant="filled"
    //           >
    //             Contact
    //           </Button>
    //         </Flex>
    //       </Flex>
    //     </div>
    //   );
    // },
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
        <Title order={3}>My Customers</Title>
      </Box>
      <MantineReactTable table={table} />
    </div>
  );
};
