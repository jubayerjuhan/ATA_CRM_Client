import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming there's an Input component for simpler fields
import { RxCross1 } from "react-icons/rx";
import { IoMdDoneAll } from "react-icons/io";
import toast from "react-hot-toast";
import { client } from "@/api/api";
import { getSingleLead } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch, LeadType } from "@/types";
import { InfoItem } from "@/pages";

interface TicketEmailProps {
  lead: LeadType;
  type: string;
}

interface TicketEmailFormValues {
  pnr: string;
  tickets: { file: File | null }[];
}

export const TicketEmail: React.FC<TicketEmailProps> = ({ lead, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketEmailFormValues>({
    defaultValues: {
      tickets: [{ file: null }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "tickets",
  });

  const onSubmit = async (data: TicketEmailFormValues) => {
    data.tickets.forEach((field) => {
      if (!field.file) {
        toast.error(`Ticket is required`);
      }
    });

    const formData = new FormData();
    data.tickets.forEach((field, index) => {
      if (field.file) {
        formData.append(`ticket`, field.file);
      }
    });

    // return console.log(formData.getAll("ticket"), "formData");

    try {
      setLoading(true);
      await client.post(`/customers/${lead._id}/send-ticket-email`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ticket Email Sent");

      await dispatch(getSingleLead(lead._id as string));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setDialogOpen(false);
      reset(); // reset form after submission
    }
  };

  return (
    <InfoItem
      label={"Ticket Email"}
      value={lead.ticket_sent ? "Sent" : "Not Sent"}
      icon={
        lead.ticket_sent ? (
          <IoMdDoneAll color="green" />
        ) : (
          <RxCross1 color="red" />
        )
      }
    >
      <Dialog
        modal
        open={dialogOpen}
        onOpenChange={(openStatus) => {
          setDialogOpen(openStatus);
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Send Email
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Ticket Email</DialogTitle>
            <DialogDescription>
              Please add the necessary details to send the ticket email
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Ticket Fields */}
            {fields.map((field, index) => (
              <div key={field.id}>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor={`fileField-${index}`}
                >
                  Ticket {index + 1}
                </label>
                <Controller
                  name={`tickets.${index}.file`}
                  control={control}
                  rules={{
                    required: `Ticket ${index + 1} is required`,
                  }}
                  render={({ field }) => (
                    <div>
                      <Input
                        type="file"
                        id={`fileField-${index}`}
                        name={field.name}
                        ref={field.ref}
                        onChange={(e) =>
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                        onBlur={field.onBlur}
                      />
                    </div>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ file: null })}
            >
              Add Field
            </Button>

            <DialogFooter>
              <Button
                variant={"outline"}
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending Email..." : "Send Email"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </InfoItem>
  );
};
