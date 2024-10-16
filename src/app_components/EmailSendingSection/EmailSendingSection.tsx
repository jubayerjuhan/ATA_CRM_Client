import React from "react";
import { LeadType } from "@/types";
import { InfoCard, InfoItem } from "@/pages";

import { Button } from "@/components/ui/button";
import { SendEmail } from "../SendEmail/SendEmail";
import { itineraryHtmlContent, ticketEmailContent } from "./EmailHtmlContent";

interface EmailSendingSectionProps {
  lead: LeadType;
}

export const EmailSendingSection: React.FC<EmailSendingSectionProps> = ({
  lead,
}) => {
  const frontendUrl = import.meta.env.VITE_CLIENT_URL_PRODUCTION;
  const [selectedTab, setSelectedTab] = React.useState<null | string>(null);

  return (
    <InfoCard title="Email Section" className={""}>
      {/* Itinerary Email */}
      <InfoItem label={"Itinerary Email"}>
        <Button
          variant="outline"
          onClick={() => {
            setSelectedTab("itinerary");
          }}
        >
          Send Email
        </Button>
      </InfoItem>
      <InfoItem label={"Ticket Email"}>
        <Button
          variant="outline"
          onClick={() => {
            setSelectedTab("ticket");
          }}
        >
          Send Email
        </Button>
      </InfoItem>

      {/* Email Sending Rich Text Editor */}
      {selectedTab !== null && (
        <div className="">
          <div className="flex justify-between">
            <h2 className={`w-[100%]`}>
              Send {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}{" "}
              Email
            </h2>
            <Button
              className=""
              variant={"secondary"}
              onClick={() => {
                setSelectedTab(null);
              }}
            >
              Close Email Editor
            </Button>
          </div>
          {selectedTab === "itinerary" ? (
            <SendEmail
              selectedTab={selectedTab}
              lead={lead}
              setSelectedTab={setSelectedTab}
              emailType={selectedTab}
              defaultHtml={itineraryHtmlContent(
                `${frontendUrl}/acknowledgement?leadId=${lead._id}`
              )}
            />
          ) : (
            <div>
              <SendEmail
                selectedTab={selectedTab}
                lead={lead}
                setSelectedTab={setSelectedTab}
                emailType={selectedTab}
                defaultHtml={ticketEmailContent}
              />
            </div>
          )}
        </div>
      )}
    </InfoCard>
  );
};
