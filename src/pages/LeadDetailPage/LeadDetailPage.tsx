import { DashboardLayout } from "@/app_components/DashboardLayout";
import React, { useEffect } from "react";

import "./LeadDetailPage.scss";

const LeadDetailPage = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // useEffect(() => {
  //   const fetchLead = () => {};
  //   fetchLead();
  // }, []);

  const lead = {
    _id: 'ObjectId("66d05239927b2c8563628dae")',
    passengerName: "James French",
    firstName: "James",
    lastName: "French",
    phone: "+8801620692839",
    email: "jamesfrench@example.com",
    postCode: "SW1A 1AA",
    callType: "Missed",
    dateTime: "2024-02-15T14:30",
    callFor: "New Booking",
    departure: "London Heathrow (LHR)",
    arrival: "New York (JFK)",
    airlinesCode: "BA",
    pnr: "ABC123",
    travelDate: "2024-06-20",
    returnDate: "2024-06-27",
    adult: "2",
    child: "1",
    infant: "0",
    caseDate: "2024-02-15T15:00",
    quoted: "$2,500",
    leadType: "Hot",
    followUpDate: "2024-02-17",
    comments:
      "Customer interested in business class upgrade. Requested information on lounge access and in-flight meals. Follow up with detailed quote including upgrade options.",
    createdAt: "2024-02-15T14:35:29.976+00:00",
  };

  return (
    <DashboardLayout>
      <div className="lead-detail-page">
        <header>
          <h1>{lead.passengerName}'s Lead Details</h1>
          <span className={`lead-type ${lead.leadType.toLowerCase()}`}>
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
            <InfoItem label="Call Type" value={lead.callType} />
            <InfoItem label="Date & Time" value={formatDate(lead.dateTime)} />
            <InfoItem label="Call For" value={lead.callFor} />
          </InfoCard>

          <InfoCard title="Travel Details">
            <InfoItem label="Departure" value={lead.departure} />
            <InfoItem label="Arrival" value={lead.arrival} />
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
            <InfoItem label="Case Date" value={formatDate(lead.caseDate)} />
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
  value: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="info-item">
    <span className="label">{label}:</span>
    <span className="value">{value}</span>
  </div>
);

export default LeadDetailPage;
