import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppDispatch, User } from "@/types";
import { client } from "@/api/api";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AssignLead({ users, leadId }: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!value) return;
    setShowDialog(true);
  }, [value, leadId]);

  const handleAssign = async () => {
    try {
      setLoading(true);
      const { data } = await client.post(`/leads/${leadId}/assign-lead`, {
        userId: value,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to assign lead");
    } finally {
      setLoading(false);
      setShowDialog(false);
    }
    setShowDialog(false);
  };

  return (
    <>
      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to assign this lead?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setShowDialog(false)}
              disabled={loading}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={handleAssign}>
              {loading ? "Assigning..." : "Assign"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-between"
          >
            {value
              ? users.find((user: User) => user._id === value)?.name
              : "Assign"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No User found.</CommandEmpty>
              <CommandGroup>
                {users.map((user: User) => (
                  <CommandItem
                    key={user._id}
                    value={user._id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
