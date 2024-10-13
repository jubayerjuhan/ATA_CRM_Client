import React, { useState, useMemo } from "react";
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

interface UsersOverviewProps {
  data: any[];
}

export const UsersOverview: React.FC<UsersOverviewProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LeadData | "user.name";
    direction: "asc" | "desc";
  } | null>(null);

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const sortedData = useMemo(() => {
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
  }, [filteredData, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  const totalPages = Math.ceil(sortedData.length / 10);

  const requestSort = (key: keyof LeadData | "user.name") => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto py-10 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Users Overview</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="border rounded-md">
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
                  Leads in Progress
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
