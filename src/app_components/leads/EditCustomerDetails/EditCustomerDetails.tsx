import { client } from "@/api/api";
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
import { getSingleLead } from "@/redux/actions";
import { AppDispatch, LeadType } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface EditCustomerDetailsProps {
  lead: any;
}

export const EditCustomerDetails: React.FC<EditCustomerDetailsProps> = ({
  lead,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "phone" },
    { name: "postCode", label: "Post Code", type: "text" },
  ];

  const handleCustomerDetailsEdit = async (data: any) => {
    try {
      await client.put(`/leads/${lead._id}`, data);
      toast.success("Customer details edited successfully");
      setDialogOpen(false);
      dispatch(getSingleLead(lead._id));
    } catch (error: any) {
      toast.error("Failed to edit customer details");
    }
  };

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
          <DialogTitle>Edit Customer Details</DialogTitle>
          <DialogDescription>
            Make changes to customers travel details here
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4 h-[400px] overflow-y-scroll"
          onSubmit={() => console.log("Hello")}
        >
          {fields.map((field) => {
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
                      lead[field.name as keyof LeadType].name
                    }
                    defaultValue={lead[field.name as keyof LeadType]._id}
                  />
                </>
              );
            }

            if (field.type === "date") {
              return (
                <>
                  <DatePicker
                    value={
                      lead[field.name as keyof LeadType]
                        ? new Date(lead[field.name as keyof LeadType] as string)
                        : undefined
                    }
                    label={field.label}
                    name={field.name}
                    style={{ height: "50px" }}
                    onDateChange={(date) => setValue(field.name, date)}
                  />
                  {errors[field.name] && (
                    <span className="error-message">
                      {errors[field.name]?.message as string}
                    </span>
                  )}
                </>
              );
            }

            return (
              <div key={field.name}>
                <Label>{field.label}</Label>
                <Input
                  type={field.type}
                  onChange={(event) => setValue(field.name, event.target.value)}
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
            onClick={handleSubmit(handleCustomerDetailsEdit) as any}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
