import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import "./AcknowledgementPage.scss";
import toast from "react-hot-toast";
import { client } from "@/api/api";

export const AcknowledgementPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  console.log(queryParams);

  const leadId = queryParams.get("leadId");
  if (!leadId) {
    toast.error("Lead ID not found");
  }

  const navigate = useNavigate();

  useEffect(() => {
    const sendPaymentMethodSelectionEmail = async (leadId: string | null) => {
      try {
        setMessage("Sending Payment Email");
        setLoading(true);
        await client.post(`/payment/${leadId}/send-payment-email`);
        toast.success("Payment email sent successfully");
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setMessage("Failed to Send Payment Email");
        toast.error("Failed to send payment email");
      } finally {
        setLoading(false);
        setMessage("Payment Email Sent Successfully");
      }
    };

    if (leadId) {
      sendPaymentMethodSelectionEmail(leadId);
    }
  }, [leadId]);

  return (
    <div className="acknowledgement-page">
      <h1>Hello</h1>
      <div className="acknowledgement-content">
        <div className="acknowledgement-icon">
          {loading ? (
            <AiOutlineLoading3Quarters size={40} />
          ) : (
            <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <circle className="circle" cx="26" cy="26" r="25" fill="none" />
              <path
                className="check"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                fill="none"
              />
            </svg>
          )}
        </div>
        <h1 className="acknowledgement-title"></h1>
        <p className="acknowledgement-message">{message}</p>
      </div>
    </div>
  );
};
