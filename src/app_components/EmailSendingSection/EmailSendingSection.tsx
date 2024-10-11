import React from "react";
import { LeadType } from "@/types";
import { InfoCard } from "@/pages";
import { ItineraryEmail } from "../ItineraryEmail/ItineraryEmal";
import { TicketEmail } from "../TicketEmail/TicketEmail";

interface EmailSendingSectionProps {
  lead: LeadType;
}

export const EmailSendingSection: React.FC<EmailSendingSectionProps> = ({
  lead,
}) => {
  return (
    <div>
      {/*  */}
      <InfoCard title="Email Section">
        <></>
        {/* <ItineraryEmail lead={lead} type="" /> */}
        {/* <TicketEmail lead={lead} type="" /> */}
      </InfoCard>
    </div>
  );
};
