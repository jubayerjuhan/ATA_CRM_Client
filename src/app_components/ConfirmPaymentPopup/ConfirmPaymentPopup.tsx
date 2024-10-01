import React from "react";

import { TbDatabaseSearch } from "react-icons/tb";
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

import "./ConfirmPaymentPopup.scss";
import { client } from "@/api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getSingleLead } from "@/redux/actions";

interface ConfirmPaymentPopupProps {
  lead: LeadType;
}

export const ConfirmPaymentPopup: React.FC<ConfirmPaymentPopupProps> = ({
  lead,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  if (!lead.selectedPaymentMethod || lead.converted) {
    return <></>;
  }

  const handleConfirmPayment = async () => {
    try {
      await client.put(`/leads/${lead._id}`, {
        payment: {
          status: "completed",
          date: new Date(),
        },
        status: "Payment Complete",
        converted: true,
      });

      toast.success("Payment Confirmed");
      dispatch(getSingleLead(lead._id as string));
    } catch (error) {
      toast.error("Failed to confirm the payment");
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
              Are you sure you got the payment from the customer?
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
      <div className={`confirm-payment_popup ${lead ? "open" : ""}`}>
        <div className="header">
          <TbDatabaseSearch />
          <h2>Payment Method Selected</h2>
        </div>{" "}
        <p>
          Selected Method: {lead?.selectedPaymentMethod?.toLocaleUpperCase()}
        </p>
        <Button className="mt-4" onClick={() => setDialogOpen(true)}>
          Confirm Payment
        </Button>
      </div>
    </>
  );
};
