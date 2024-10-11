import React, { useEffect } from "react";
import { LeadType } from "@/types";
import { InfoCard, InfoItem } from "@/pages";

import { IoMdDoneAll } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { SendEmail } from "../SendEmail/SendEmail";
import { itineraryHtmlContent, ticketEmailContent } from "./EmailHtmlContent";

interface EmailSendingSectionProps {
  lead: LeadType;
}

export const EmailSendingSection: React.FC<EmailSendingSectionProps> = ({
  lead,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<null | string>(null);
  const [defaultHtml, setDefaultHtml] = React.useState<string>("");

  const itineraryEmailSent = lead.itenary_email_sent;
  const ticketEmailSent = lead.ticket_sent;

  // useEffect(() => {
  //   if (selectedTab === "itinerary") {
  //     setDefaultHtml(itineraryHtmlContent);
  //   } else if (selectedTab === "ticket") {
  //     setDefaultHtml(ticketEmailContent);
  //   }
  // }, [lead, selectedTab]);

  return (
    <InfoCard title="Email Section" className={""}>
      {/* Itinerary Email */}
      <InfoItem
        label={"Itinerary Email"}
        // value={itineraryEmailSent ? "Sent" : "Not Sent"}
        // icon={
        //   itineraryEmailSent ? (
        //     <IoMdDoneAll color="green" />
        //   ) : (
        //     <RxCross1 color="red" />
        //   )
        // }
      >
        <Button
          variant="outline"
          onClick={() => {
            setDefaultHtml(itineraryHtmlContent);
            setSelectedTab("itinerary");
          }}
        >
          Send Email
        </Button>
      </InfoItem>
      <InfoItem
        label={"Ticket Email"}
        // value={ticketEmailSent ? "Sent" : "Not Sent"}
        // icon={
        //   ticketEmailSent ? (
        //     <IoMdDoneAll color="green" />
        //   ) : (
        //     <RxCross1 color="red" />
        //   )
        // }
      >
        <Button
          variant="outline"
          onClick={() => {
            setDefaultHtml(ticketEmailContent);
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
                setDefaultHtml("");
              }}
            >
              Close Email Editor
            </Button>
          </div>
          {selectedTab === "itinerary" ? (
            <SendEmail defaultHtml={itineraryHtmlContent} />
          ) : (
            <div>
              <SendEmail defaultHtml={ticketEmailContent} />
            </div>
          )}
        </div>
      )}
    </InfoCard>
  );
};
