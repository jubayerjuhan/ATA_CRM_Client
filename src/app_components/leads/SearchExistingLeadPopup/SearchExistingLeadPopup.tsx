import React, { useEffect } from "react";

import { TbDatabaseSearch } from "react-icons/tb";

import "./SearchExistingLeadPopup.scss";
import { Button } from "@/components/ui/button";
import { searchLeadWithEmail } from "@/redux/actions";
import { LeadType } from "@/types";

interface SearchExistingLeadPopupProps {
  email: string | null;
  // eslint-disable-next-line no-unused-vars
  onAdd: (lead: LeadType | null) => void;
}

export const SearchExistingLeadPopup: React.FC<
  SearchExistingLeadPopupProps
> = ({ email, onAdd }) => {
  const [lead, setLead] = React.useState<LeadType | null>(null);

  useEffect(() => {
    // fetch lead information from the server
    fetchLeadInformation(email);
  }, [email]);

  const fetchLeadInformation = async (email: string | null) => {
    if (!email) return;
    // call the searchLeadWithEmail action
    const lead = await searchLeadWithEmail(email);

    if (lead) {
      setLead(lead);
    } else {
      setLead(null);
    }
  };

  return (
    <div className={`search-existing-lead_popup ${lead ? "open" : ""}`}>
      <div className="header">
        <TbDatabaseSearch />
        <h2>Existing Information Found</h2>
      </div>
      <div className="lead-details">
        <p>
          <strong>Name:</strong> {lead?.firstName} {lead?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {lead?.email}
        </p>
        <p>
          <strong>Phone:</strong> {lead?.phone}
        </p>
        <p>
          <strong>Post Code:</strong> {lead?.postCode}
        </p>
      </div>
      <Button onClick={() => onAdd(lead)}>Add To Form</Button>
    </div>
  );
};
