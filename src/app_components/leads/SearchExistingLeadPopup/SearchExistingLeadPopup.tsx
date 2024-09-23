import React from "react";

import { TbDatabaseSearch } from "react-icons/tb";

import "./SearchExistingLeadPopup.scss";
import { Button } from "@/components/ui/button";

interface Lead {
  name: string;
  email: string;
  phone: string;
  postCode: string;
}

interface SearchExistingLeadPopupProps {
  lead: Lead;
  onAdd: () => void;
}

export const SearchExistingLeadPopup: React.FC<
  SearchExistingLeadPopupProps
> = ({ lead, onAdd }) => {
  return (
    <div className="search-existing-lead_popup open">
      <div className="header">
        <TbDatabaseSearch />
        <h2>Existing Information Found</h2>
      </div>
      <div className="lead-details">
        <p>
          <strong>Name:</strong> {lead.name}
        </p>
        <p>
          <strong>Email:</strong> {lead.email}
        </p>
        <p>
          <strong>Phone:</strong> {lead.phone}
        </p>
        <p>
          <strong>Post Code:</strong> {lead.postCode}
        </p>
      </div>
      <Button onClick={onAdd}>Add To Form</Button>
    </div>
  );
};
