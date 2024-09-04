import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DashboardLayout } from "@/app_components/DashboardLayout";
import "./LeadDetailPage.scss";
import { AppDispatch, AppState } from "@/types";
import { getSingleLead } from "@/redux/actions";
import moment from "moment";
import { AddCallLogModal } from "@/app_components";

const LeadDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leadId } = useParams<{ leadId: string }>();
  const { lead } = useSelector((state: AppState) => state.lead);

  useEffect(() => {
    if (leadId) {
      dispatch(getSingleLead(leadId));
    }
  }, [dispatch, leadId]);

  if (!lead) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="lead-detail-page">
        <header>
          <h1>
            {lead.firstName} {lead.lastName}'s Lead Details
          </h1>
          <span className={`lead-type ${lead.leadType?.toLowerCase()}`}>
            {lead.leadType}
          </span>
        </header>

        <div className="lead-info-grid">
          <InfoCard title="Personal Information">
            <InfoItem
              label="Full Name"
              value={`${lead.firstName} ${lead.lastName}`}
            />
            <InfoItem label="Phone" value={lead.phone} />
            <InfoItem label="Email" value={lead.email} />
            <InfoItem label="Post Code" value={lead.postCode} />
          </InfoCard>

          <InfoCard title="Call Information">
            <AddCallLogModal leadId={leadId as string} />
            {lead.call_logs?.map((log, index) => (
              <div
                key={index}
                style={{ backgroundColor: "#F9F9F9" }}
                className="p-4 rounded-md mb-4"
              >
                <InfoItem label="Call Type" value={log.callType} />
                <InfoItem
                  label="Date & Time"
                  value={moment(log.dateTime).format("DD-MM-YYYY hh:mm a")}
                />
              </div>
            ))}
          </InfoCard>

          <InfoCard title="Travel Details">
            <InfoItem
              label="Departure"
              value={`${lead.departure.name} (${lead.departure.code}), ${lead.departure.city}, ${lead.departure.country}`}
            />
            <InfoItem
              label="Arrival"
              value={`${lead.arrival.name} (${lead.arrival.code}), ${lead.arrival.city}, ${lead.arrival.country}`}
            />
            <InfoItem label="Airlines Code" value={lead.airlinesCode} />
            <InfoItem label="PNR" value={lead.pnr} />
            <InfoItem label="Travel Date" value={lead.travelDate} />
            <InfoItem label="Return Date" value={lead.returnDate} />
          </InfoCard>

          <InfoCard title="Passengers">
            <InfoItem label="Adult" value={lead.adult} />
            <InfoItem label="Child" value={lead.child} />
            <InfoItem label="Infant" value={lead.infant} />
          </InfoCard>

          <InfoCard title="Additional Information">
            {/* <InfoItem label="Case Date" value={formatDate(lead.caseDate)} /> */}
            <InfoItem label="Quoted" value={lead.quoted} />
            <InfoItem label="Follow-up Date" value={lead.followUpDate} />
          </InfoCard>

          <InfoCard title="Comments" fullWidth>
            <p>{lead.comments}</p>
          </InfoCard>

          <InfoCard title="Contact via WhatsApp">
            <a
              href={`https://wa.me/${lead.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send WhatsApp Message
            </a>
          </InfoCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, fullWidth }) => (
  <div className={`info-card ${fullWidth ? "full-width" : ""}`}>
    <h2>{title}</h2>
    <div className="info-content">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string | number | undefined;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="info-item">
    <span className="label">{label}:</span>
    <span className="value">{value}</span>
  </div>
);

export default LeadDetailPage;
