import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { InfoItem } from "@/pages";
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
import { Textarea } from "@/components/ui/textarea"; // Assuming there's an Input component for simpler fields
import { Input } from "@/components/ui/input"; // Assuming there's an Input component for simpler fields
import { RxCross1 } from "react-icons/rx";
import { IoMdDoneAll } from "react-icons/io";
import toast from "react-hot-toast";
import { client } from "@/api/api";
import { getSingleLead } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch, LeadType } from "@/types";

interface ItineraryEmailProps {
  lead: LeadType;
  type: string;
}

interface ItineraryEmailFormValues {
  pnr: string;
  itinerary_amounts: any[];
}

export const ItineraryEmail: React.FC<ItineraryEmailProps> = ({
  lead,
  type,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const defaultFields = [
    { fieldName: "baggage_count", label: "Baggage Count" },
    { fieldName: "each_bag_weight", label: "Each Bag Weight (kg)" },
    { fieldName: "total_weight", label: "Total Weight (kg)" },
    { fieldName: "date_changing_charge", label: "Date Changing Charge (AUD)" },
    { fieldName: "cancellation_charge", label: "Cancellation Charge (AUD)" },
    { fieldName: "handling_charge", label: "Handling Charge (AUD)" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItineraryEmailFormValues>({
    defaultValues: {
      pnr: lead.pnr || "",
      itinerary_amounts: defaultFields.map((field) => ({
        fieldName: field.fieldName,
        value: 0,
        label: field.label,
      })),
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "itinerary_amounts",
  });

  const onSubmit = async (data: ItineraryEmailFormValues) => {
    if (!data.pnr) {
      return toast.error("Please enter PNR");
    }

    data.itinerary_amounts.map((field) => {
      if (field.value === 0) {
        toast.error(`${field.label} is required`);
      }
    });

    let itinerary_amounts = {};

    data.itinerary_amounts.map((field, index) => {
      itinerary_amounts = {
        ...itinerary_amounts,
        [defaultFields[index].fieldName]: Number(field.value),
      };
    });
    try {
      setLoading(true);
      await client.put(`/leads/${lead._id}`, {
        itinerary_amounts,
      });
      await client.post(`/customers/${lead._id}/send-itinerary-email`, data);

      toast.success("PNR Confirmation Mail Sent");

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
      label={type === "other" ? "Ticket Sending Email" : "Itenary Email"}
      value={lead.itenary_email_sent ? "Sent" : "Not Sent"}
      icon={
        lead.itenary_email_sent ? (
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
            <DialogTitle>Send Itinerary Email</DialogTitle>
            <DialogDescription>
              Please add the necessary details to send the itinerary email
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            {/* PNR */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="pnr">
                PNR
              </label>
              <Controller
                name="pnr"
                control={control}
                rules={{ required: "PNR is required" }}
                render={({ field }) => (
                  <div>
                    <Textarea
                      id="pnr"
                      {...field}
                      placeholder="Please Enter PNR"
                    />
                    {errors.pnr && (
                      <span className="text-red-500">{errors.pnr.message}</span>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Dynamic Fields */}
            {fields.map((field, index) => (
              <div key={field.id}>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor={`dynamicField-${index}`}
                >
                  {defaultFields[index].label}
                </label>
                <Controller
                  name={`itinerary_amounts.${index}.value`}
                  control={control}
                  rules={{
                    required: `${defaultFields[index].label} is required`,
                  }}
                  render={({ field }) => (
                    <div>
                      <Input
                        type="number"
                        id={`dynamicField-${index}`}
                        {...field}
                        placeholder={defaultFields[index].label}
                      />
                    </div>
                  )}
                />
              </div>
            ))}

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
