import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import {
  AddCallLogModal,
  AddSplittedQuotedAmount,
  CancelBookingPopup,
  ConfirmPaymentPopup,
  EditTravelDetails,
  EmailSendingSection,
} from "@/app_components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppDispatch, AppState } from "@/types";
import { getSingleLead } from "@/redux/actions";
import { client } from "@/api/api";
import moment from "moment";
import "./LeadDetailPage.scss";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import { FollowUpDatePicker } from "@/app_components/FollowupDatePicker/FollowupDatePicker";

export const LeadDetailPage = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [pnr, setPnr] = useState("");
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

  const handlePNRSubmit = async (pnr: string) => {
    try {
      setPageLoading(true);
      await client.post(`/leads/${leadId}/send-pnr-confirmation`, { pnr });
      toast.success("PNR Confirmation Mail Sent");
      if (leadId) {
        dispatch(getSingleLead(leadId));
      }
    } catch (error) {
      toast.error(
        "Can't Send PNR Confirmation Mail, Please Check If Arrival and Departure Airport Entered Or Not"
      );
    } finally {
      setPageLoading(false);
    }
  };

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
        <FollowUpDatePicker lead={lead} />
        <div className="flex space-x-4">
          {/* {!lead.pnr && (
            <div className="flex space-x-2 mb-[2rem]">
              <Input
                className="w-[200px]"
                placeholder="Enter PNR Number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPnr(event.target.value)
                }
              />
              <Button
                disabled={pageLoading}
                onClick={() => handlePNRSubmit(pnr)}
              >
                Submit
              </Button>
            </div>
          )} */}
          {/* {lead.pnr && !lead.quotedAmount && (
            <div className="flex space-x-2 mb-[2rem]">
              <Input
                type="number"
                className="w-[200px]"
                placeholder="Enter Quoted Amount"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setQuotedAmount(event.target.value)
                }
              />
              <Button
                disabled={pageLoading}
                onClick={() => handlePaymentLinkCreation(quotedAmount)}
              >
                Send Payment Link
              </Button>
            </div>
          )} */}
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
        <div className="lead-info-grid">
          <InfoCard title="Customer Information">
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
            <InfoItem label="Airlines Code" value={lead.airlinesCode} />
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
          <InfoCard title="Call Information">
            <AddCallLogModal leadId={leadId as string} />
            {lead.call_logs?.map((log, index) => {
              console.log(log, "log...");
              return (
                <div
                  key={index}
                  style={{ backgroundColor: "#F9F9F9" }}
                  className="p-4 rounded-md mb-4"
                >
                  <InfoItem label="Call Type" value={log.callType} />
                  <InfoItem
                    label="Date & Time"
                    value={moment(Number(log.dateTime)).format(
                      "DD-MM-YYYY hh:mm a"
                    )}
                  />
                  <InfoItem label="Notes" value={log.notes} />
                </div>
              );
            })}
          </InfoCard>
          <InfoCard title="Passengers">
            <InfoItem label="Adult" value={lead.adult} />
            <InfoItem label="Child" value={lead.child} />
            <InfoItem label="Infant" value={lead.infant} />
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
            <InfoItem
              label="Follow-up Date"
              value={moment(lead.follow_up_date).format("DD-MM-YYYY")}
            />
          </InfoCard>

          {/* Here is the Email Sending Section Card */}
          <EmailSendingSection lead={lead} />
          <InfoCard title="Comments" fullWidth>
            <p>{lead.comments}</p>
          </InfoCard>
          {/* <InfoCard title="Contact via WhatsApp">
            <a
              href={`https://wa.me/${lead.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send WhatsApp Message
            </a>
          </InfoCard> */}
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

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  fullWidth,
}) => (
  <div className={`info-card ${fullWidth ? "full-width" : ""}`}>
    <h2>{title}</h2>
    <div className="info-content">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string | number | undefined;
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
