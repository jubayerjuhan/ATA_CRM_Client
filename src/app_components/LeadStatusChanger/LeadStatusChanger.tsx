import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FC, useEffect, useState } from "react";
import { AppDispatch, LeadType } from "@/types";
import { useDispatch } from "react-redux";
import { changeLeadStatus } from "@/services/lead/leadStatus";
import { getSingleLead } from "@/redux/actions";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface LeadStatusChangerProps {
  lead: LeadType;
}

export const LeadStatusChanger: FC<LeadStatusChangerProps> = ({ lead }) => {
  const form = useForm<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { watch, setValue } = form;

  const [textareaOpen, setTextareaOpen] = useState(false);

  const selectedStatus = watch("status");

  const onSubmit = async (data: any) => {
    if (selectedStatus === "Sale Lost" && !data.saleLostReason) {
      toast.error("Please provide a reason for sale lost");
    }
    const updatedLead = {
      ...lead, // Copy all properties from lead
      status: data.status, // Update the status field
      saleLostReason: data.saleLostReason, // Update the saleLostReason field
    };

    await changeLeadStatus(updatedLead, dispatch);
    dispatch(getSingleLead(lead._id as string));
  };

  useEffect(() => {
    if (selectedStatus === "Sale Lost") {
      setTextareaOpen(true);
    }
  }, [selectedStatus]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-6 mb-6"
      >
        <FormField
          defaultValue={lead.status}
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Status</FormLabel>
              <div className="flex gap-2 align-middle">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a lead status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Itenary Email Sent">
                      Itenary Email Sent
                    </SelectItem>
                    <SelectItem value="Payment Link Sent">
                      Payment Link Sent
                    </SelectItem>
                    <SelectItem value="Payment Complete">
                      Payment Complete
                    </SelectItem>
                    <SelectItem value="Ticket Sent">Ticket Sent</SelectItem>
                    <SelectItem value="Sale Lost">Sale Lost</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit">Submit</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {textareaOpen && (
          <Textarea
            placeholder="Reason for sale lost"
            defaultValue={lead?.saleLostReason}
            onChange={(e) => setValue("saleLostReason", e.target.value)}
          />
        )}
      </form>
    </Form>
  );
};
