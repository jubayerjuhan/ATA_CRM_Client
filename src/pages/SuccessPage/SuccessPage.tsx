import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SuccessPage.scss";

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  console.log(queryParams);

  const title = queryParams.get("title") || "Lead Added Successfully";
  const message =
    queryParams.get("message") || "You have successfully added a new lead";
  const redirectLink = queryParams.get("redirectLink") || "/form";

  return (
    <div className="success-page">
      <div className="success-content">
        <div className="success-icon">
          <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
            <circle className="circle" cx="26" cy="26" r="25" fill="none" />
            <path
              className="check"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              fill="none"
            />
          </svg>
        </div>
        <h1 className="success-title">{title}</h1>
        <p className="success-message">{message}</p>
        <Link to={redirectLink as string} className="back-button">
          Add Another Lead
        </Link>
      </div>
    </div>
  );
};
