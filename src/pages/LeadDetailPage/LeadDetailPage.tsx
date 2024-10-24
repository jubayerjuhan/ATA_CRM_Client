import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import {
  AddCallLogModal,
  AddSplittedQuotedAmount,
  CancelBookingPopup,
  ConfirmPaymentPopup,
  EditCustomerDetails,
  EditTravelDetails,
  EmailSendingSection,
  LeadStatusChanger,
  PassengersDetails,
} from "@/app_components";
import { AppDispatch, AppState } from "@/types";
import { getSingleLead } from "@/redux/actions";
import moment from "moment";
import "./LeadDetailPage.scss";
import { FaWhatsapp } from "react-icons/fa";
import { FollowUpDatePicker } from "@/app_components/FollowupDatePicker/FollowupDatePicker";

export const LeadDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leadId } = useParams<{ leadId: string }>();
  const { lead } = useSelector((state: AppState) => state.lead);

  useEffect(() => {
    if (leadId) {
      dispatch(getSingleLead(leadId));
    }
  }, [dispatch, leadId]);

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <DashboardLayout>
      <ConfirmPaymentPopup lead={lead} />
      <div className="lead-detail-page">
        <header>
          <h1>
            {lead.firstName} {lead.lastName}'s Lead Details
          </h1>
          <span className={`lead-type ${lead.leadType?.toLowerCase()}`}>
            {lead.status}
          </span>
        </header>

        <div className="flex justify-between my-6">
          <FollowUpDatePicker lead={lead} />
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">Booking Id:</span>
            <span className="px-2 py-1 bg-black text-white rounded-md">
              {lead.booking_id}
            </span>
          </div>
        </div>

        <div className="mb-8 flex justify-between">
          <a
            href={`https://wa.me/${lead.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 text-lg"
            style={{ alignItems: "center", width: "fit-content" }}
          >
            <span className="text-[#3498db]">WhatsApp:</span>
            <FaWhatsapp size={32} />
          </a>
          <CancelBookingPopup lead={lead} />
        </div>
        <div
          className="flex
         justify-between"
        >
          <LeadStatusChanger lead={lead} />
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">Managing Agent:</span>
            <span className="px-2 py-1 bg-blue-500 text-white rounded-md">
              {typeof lead.claimed_by === "object" && lead.claimed_by !== null
                ? lead.claimed_by.name
                : lead.claimed_by}
            </span>
          </div>
        </div>
        <div className="lead-info-grid">
          <InfoCard title="Customer Information">
            <EditCustomerDetails lead={lead} />

            <InfoItem
              label="Full Name"
              value={`${lead.firstName} ${lead.lastName}`}
            />
            <InfoItem label="Phone" value={lead.phone} />
            <InfoItem label="Email" value={lead.email} />
            <InfoItem label="Lead Origin" value={lead.leadOrigin} />
            <InfoItem label="Post Code" value={lead.postCode} />
          </InfoCard>
          <InfoCard title="Travel Details">
            <EditTravelDetails lead={lead} />
            <InfoItem
              label="Departure"
              value={
                lead.departure
                  ? `${lead.departure.name} (${lead.departure.code}), ${lead.departure.city}, ${lead.departure.country}`
                  : "N/A"
              }
            />
            <InfoItem
              label="Arrival"
              value={
                lead.arrival
                  ? `${lead.arrival.name} (${lead.arrival.code}), ${lead.arrival.city}, ${lead.arrival.country}`
                  : "N/A"
              }
            />
            <InfoItem
              label="Airlines Name"
              value={`${lead.airline?.name} (${lead.airline?.iata})`}
            />
            <InfoItem
              label="PNR"
              value={lead.pnr ? lead.pnr : "N/A"}
              style={{ whiteSpace: "pre-wrap" }}
            />
            <InfoItem
              label="Travel Date"
              value={moment(lead.travelDate).format("DD-MM-YYYY")}
            />
            <InfoItem
              label="Return Date"
              value={moment(lead.returnDate).format("DD-MM-YYYY")}
            />
          </InfoCard>
          <InfoCard title="Pricing Information">
            <AddSplittedQuotedAmount lead={lead} />
            <InfoItem
              label="Total Quoted Amount"
              value={lead.quoted_amount.total}
            />
            {Object.entries(lead.quoted_amount).map(([key, value]) => {
              const formattedKey = key
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return <InfoItem key={key} label={formattedKey} value={value} />;
            })}
            {/* <InfoItem
              label="Follow-up Date"
              value={moment(lead.follow_up_date).format("DD-MM-YYYY")}
            /> */}
          </InfoCard>
          <InfoCard title="Notes">
            <AddCallLogModal leadId={leadId as string} />
            {lead.call_logs?.map((log, index) => {
              console.log(log, "log...");
              return (
                <div
                  key={index}
                  style={{ backgroundColor: "#F9F9F9" }}
                  className="p-4 rounded-md mb-4"
                >
                  <InfoItem label="Added By" value={log.added_by?.name} />
                  <InfoItem
                    label="Date & Time"
                    value={moment(log.dateTime).format("DD-MM-YYYY hh:mm a")}
                  />
                  <InfoItem label="Notes" value={log.notes} />
                </div>
              );
            })}
          </InfoCard>
          <PassengersDetails lead={lead} />

          {/* Here is the Email Sending Section Card */}
          {!lead.cancelled && <EmailSendingSection lead={lead} />}
        </div>
      </div>
    </DashboardLayout>
  );
};

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  [key: string]: any;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  fullWidth,
  className,
  ...props
}) => (
  <div
    className={`info-card ${className} ${fullWidth ? "full-width" : ""}`}
    {...props}
  >
    <h2>{title}</h2>
    <div className="info-content">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value?: string | number | undefined;
  children?: React.ReactNode;
  [key: string]: any;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  children,
  icon,
  ...props
}) => (
  <div className="info-item" {...props}>
    <span className="label">{label}:</span>
    <div className="info-item_content">
      {icon}
      <span className="value">{value}</span>
      {children && <div className="extra-content">{children}</div>}
    </div>
  </div>
);
