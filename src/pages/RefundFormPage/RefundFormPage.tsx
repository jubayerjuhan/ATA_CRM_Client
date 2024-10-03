import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import "./RefundFormPage.scss";
import { client } from "@/api/api";
import toast from "react-hot-toast";

export const RefundFormPage: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    mobileNumber: "",
    email: "",
    // photoId: null,
    airline: "",
    ticketNumber: "",
    dateOfTravel: "",
    pnrNumber: "",
    route: "",
    modeOfPayment: "Bank Transfer",
    accountName: "",
    bankName: "",
    bsb: "",
    accountNumber: "",
    acceptance: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleFileChange = (e: any) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     // photoId: e.target.files[0],
  //   }));
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await client.post("/refund", formData);
      setSuccess(true);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
          <h1 className="success-title">{"Refund Request Submitted"}</h1>
          <p className="success-message">
            {"Your refund request has been submitted successfully"}
          </p>
        </div>
      </div>
    );
  }
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label htmlFor="surname">Surname Name *</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="photoId">Photo ID *</label>
              <input
                type="file"
                id="photoId"
                name="photoId"
                onChange={handleFileChange}
                required
              />
            </div> */}
          </>
        );
      case 2:
        return (
          <>
            <h2>Ticket Details</h2>
            <div className="form-group">
              <label htmlFor="airline">Airline *</label>
              <input
                type="text"
                id="airline"
                name="airline"
                value={formData.airline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ticketNumber">Ticket Number *</label>
              <input
                type="text"
                id="ticketNumber"
                name="ticketNumber"
                value={formData.ticketNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfTravel">Date of Travel *</label>
              <input
                type="date"
                id="dateOfTravel"
                name="dateOfTravel"
                value={formData.dateOfTravel}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pnrNumber">PNR Number *</label>
              <input
                type="text"
                id="pnrNumber"
                name="pnrNumber"
                value={formData.pnrNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="route">Route *</label>
              <input
                type="text"
                id="route"
                name="route"
                value={formData.route}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="modeOfPayment">Mode of Payment *</label>
              <select
                id="modeOfPayment"
                name="modeOfPayment"
                value={formData.modeOfPayment}
                onChange={handleInputChange}
                required
              >
                <option value="Bank Transfer">Bank Transfer</option>
                {/* Add other payment options as needed */}
              </select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Bank Details</h2>
            <div className="form-group">
              <label htmlFor="accountName">Account Name *</label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name *</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bsb">BSB *</label>
              <input
                type="text"
                id="bsb"
                name="bsb"
                value={formData.bsb}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Account number *</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="acceptance"
                name="acceptance"
                checked={formData.acceptance}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="acceptance">
                By completing/Submitting and signing this application, you agree
                to the following: "I request a refund for a ticket issued by
                Airways Travel. To my knowledge all the details I provided are
                correct." "Submitting this application gives Airways Travel the
                authority to cancel my tickets."
              </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flight-refund-form">
      <h1>Complete Our Form To Request A Refund For Flights</h1>
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? "active" : ""}`}>
          <span className="step-number">1</span>
          <span className="step-text">Traveler Details</span>
        </div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>
          <span className="step-number">2</span>
          <span className="step-text">Ticket Details</span>
        </div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>
          <span className="step-number">3</span>
          <span className="step-text">Bank Details</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="form-actions">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn btn-secondary"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn btn-primary"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
