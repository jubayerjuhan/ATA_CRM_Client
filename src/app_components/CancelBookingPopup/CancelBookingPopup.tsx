import React from "react";

import { Button } from "@/components/ui/button";

import { AppDispatch, LeadType } from "@/types";

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

import { client } from "@/api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getSingleLead } from "@/redux/actions";

interface CancelBookingPopupProps {
  lead: LeadType;
}

export const CancelBookingPopup: React.FC<CancelBookingPopupProps> = ({
  lead,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  if (lead.cancelled) {
    return <></>;
  }

  const handleConfirmPayment = async () => {
    try {
      await client.put(`/leads/${lead._id}`, {
        converted: false,
        cancelled: true,
        status: "Cancelled",
      });

      toast.success("Booking Cancelled");
      dispatch(getSingleLead(lead._id as string));
    } catch (error) {
      toast.error("Failed to cancel the booking");
    }
  };
  return (
    <>
      <AlertDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the booking?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPayment}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button className="mt-4" onClick={() => setDialogOpen(true)}>
        Cancel Booking
      </Button>
    </>
  );
};
