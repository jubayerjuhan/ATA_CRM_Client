import { InfoCard, InfoItem } from "@/pages";
import { LeadType } from "@/types";
import React from "react";
import { EditPassengersDetails } from "@/app_components";

interface PassengersDetailsProps {
  lead: LeadType;
}

export const PassengersDetails: React.FC<PassengersDetailsProps> = ({
  lead,
}) => {
  return (
    <>
      <InfoCard title="Passengers">
        <EditPassengersDetails lead={lead} />
        <InfoItem label="Adult" value={lead.adult} />
        <InfoItem label="Child" value={lead.child} />
        <InfoItem label="Infant" value={lead.infant} />
      </InfoCard>
    </>
  );
};
