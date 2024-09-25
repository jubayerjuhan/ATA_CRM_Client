import React from "react";

import { InfoCard, InfoItem } from "@/pages";
import { LeadType } from "@/types";

interface EmailSendingSectionProps {
  lead: LeadType;
}

export const EmailSendingSection: React.FC<EmailSendingSectionProps> = ({
  lead,
}) => {
  const sendItenaryEmail = () => {
    console.log("Sending Itenary Email");
  };

  return (
    <div>
      <InfoCard title="Email Section">
        {/* <AddSplittedQuotedAmount lead={lead} /> */}
        <InfoItem
          label={"Itenary Email"}
          value={"Not Sent"}
          onClick={sendItenaryEmail}
        />
      </InfoCard>
    </div>
  );
};
