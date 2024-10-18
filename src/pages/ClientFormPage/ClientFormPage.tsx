import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import {
  AirlineSelector,
  AirportSelector,
  DatePicker,
  SearchExistingLeadPopup,
} from "@/app_components";
import { PhoneInput } from "@/app_components/PhoneInput/PhoneInput";

import { AppDispatch, AppState, LeadType } from "@/types";
import { addLead } from "@/redux/actions";
import { CLEAR_ERROR } from "@/constants";

import type { E164Number } from "libphonenumber-js";
import { client } from "@/api/api";

import "./FormComponent.scss";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const ClientFormPage = () => {
  const location = useLocation();
  const leadData = location.state?.leadData;

  const { lead: leadState } = useSelector((state: AppState) => state);
  const [airlines, setAirlines] = useState<any[]>([]);
  const [airlinesLoading, setAirlinesLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [airlinesSearchKeyword, setAirlinesSearchKeyword] = useState("");
  const [formPart, setFormPart] = useState(1);
  const [userSearchingEmail, setUserSearchingEmail] = useState<string | null>(
    leadData?.email ? leadData?.email : null
  );

  const [tripType, setTripType] = useState("One Way");
  const [showExistingLeadPopup, setShowExistingLeadPopup] = useState(true);

  useEffect(() => {
    if (leadData) {
      setValue("firstName", leadData.firstName);
      setValue("lastName", leadData.lastName);
      setValue("phone", `+61${leadData.phone}`);
      setValue("email", leadData.email);
      setValue("postCode", leadData.postCode);
    }
  }, [leadData, setValue]);

  useEffect(() => {
    if (leadState.error?.message) {
      toast.error(leadState.error.message);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [leadState.error?.message, dispatch]);

  // Search Airlines by keyword
  useEffect(() => {
    if (airlinesSearchKeyword.length < 3) return;
    const searchAirlines = async () => {
      setAirlinesLoading(true);
      const response = await client.get("/airlines", {
        params: { search: airlinesSearchKeyword },
      });
      setAirlines(response.data);
      setAirlinesLoading(false);
    };

    if (airlinesSearchKeyword) {
      searchAirlines();
    }
  }, [airlinesSearchKeyword]);

  useEffect(() => {
    const subscription = watch((value) => {
      setTripType(value.tripType);

      if (value.tripType === "One Way") {
        setValue("returnDate", null);
      }

      if (value.email) {
        const validEmail = isValidEmail(value.email);
        if (validEmail) {
          setUserSearchingEmail(value.email);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmitPartOne = async (data: any) => {
    try {
      await dispatch(addLead({ ...data }));

      console.log(leadState.insertedLeadId, "inserted lead id");

      setFormPart(2);

      toast.success(
        "Lead information saved. Please complete the journey details."
      );
      setShowExistingLeadPopup(false);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Failed to save lead information. Please try again.");
    }
  };

  console.log(watch("airlinesCode"), "watch airlines code");

  const onSubmitPartTwo = async (data: any) => {
    if (data.returnDate && data.returnDate < data.travelDate) {
      toast.error("Return date cannot be before travel date.");
      return;
    }
    // Added Logs With Leads
    const leadWithLogs = {
      ...data,
      call_logs: data.notes
        ? [
            {
              dateTime: moment().toISOString(),
              notes: data.notes,
            },
          ]
        : [],
    };

    if (!leadState.insertedLeadId) {
      toast.error("Lead ID not found. Please start over.");
      return;
    }

    try {
      await client.put(`/leads/${leadState.insertedLeadId}`, leadWithLogs);

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

  const onExistingLeadAdd = (lead: LeadType | null) => {
    setValue("firstName", lead?.firstName || "");
    setValue("lastName", lead?.lastName || "");
    setValue("phone", lead?.phone || "");
    setValue("email", lead?.email || "");
    setValue("postCode", lead?.postCode || "");
  };

  return (
    <>
      <IoChevronBackCircleOutline
        className="back-icon"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="client-form-page">
        {showExistingLeadPopup && (
          <SearchExistingLeadPopup
            email={userSearchingEmail}
            onAdd={onExistingLeadAdd}
          />
        )}
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
                  <label>Lead Origin</label>
                  <select
                    {...register("leadOrigin", {
                      required: "Lead Origin is required",
                    })}
                  >
                    <option value="">Select</option>
                    <option value="Call">Call</option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.passengerType && (
                    <span className="error-message">
                      {errors.passengerType.message as string}
                    </span>
                  )}
                </div>
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
                  <label>Post Code</label>
                  <input
                    type="text"
                    placeholder="Post Code here"
                    {...register("postCode")}
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
                <div className="form-group">
                  <label>Call For</label>
                  <select
                    {...register("callFor", {
                      required: "Call For is required",
                    })}
                  >
                    <option value="Flights">Flights</option>
                    <option value="Hotels">Hotels</option>
                    <option value="Packages">Packages</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                  {errors.callFor && (
                    <span className="error-message">
                      {errors.callFor.message as string}
                    </span>
                  )}
                </div>
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
                <AirlineSelector
                  label="Preferred Airline"
                  name="airline"
                  register={register}
                  setValue={setValue}
                  required
                />

                {/* One way or two way */}
                <div className="form-group">
                  <label>Trip Type</label>
                  <select
                    {...register("tripType", {
                      required: "Trip Type is required",
                    })}
                  >
                    <option value="One Way">One Way</option>
                    <option value="Round Trip">Round Trip</option>
                  </select>
                  {errors.tripType && (
                    <span className="error-message">
                      {errors.tripType.message as string}
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

                {tripType === "Round Trip" && (
                  <div className="form-group">
                    <DatePicker
                      required
                      label="Return Date"
                      name="returnDate"
                      style={{ height: "50px" }}
                      onDateChange={(date) => {
                        setValue("returnDate", date);
                        if (date && date < watch("travelDate")) {
                          toast.error(
                            "Return date cannot be before travel date."
                          );
                        }
                      }}
                    />
                    {watch("returnDate") < watch("travelDate") && (
                      <span className="error-message">
                        Return date cannot be before travel date.
                      </span>
                    )}
                  </div>
                )}
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
                  <label>Notes</label>
                  <textarea placeholder="Notes" {...register("notes")} />
                </div>
              </motion.div>
            )}

            <div className="form-actions">
              <Button type="submit" disabled={leadState.loading}>
                {formPart === 1 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};
