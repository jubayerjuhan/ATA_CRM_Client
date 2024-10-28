import React, { useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import {
  Box,
  Menu,
  Title,
  Modal,
  Button as MantineButton,
} from "@mantine/core";
import { IconUserCircle, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { client } from "@/api/api";
import toast from "react-hot-toast";

interface WhatsAppLeadsProps {
  leads: any;
  loading: boolean;
  setLeads: React.Dispatch<any>;
}

export const FacebookLeadTable: React.FC<WhatsAppLeadsProps> = ({
  leads,
  loading,
  setLeads,
}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  const handleDeleteFacebookLead = (id: string) => {
    setLeadToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (leadToDelete) {
      try {
        await client.delete(`/facebook-leads/${leadToDelete}`);
        toast.success("Lead deleted successfully");
        setLeads((prevLeads: any) =>
          prevLeads.filter((lead: any) => lead._id !== leadToDelete)
        );
      } catch (error) {
        toast.error("Failed to delete lead");
      } finally {
        setModalOpen(false);
        setLeadToDelete(null);
      }
    }
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "facebookLeads",
        header: "Lead",
        columns: [
          {
            accessorFn: (row) => `${row.firstName}`,
            id: "firstName",
            header: "First Name",
            size: 200,
            filterVariant: "autocomplete",
          },
          {
            accessorFn: (row) => `${row.lastName}`,
            id: "lastName",
            header: "Last Name",
            size: 200,
            filterVariant: "autocomplete",
          },
          {
            accessorKey: "email",
            id: "email",
            header: "Email",
            size: 200,
          },
          {
            accessorKey: "phone",
            id: "phone",
            header: "Phone",
            size: 200,
          },
          // add buttons to view and delete the lead details
          {
            id: "actions",
            header: "Actions",
            size: 200,
            Cell: ({ row }: any) => (
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  onClick={() =>
                    navigate(`/form`, {
                      state: { leadData: row.original },
                    })
                  }
                >
                  <IconUserCircle size={20} /> Add This Lead
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => handleDeleteFacebookLead(row.original._id)}
                >
                  Added This Lead
                </Button>
              </div>
            ),
          },
        ],
      },
    ],
    [navigate]
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
          Facebook Leads
        </Title>
      </Box>
      <MantineReactTable table={table} />
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Deletion"
      >
        <div>Are you sure you want to delete this lead?</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <MantineButton variant="outline" onClick={() => setModalOpen(false)}>
            No
          </MantineButton>
          <MantineButton
            color="red"
            onClick={confirmDelete}
            style={{ marginLeft: "10px" }}
          >
            Yes
          </MantineButton>
        </div>
      </Modal>
    </div>
  );
};
