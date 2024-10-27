import { client } from "@/api/api";
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
import { AppDispatch } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface AddSplittedQuotedAmountProps {
  lead: any;
}

export const AddSplittedQuotedAmount: React.FC<
  AddSplittedQuotedAmountProps
> = ({ lead }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors, "errors");

  const handleTravelDetailsEdit = async (data: any) => {
    // Convert adult, child, and infant fields from strings to numbers
    const parsedData = { ...data };
    console.log(parsedData);

    Object.keys(parsedData).forEach((key) => {
      if (
        key.startsWith("adult_") ||
        key.startsWith("child_") ||
        key.startsWith("infant_")
      ) {
        parsedData[key] = parseFloat(parsedData[key]);
      }
    });

    // Calculate total amount
    parsedData.total = Object.keys(parsedData).reduce((sum, key) => {
      if (
        key.startsWith("adult_") ||
        key.startsWith("child_") ||
        key.startsWith("infant_")
      ) {
        return sum + parsedData[key];
      }
      return sum;
    }, 0);

    console.log(parsedData, "parsedData");

    try {
      await client.put(`/customers/${lead._id}/add-quoted-amount`, {
        quotedAmount: parsedData,
      });
      toast.success("Quoted Amount Added Successfully");
      setDialogOpen(false);
      dispatch(getSingleLead(lead._id));
    } catch (error: any) {
      toast.error("Failed to edit travel details");
    }
  };

  if (lead.status === "Ticket Sent" || lead.status === "Sale Lost") {
    return <></>;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal>
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
          <DialogTitle>Add Quoted Amount</DialogTitle>
          <DialogDescription>
            Please Add Quoted Amount for each passenger
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4 px-2 overflow-y-auto max-h-[400px]"
          onSubmit={() => console.log("Hello")}
        >
          {Array.from({ length: Number(lead.adult) }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <Label style={{ marginBottom: "10px" }}>Adult {index + 1}</Label>
              <Input
                type="number"
                {...register(`adult_${index + 1}`, { required: true })}
                defaultValue={lead.quoted_amount[`adult_${index + 1}`]}
              />
              {errors[`adult_${index + 1}`] && (
                <span className="error-message">
                  {errors[`adult_${index + 1}`]?.message as string}
                </span>
              )}
            </div>
          ))}
          {Array.from({ length: Number(lead.child) }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <Label style={{ marginBottom: "10px" }}>Child {index + 1}</Label>
              <Input
                type="number"
                {...register(`child_${index + 1}`, { required: true })}
                defaultValue={lead.quoted_amount[`child_${index + 1}`]}
              />
              {errors[`child_${index + 1}`] && (
                <span className="error-message">
                  {errors[`child_${index + 1}`]?.message as string}
                </span>
              )}
            </div>
          ))}
          {Array.from({ length: Number(lead.infant) }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <Label style={{ marginBottom: "10px" }}>Infant {index + 1}</Label>
              <Input
                type="number"
                {...register(`infant_${index + 1}`, { required: true })}
                defaultValue={lead.quoted_amount[`infant_${index + 1}`]}
              />
              {errors[`infant_${index + 1}`] && (
                <span className="error-message">
                  {errors[`infant_${index + 1}`]?.message as string}
                </span>
              )}
            </div>
          ))}
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
