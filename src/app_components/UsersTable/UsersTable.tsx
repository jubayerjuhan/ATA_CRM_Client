import React, { memo, useMemo } from "react";
import moment from "moment";
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
import { UserType } from "@/types";
import { client } from "@/api/api";
import toast from "react-hot-toast";

let changedUserRole: string | null = null;

const handleDelete = async (userId: string) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      await client.delete(`/user/${userId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
};

const handleRoleChange = async (userId: string) => {
  if (!changedUserRole) return toast.error("Please select a role to change.");

  if (
    window.confirm(
      `Are you sure you want to change the role to ${changedUserRole}?`
    )
  ) {
    try {
      await client.put(`/user/${userId}`, { role: changedUserRole });
      console.log("Role changed successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
};

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "leadsInProgress",
    header: "Leads In Progress",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("leadsInProgress")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => (
      <div className="capitalize">
        {moment(row.getValue("createdAt")).format("DD-MM-YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated On",
    cell: ({ row }) => (
      <div className="capitalize">
        {moment(row.getValue("updatedAt")).format("DD-MM-YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "editRole",
    header: "Edit Role",
    cell: ({ row }) => (
      <div className="flex items-center">
        <select
          aria-label="Select user role"
          defaultValue={row.getValue("role")}
          className="mr-2"
          onChange={(event) => {
            changedUserRole = event.target.value;
          }}
        >
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
          <option value="leader">Team Leader</option>
        </select>
        <Button
          variant="default"
          onClick={() => handleRoleChange(row.original._id)}
        >
          Save
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        variant="destructive"
        onClick={() => handleDelete(row.original._id)}
      >
        Delete
      </Button>
    ),
  },
];

export interface UsersTableProps {
  users: UserType[];
  loading: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = memo(
  ({ users, loading }) => {
    // Use useEffect to log when users or loading changes
    React.useEffect(() => {
      console.log(users, loading);
    }, [users, loading]);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const userData = useMemo(
      () =>
        users.map((user) => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          leadsInProgress: user.leadsInProgress,
        })),
      [users]
    );

    const table = useReactTable({
      data: userData,
      columns,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
      // Only use necessary hooks and ensure minimal re-renders
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
    });

    return (
      <div className="w-full bg-white p-4 rounded-lg mt-4">
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
  }
);
