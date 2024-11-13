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
import { client } from "@/api/api";
import toast from "react-hot-toast";
import { AppState } from "@/types";
import { useSelector } from "react-redux";

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

interface FollowupTableProps {
  customers: any;
  loading: boolean;
  title?: string;
}

export const FollowupTable: React.FC<FollowupTableProps> = ({
  customers,
  loading,
  title,
}) => {
  const { profile } = useSelector((state: AppState) => state.auth);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "customer",
        header: "Customer",
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            Cell: ({ cell }) => (
              <a
                href={`/dashboard/lead/${cell.row.original._id}`}
                style={{ textDecoration: "none" }}
              >
                {cell.getValue<string>()}
              </a>
            ),
            id: "name",
            header: "Name",
            size: 200,
            filterVariant: "autocomplete",
          },
          {
            accessorFn: (row) => {
              const followUpDate = moment(row.follow_up_date);
              const now = moment();
              return followUpDate.isBefore(now) ? "Behind" : "On Time";
            },
            id: "status_indicator",
            header: "Status",
            size: 150,
            Cell: ({ cell }) => {
              const status = cell.getValue<string>();
              return (
                <span style={{ color: status === "Behind" ? "red" : "green" }}>
                  {status}
                </span>
              );
            },
          },
          {
            accessorFn: (row) => {
              const followUpDate = new Date(row.follow_up_date);
              followUpDate.setHours(0, 0, 0, 0); // remove time from date
              return followUpDate;
            },
            id: "follow_up_date",
            header: "Follow Up Date",
            filterVariant: "date-range",
            sortingFn: "datetime",
            enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
            Cell: ({ cell }) => {
              return (
                <p style={{ textDecoration: "none" }}>
                  {moment(cell.row.original.follow_up_date).format(
                    "DD-MM-YYYY hh:mm a"
                  )}
                </p>
              );
            },
            size: 200,
          },
          {
            accessorKey: "status",
            id: "status",
            header: "Lead Status",
            size: 200,
            Cell: ({ cell }) => {
              const status = cell.getValue<string>();
              return status === "Ticket Sent" ? "Sale Converted" : status;
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
            accessorKey: "airline.name",
            header: "Airlines Name",
            size: 120,
            Cell: ({ cell }) => {
              console.log(cell.row.original.airline?.iata, "cell");
              const airline = cell.getValue<string>();
              return airline
                ? `${airline} (${cell.row.original.airline?.iata})`
                : "N/A";
            },
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
            accessorKey: "quotedAmount",
            header: "Quoted Amount",
            size: 150,
            Cell: ({ cell }) =>
              `${
                cell.row.original.quoted_amount.total
                  ? `$${cell.row.original.quoted_amount.total}`
                  : "N/A"
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
        accessorKey: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ cell }) => {
          const handleDelete = async () => {
            const rowId = cell.row.original._id;
            const confirmed = window.confirm(
              "Are you sure you want to delete this follow-up?"
            );
            if (!confirmed) return;

            try {
              await client.delete(`/followups/${rowId}`);
              toast.success("Followup Deleted Successfully");
              window.location.reload();
            } catch (error) {
              console.log(error);
              toast.error("Followup failed to delete.");
            }
          };

          return (
            <Button color="red" onClick={handleDelete}>
              Resolve Followup
            </Button>
          );
        },
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
        <Title order={3} className="text-[#F16861]">
          {title ? title : "My Leads"}
        </Title>
      </Box>
      <MantineReactTable table={table} />
    </div>
  );
};
