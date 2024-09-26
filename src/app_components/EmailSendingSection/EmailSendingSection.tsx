import React from "react";

import { InfoCard, InfoItem } from "@/pages";
import { LeadType } from "@/types";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { client } from "@/api/api";
import { Textarea } from "@/components/ui/textarea";
import { getSingleLead } from "@/redux/actions";
import { RxCross1 } from "react-icons/rx";
import { IoMdDoneAll } from "react-icons/io";

interface EmailSendingSectionProps {
  lead: LeadType;
  dispatch: any;
}

export const EmailSendingSection: React.FC<EmailSendingSectionProps> = ({
  lead,
  dispatch,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pnr, setPNR] = React.useState<string | null>(lead.pnr || null);

  const handleSendEmail = async (e: any) => {
    e.preventDefault();

    if (!pnr) {
      return toast.error("Please enter PNR");
    }

    try {
      setLoading(true);
      await client.post(`/customers/${lead._id}/send-itinerary-email`, {
        pnr,
      });

      toast.success("PNR Confirmation Mail Sent");

      await dispatch(getSingleLead(lead._id as string));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  return (
    <div>
      {/*  */}
      <InfoCard title="Email Section">
        {/* <AddSplittedQuotedAmount lead={lead} /> */}
        <InfoItem
          label={"Itenary Email"}
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
                <DialogTitle>Send Itenary Email</DialogTitle>
                <DialogDescription>
                  Please add the PNR to send the itenary email
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 py-4" onSubmit={handleSendEmail}>
                <Textarea
                  defaultValue={lead.pnr}
                  placeholder="Please Enter PNR"
                  onChange={(e) => {
                    setPNR(e.target.value);
                  }}
                />
              </form>
              <DialogFooter>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleSendEmail}
                  disabled={loading}
                >
                  {loading ? "Sending Email..." : "Send Email"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </InfoItem>
      </InfoCard>
    </div>
  );
};
