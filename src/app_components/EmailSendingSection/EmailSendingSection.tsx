import React from "react";

import { InfoCard, InfoItem } from "@/pages";

export const EmailSendingSection = () => {
  return (
    <div>
      <InfoCard title="Email Section">
        {/* <AddSplittedQuotedAmount lead={lead} /> */}
        <InfoItem
          label={"Itenary Email"}
          value={"Not Sent"}
          onClick={() => {}}
        />
      </InfoCard>
    </div>
  );
};
