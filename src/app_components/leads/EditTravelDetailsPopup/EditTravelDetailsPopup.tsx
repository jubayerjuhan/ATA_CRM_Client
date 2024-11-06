import { client } from "@/api/api";
import { AirlineSelector } from "@/app_components/AirlineSelector/AirlineSelector";
import { AirportSelector } from "@/app_components/AirportSelector/AirportSelector";
import { DatePicker } from "@/app_components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSingleLead } from "@/redux/actions";
import { AppDispatch, AppState, LeadType } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface EditTravelDetailsProps {
  lead: any;
}

export const EditTravelDetails: React.FC<EditTravelDetailsProps> = ({
  lead,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: AppState) => state.auth);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fields = [
    { name: "departure", label: "Departure Airport", type: "airport_selector" },
    { name: "arrival", label: "Arrival Airport", type: "airport_selector" },
    { name: "airlinesCode", label: "Airlines", type: "text" },
    { name: "pnr", label: "Final PNR", type: "textarea" },
    { name: "travelDate", label: "Travel Date", type: "date" },
    { name: "returnDate", label: "Return Date", type: "date" },
  ];

  const handleTravelDetailsEdit = async (data: any) => {
    try {
      await client.put(`/leads/${lead._id}`, data);
      toast.success("Travel details edited successfully");
      setDialogOpen(false);
      dispatch(getSingleLead(lead._id));
    } catch (error: any) {
      toast.error("Failed to edit travel details");
    }
  };

  if (lead.status === "Sale Lost") {
    return <></>;
  }

  if (lead.status === "Ticket Sent" && profile?.role === "agent") return <></>;

  if (lead.status === "Ticket Sent" && profile)
    return (
      <Dialog open={dialogOpen} modal>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setDialogOpen(true)}
          >
            Edit Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Travel Details</DialogTitle>
            <DialogDescription>
              Make changes to customers travel details here
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4 h-[400px] overflow-y-scroll"
            onSubmit={() => console.log("Hello")}
          >
            {fields.map((field) => {
              if (field.type === "textarea") {
                return (
                  <div key={field?.name}>
                    <Label>{field?.label}</Label>
                    <Textarea
                      onChange={(event) =>
                        setValue(field?.name, event.target.value)
                      }
                      defaultValue={lead[field?.name as keyof LeadType]}
                    />
                  </div>
                );
              }
              if (field.type === "airport_selector") {
                return (
                  <>
                    <AirportSelector
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      register={register}
                      setValue={setValue}
                      defaultDisplayValue={
                        lead[field.name as keyof LeadType]?.name
                      }
                      defaultValue={lead[field.name as keyof LeadType]?._id}
                    />
                  </>
                );
              }

              if (field.name === "airlinesCode") {
                return (
                  <>
                    {/* <AirportSelector
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    register={register}
                    setValue={setValue}
                    defaultDisplayValue={
                      lead[field.name as keyof LeadType]?.name
                    }
                    defaultValue={lead[field.name as keyof LeadType]?._id}
                  /> */}

                    <AirlineSelector
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      register={register}
                      setValue={setValue}
                      defaultDisplayValue={
                        lead[field.name as keyof LeadType]?.name
                      }
                      defaultValue={lead.airline.name}
                    />
                  </>
                );
              }

              if (field.type === "date") {
                return (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className="w-full"
                      type="date"
                      onChange={(event) =>
                        setValue(field.name, event.target.value)
                      }
                      defaultValue={
                        lead[field.name as keyof LeadType]
                          ? new Date(
                              lead[field.name as keyof LeadType] as string
                            )
                              .toISOString()
                              .split("T")[0]
                          : undefined
                      }
                    />
                    {errors[field.name] && (
                      <span className="error-message">
                        {errors[field.name]?.message as string}
                      </span>
                    )}
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <Label>{field.label}</Label>
                  <Input
                    type={field.type}
                    onChange={(event) =>
                      setValue(field.name, event.target.value)
                    }
                    defaultValue={lead[field.name as keyof LeadType]}
                  />
                </div>
              );
            })}
          </form>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} variant={"outline"}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(handleTravelDetailsEdit) as any}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};
