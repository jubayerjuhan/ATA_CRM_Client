import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAllFormFields } from "@/services/formField/formField";
import { AppButton, BookingForm } from "@/app_components";
import { AppDispatch, AppState, FormFieldType } from "@/types";

import logo from "../../assets/air_ticket_agency.png";
import successLogo from "../../assets/success-tick.png";

import "./FormPage.scss";
import { addLead } from "@/redux/actions";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CLEAR_ERROR } from "@/constants";
import { useNavigate } from "react-router-dom";

export interface Lead {
  [key: string]: string;
}

export const FormPage = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState<FormFieldType[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(loading, "loading...");

  const dispatch = useDispatch<AppDispatch>();
  const { lead: leadState } = useSelector((state: AppState) => state);

  useEffect(() => {
    fetchAllFormFields();
  }, []);

  const fetchAllFormFields = async () => {
    try {
      setLoading(true);
      const formFieldData = await getAllFormFields();
      setFormFields(formFieldData);
    } catch (error) {
      console.error("Failed to fetch form fields", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (data: Lead) => {
    await dispatch(addLead(data));
  };

  useEffect(() => {
    if (leadState.error?.message) {
      toast.error(leadState.error.message);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [leadState.error?.message, dispatch]);

  return (
    <div className="form-page">
      <img src={logo} alt="ATA Agency Logo" className="form-logo" />

      {leadState.success ? (
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <img src={successLogo} alt="Success Logo" className="w-16 h-16" />
          <p className="mt-4 font-bold text-2xl">Thank You</p>
          <p className="mt-3">Your Form Has Been Submitted Successfully</p>
          <AppButton primary className="mt-8" onClick={() => navigate("/")}>
            Go Home
          </AppButton>
        </div>
      ) : (
        <>
          <div className="form-header">
            <h2>Flight Reservation</h2>
            <p>Fly with us, your journey begins here!. Please fill the form</p>
          </div>
          <BookingForm fields={formFields} onSubmit={handleAddLead} />
        </>
      )}
    </div>
  );
};
