import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { AirportSelector, DatePicker } from "@/app_components";
import { PhoneInput } from "@/app_components/PhoneInput/PhoneInput";

import { AppDispatch, AppState, LeadType } from "@/types";
import { addLead, editLead } from "@/redux/actions";
import { CLEAR_ERROR } from "@/constants";

import "./FormComponent.scss";
import type { E164Number } from "libphonenumber-js";

export const ClientFormPage = () => {
  const [formPart, setFormPart] = useState(1);
  const { lead: leadState } = useSelector((state: AppState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (leadState.error?.message) {
      toast.error(leadState.error.message);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [leadState.error?.message, dispatch]);

  const onSubmitPartOne = async (data: any) => {
    try {
      await dispatch(
        addLead({ ...data, leadOrigin: "Website Form" } as LeadType)
      );

      console.log(leadState.insertedLeadId, "inserted lead id");

      setFormPart(2);
      window.scrollTo(0, 0);

      toast.success(
        "Lead information saved. Please complete the journey details."
      );
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Failed to save lead information. Please try again.");
    }
  };

  const onSubmitPartTwo = async (data: any) => {
    if (!leadState.insertedLeadId) {
      toast.error("Lead ID not found. Please start over.");
      return;
    }

    try {
      await dispatch(
        editLead({ _id: leadState.insertedLeadId, ...data } as LeadType)
      );
      const queryParams = new URLSearchParams({
        title: "Lead Updated Successfully",
        message: `Name: ${data.firstName} ${data.lastName}`,
        redirectLink: "/form",
      }).toString();
      navigate(`/lead-success?${queryParams}`);
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Failed to update lead information. Please try again.");
    }
  };

  console.log(formPart, "Form Part");
  return (
    <>
      <div className="client-form-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="form-container"
        >
          <h1 className="form-title">
            {formPart === 1 ? "Passenger Details" : "Journey Information"}
          </h1>
          <form
            onSubmit={handleSubmit(
              formPart === 1 ? onSubmitPartOne : onSubmitPartTwo
            )}
          >
            {formPart === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="form-part"
              >
                <div className="form-group">
                  <label>Passenger Type</label>
                  <select
                    {...register("passengerType", {
                      required: "Passenger Type is required",
                    })}
                  >
                    <option value="">Select</option>
                    <option value="New">New</option>
                    <option value="Returning">Returning</option>
                    <option value="VIP">VIP</option>
                    <option value="Frequent Flyer">Frequent Flyer</option>
                    <option value="Business">Business</option>
                    <option value="Economy">Economy</option>
                    <option value="First Class">First Class</option>{" "}
                  </select>
                  {errors.passengerType && (
                    <span className="error-message">
                      {errors.passengerType.message as string}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Lead Type <span className="required">*</span>
                  </label>
                  <select
                    {...register("leadType", {
                      required: "Lead Type is required",
                    })}
                  >
                    <option value="">Select</option>
                    <option value="Cold">Cold</option>
                    <option value="Warm">Warm</option>
                    <option value="Hot">Hot</option>
                  </select>
                  {errors.leadType && (
                    <span className="error-message">
                      {errors.leadType.message as string}
                    </span>
                  )}
                </div>
                <div className="name-input-container">
                  <div className="form-group name-input-group">
                    <label className="name-input-label">
                      First Name <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="name-input full-width"
                      type="text"
                      placeholder="Enter First Name"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                    />
                    {errors.firstName && (
                      <span className="name-input-error">
                        {errors.firstName.message as string}
                      </span>
                    )}
                  </div>
                  <div className="form-group name-input-group">
                    <label className="name-input-label">
                      Last Name <span className="required-asterisk">*</span>
                    </label>
                    <input
                      className="name-input full-width"
                      type="text"
                      placeholder="Enter Last Name"
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                    />
                    {errors.lastName && (
                      <span className="name-input-error">
                        {errors.lastName.message as string}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Phone Number <span className="required">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone Number is required" }}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        defaultCountry="AU"
                        value={value}
                        onChange={(phone: E164Number | undefined) =>
                          onChange(phone || "")
                        }
                      />
                    )}
                  />
                  {errors.phone && (
                    <span className="error-message">
                      {errors.phone.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error-message">
                      {errors.email.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Address here"
                    {...register("address")}
                  />
                </div>
              </motion.div>
            )}

            {formPart === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="form-part"
              >
                <AirportSelector
                  label="Departure Airport"
                  name="departure"
                  register={register}
                  setValue={setValue}
                  required
                />
                <AirportSelector
                  label="Arrival Airport"
                  name="arrival"
                  register={register}
                  setValue={setValue}
                  required
                />

                <div className="form-group">
                  <label>Preferred Airlines</label>
                  <input
                    type="text"
                    {...register("airlinesCode")}
                    placeholder="Enter Preferred Airlines"
                  />
                  {errors.airlinesCode && (
                    <span className="error-message">
                      {errors.airlinesCode.message as string}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <DatePicker
                    required
                    label="Travel Date"
                    name="travelDate"
                    style={{ height: "50px" }}
                    onDateChange={(date) => setValue("travelDate", date)}
                  />
                  {errors.travelDate && (
                    <span className="error-message">
                      {errors.travelDate.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <DatePicker
                    required
                    label="Return Date"
                    name="returnDate"
                    style={{ height: "50px" }}
                    onDateChange={(date) => setValue("returnDate", date)}
                  />
                  {errors.returnDate && (
                    <span className="error-message">
                      {errors.returnDate.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Adult <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={1}
                    {...register("adult", { required: "Adult is required" })}
                  />
                  {errors.adult && (
                    <span className="error-message">
                      {errors.adult.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Child <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={0}
                    {...register("child", { required: "Child is required" })}
                  />
                  {errors.child && (
                    <span className="error-message">
                      {errors.child.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Infant <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={0}
                    {...register("infant", {
                      required: "Infant is required",
                    })}
                  />
                  {errors.infant && (
                    <span className="error-message">
                      {errors.infant.message as string}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Case Date <span className="required">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    {...register("caseDate", {
                      required: "Case Date is required",
                    })}
                  />
                  {errors.caseDate && (
                    <span className="error-message">
                      {errors.caseDate.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>Quoted Amount</label>
                  <input
                    type="text"
                    placeholder="Quoted here"
                    {...register("quotedAmount")}
                  />
                </div>
                <div className="form-group">
                  <label>Next Follow-up Date</label>
                  <input type="date" {...register("followUpDate")} />
                </div>
                <div className="form-group">
                  <label>Comments</label>
                  <textarea placeholder="Comments" {...register("comments")} />
                </div>
              </motion.div>
            )}

            <div className="form-actions">
              <Button type="submit">
                {formPart === 1 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};
