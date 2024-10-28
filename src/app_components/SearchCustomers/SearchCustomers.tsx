import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, Loader2 } from "lucide-react";
import { client } from "@/api/api";
import { LeadType } from "@/types";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export const SearchCustomers = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const commandRef = React.useRef<HTMLDivElement>(null);

  const [leads, setLeads] = React.useState<LeadType[]>([]);

  const handleSearch = async (value: string) => {
    setIsLoading(true);

    try {
      const { data } = await client.get(
        `/leads/global-search/all-leads?search=${value}`
      );
      setLeads(data.leads);
      setOpen(true);
    } catch (error) {
      console.error("Failed to fetch search results", error);
      setOpen(false);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commandRef]);

  return (
    <div className="w-full max-w-md mx-auto space-y-2 relative">
      <Label className="text-white">Search Data</Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search With Email or Phone..."
          className="pl-8"
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && (
        <Command
          ref={commandRef}
          className="rounded-lg border shadow-md absolute top-30 h-[300px]"
        >
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading={`Search Results (${leads.length})`}>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                leads.map((lead: LeadType) => (
                  <CommandItem key={lead._id}>
                    <Link
                      to={`/lead-search?email=${lead.email}&name=${lead.firstName} ${lead.lastName}`}
                    >
                      <h3 className="font-medium">
                        {lead.firstName} {lead.lastName}
                      </h3>
                      <div className="flex gap-2">
                        <p className="text-sm text-muted-foreground">
                          {lead.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lead.phone}
                        </p>
                      </div>
                    </Link>
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
};
