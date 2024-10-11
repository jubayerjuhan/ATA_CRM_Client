import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { client } from "@/api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/types";
import { getSingleLead } from "@/redux/actions";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface AddCallLogModalProps {
  leadId: string;
}

export const AddCallLogModal: React.FC<AddCallLogModalProps> = ({ leadId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [notes, setNotes] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCallLogWithDateTime = {
      notes,
      leadId,
      dateTime: moment().toISOString(),
    };

    try {
      await client.put(`/leads/${leadId}/add-call-log`, newCallLogWithDateTime);
      toast.success("Call log added successfully");
    } catch (error) {
      toast.error("Failed to add call log");
    } finally {
      setIsDialogOpen(false);
    }

    await dispatch(getSingleLead(leadId));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>Add Notes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Call Log</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex gap-4 flex-col">
              <Label htmlFor="notes" className="">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Enter notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Call Log</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
