import React, { useEffect } from "react";

import { TbDatabaseSearch } from "react-icons/tb";
import { FaRegTimesCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { searchLeadWithEmail } from "@/redux/actions";
import { LeadType } from "@/types";

import "./SearchExistingLeadPopup.scss";

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

  useEffect(() => {
    if (lead) onAdd(lead);
  }, [lead, onAdd]);

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
      <FaRegTimesCircle className="cross_logo" onClick={() => setLead(null)} />
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
        <p>
          <strong>Last Lead Converted:</strong>
          <span
            style={{
              color: lead?.converted ? "green" : "red",
              marginLeft: "5px",
            }}
          >
            {lead?.converted ? "Yes" : "No"}
          </span>
        </p>
        <p>
          <strong>Last Lead Status:</strong>
          <span
            style={{
              marginLeft: "5px",
            }}
          >
            {lead?.status === "Ticket Sent"
              ? "Sale Converted"
              : lead?.status === "Itenary Email Sent"
              ? "Payment Link Sent"
              : lead?.status}
          </span>
        </p>
      </div>
      <Button onClick={() => onAdd(lead)}>Add To Form</Button>
    </div>
  );
};
