import * as React from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppDispatch, AppState, LeadType } from "@/types";
import { AssignLead } from "@/app_components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllUsers } from "@/redux/actions/userActions";
import { claimLead } from "@/redux/actions";
export const NewLeadsTable: React.FC<{
  leads: LeadType[];
  loading?: boolean;
}> = ({ leads, loading }) => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [claimLeadLoading, setClaimLeadLoading] = React.useState(false);

  // fetching users
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = React.useState<any[]>([]);

  const { user } = useSelector((state: AppState) => state);

  React.useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getAllUsers());
    };
    // Fetch users data from the server
    fetchUsers();
  }, [dispatch]);

  React.useEffect(() => {
    if (user.users) {
      setUsers(user.users);
    }
  }, [user.users]);

  React.useEffect(() => {
    if (Array.isArray(leads)) {
      const arranged_leads = leads.map((lead: LeadType) => ({
        ...lead,
        departure: lead.departure?.name || "N/A",
        arrival: lead.arrival?.name || "N/A",
      }));
      setRows(arranged_leads);
    }
  }, [leads]);

  // claim a lead
  const onClaimLead = async (lead: LeadType) => {
    if (claimLeadLoading) {
      return;
    }
    setClaimLeadLoading(true);

    try {
      const claimStatusSuccess = await claimLead(lead);
      console.log("Claim Status", claimStatusSuccess);
      window.location.reload();
    } catch (error) {
      console.error("Failed to claim lead", error);
    } finally {
      setClaimLeadLoading(false);
    }
  };
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("firstName")}</div>
      ),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("lastName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "departure",
      header: "Departure",
      cell: ({ row }) => <div>{row.getValue("departure")}</div>,
    },
    {
      accessorKey: "arrival",
      header: "Arrival",
      cell: ({ row }) => <div>{row.getValue("arrival")}</div>,
    },
    {
      accessorKey: "adult",
      header: "Adult",
      cell: ({ row }) => <div>{row.getValue("adult")}</div>,
    },
    {
      accessorKey: "leadType",
      header: "Lead Type",
      cell: ({ row }) => <div>{row.getValue("leadType")}</div>,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            disabled={claimLeadLoading}
            onClick={() => onClaimLead(row.original)}
          >
            {claimLeadLoading ? `Claiming...` : `Claim Now`}
          </Button>
          <AssignLead users={users} leadId={row.original._id} />
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: loading ? [] : rows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-4 bg-white rounded-lg mt-[60px]">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
