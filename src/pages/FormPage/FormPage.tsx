import { useEffect, useState } from "react";

import { getAllFormFields } from "@/services/formField/formField";
import { BookingForm } from "@/app_components";
import { FormFieldType } from "@/types";

import logo from "../../assets/air_ticket_agency.png";

import "./FormPage.scss";

export const FormPage = () => {
  const [formFields, setFormFields] = useState<FormFieldType[]>([]);
  const [loading, setLoading] = useState(false);

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
  return (
    <div className="form-page">
      <img src={logo} alt="ATA Agency Logo" className="form-logo" />
      <div className="form-header">
        <h2>Flight Reservation</h2>
        <p>Fly with us, your journey begins here!. Please fill the form</p>
      </div>
      <BookingForm fields={formFields} />
    </div>
  );
};
