import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import "./PaymentMethodSelect.scss";

export const PaymentMethodSelectPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  console.log(queryParams);

  const title = queryParams.get("title") || "Lead Added Successfully";
  const message =
    queryParams.get("message") || "You have successfully added a new lead";
  const redirectLink = queryParams.get("redirectLink") || "/form";

  const navigate = useNavigate();

  return (
    <div className="payment_method_selector-page">
      <div className="payment_method_selector-content">
        <div className="payment_method_selector-icon">
          <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
            <circle className="circle" cx="26" cy="26" r="25" fill="none" />
            <path
              className="check"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              fill="none"
            />
          </svg>
        </div>
        <h1 className="payment_method_selector-title">{title}</h1>
        <p className="payment_method_selector-message">{message}</p>
        <div className="flex gap-4 flex-col">
          <Button variant={"outline"} onClick={() => navigate(redirectLink)}>
            Add Another Lead
          </Button>
          <Button variant={"default"} onClick={() => navigate("/dashboard")}>
            Return To Home
          </Button>
        </div>
      </div>
    </div>
  );
};