import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { AddCallLogModal } from "@/app_components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppDispatch, AppState } from "@/types";
import { getSingleLead } from "@/redux/actions";
import { client } from "@/api/api";
import moment from "moment";
import "./LeadDetailPage.scss";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

const LeadDetailPage = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [pnr, setPnr] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { leadId } = useParams<{ leadId: string }>();
  const { lead, loading } = useSelector((state: AppState) => state.lead);

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
      <div className="lead-detail-page">
        <header>
          <h1>
            {lead.firstName} {lead.lastName}'s Lead Details
          </h1>
          <span className={`lead-type ${lead.leadType?.toLowerCase()}`}>
            {lead.leadType}
          </span>
        </header>
        <div className="flex space-x-2 mb-[2rem]">
          <Input
            className="w-[200px]"
            placeholder="Enter PNR Number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPnr(event.target.value)
            }
          />
          <Button disabled={pageLoading} onClick={() => handlePNRSubmit(pnr)}>
            Submit
          </Button>
        </div>

        <div className="mb-8">
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
        </div>
        <div className="lead-info-grid">
          <InfoCard title="Personal Information">
            <InfoItem
              label="Full Name"
              value={`${lead.firstName} ${lead.lastName}`}
            />
            <InfoItem label="Phone" value={lead.phone} />
            <InfoItem label="Email" value={lead.email} />
            <InfoItem label="Lead Origin" value={lead.leadOrigin} />
            <InfoItem label="Address" value={lead.address} />
          </InfoCard>
          <InfoCard title="Travel Details">
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
            <InfoItem label="PNR" value={lead.pnr} />
            <InfoItem label="Travel Date" value={lead.travelDate} />
            <InfoItem label="Return Date" value={lead.returnDate} />
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
                <InfoItem label="Notes" value={log.notes} />
              </div>
            ))}
          </InfoCard>
          <InfoCard title="Passengers">
            <InfoItem label="Adult" value={lead.adult} />
            <InfoItem label="Child" value={lead.child} />
            <InfoItem label="Infant" value={lead.infant} />
          </InfoCard>
          <InfoCard title="Pricing Information">
            <InfoItem label="Quoted Amount" value={lead.quotedAmount} />
            <InfoItem label="Follow-up Date" value={lead.followUpDate} />
          </InfoCard>
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
