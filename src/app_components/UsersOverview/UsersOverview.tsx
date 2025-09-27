import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
  Loader2,
} from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type LeadData = {
  user: User;
  leadsInProgress: number;
  convertedLeads: number;
  conversionRate: string;
};

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface UsersOverviewProps {
  data: any[];
  onDataRequest?: (params: {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }) => Promise<void>;
  loading?: boolean;
  pagination?: PaginationInfo;
}

export const UsersOverview: React.FC<UsersOverviewProps> = ({
  data,
  onDataRequest,
  loading = false,
  pagination
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LeadData | "user.name";
    direction: "asc" | "desc";
  }>({ key: "user.name", direction: "asc" });

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        handleSearch(localSearchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm]);

  // Use server-side pagination if available, otherwise fall back to client-side
  const isServerSide = !!onDataRequest && !!pagination;

  // Client-side logic for backward compatibility
  const filteredData = useMemo(() => {
    if (isServerSide) return data; // Server handles filtering
    return data.filter(
      (item) =>
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data, isServerSide]);

  const sortedData = useMemo(() => {
    if (isServerSide) return data; // Server handles sorting
    const sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === "user.name") {
          if (a.user.name < b.user.name)
            return sortConfig.direction === "asc" ? -1 : 1;
          if (a.user.name > b.user.name)
            return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        }
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig, isServerSide, data]);

  const paginatedData = isServerSide ? data : sortedData.slice(
    ((pagination?.currentPage || 1) - 1) * 10,
    (pagination?.currentPage || 1) * 10
  );

  const totalPages = isServerSide ? pagination?.totalPages || 1 : Math.ceil(sortedData.length / 10);
  const currentPage = isServerSide ? pagination?.currentPage || 1 : 1;

  const requestSort = async (key: keyof LeadData | "user.name") => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    if (isServerSide && onDataRequest) {
      await onDataRequest({
        page: 1, // Reset to first page when sorting
        limit: pagination?.limit || 10,
        search: searchTerm,
        sortBy: key,
        sortOrder: direction,
      });
    }
  };

  const handlePageChange = async (page: number) => {
    if (isServerSide && onDataRequest) {
      await onDataRequest({
        page,
        limit: pagination?.limit || 10,
        search: searchTerm,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      });
    }
  };

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
    if (isServerSide && onDataRequest) {
      await onDataRequest({
        page: 1, // Reset to first page when searching
        limit: pagination?.limit || 10,
        search,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      });
    }
  };

  return (
    <div className="w-100  p-10 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Users Overview</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="pl-8 w-[300px]"
            disabled={loading}
          />
          {loading && (
            <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || loading}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
            {isServerSide && pagination && (
              <span className="ml-2">
                ({pagination.totalCount} total users)
              </span>
            )}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="border rounded-md relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("user.name")}
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("leadsInProgress")}
                >
                  Leads Collected
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("convertedLeads")}
                >
                  Converted Leads
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("conversionRate")}
                >
                  Conversion Rate
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.user._id}>
                <TableCell className="font-medium">{item.user.name}</TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell className="capitalize">{item.user.role}</TableCell>
                <TableCell className="text-right">
                  {item.leadsInProgress}
                </TableCell>
                <TableCell className="text-right">
                  {item.convertedLeads}
                </TableCell>
                <TableCell className="text-right">
                  {item.conversionRate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
