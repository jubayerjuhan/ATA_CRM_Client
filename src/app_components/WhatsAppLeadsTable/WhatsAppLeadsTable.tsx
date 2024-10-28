import React, { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Box, Menu, Title } from "@mantine/core";
import { IconUserCircle, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface WhatsAppLeadsProps {
  leads: any;
  loading: boolean;
}

export const WhatsAppLeadsTable: React.FC<WhatsAppLeadsProps> = ({
  leads,
  loading,
}) => {
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "WhatsAppLeads",
        header: "Lead",
        columns: [
          {
            accessorFn: (row) => `${row.name}`,
            id: "name",
            header: "Name",
            size: 200,
            filterVariant: "autocomplete",
          },
          {
            accessorKey: "phone",
            id: "phone",
            header: "Phone",
            size: 200,
          },
          {
            accessorKey: "description",
            header: "Description",
            size: 250,
          },
          // add a button to view the lead details
          {
            id: "actions",
            header: "Actions",
            size: 100,
            Cell: ({ row }: any) => (
              <Button
                onClick={() =>
                  (window.location.href = `/whatsapp-lead/${row.original._id}`)
                }
              >
                <IconUserCircle size={20} /> View Profile
              </Button>
            ),
          },
        ],
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: leads ? leads : [],
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enablePinning: true,
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
        <Title order={3} className="text-white">
          WhatsApp Leads
        </Title>
      </Box>
      <MantineReactTable table={table} />
    </div>
  );
};
