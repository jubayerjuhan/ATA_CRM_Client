import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./FormComponent.scss";
import { Button } from "@/components/ui/button";
import { AppDispatch, AppState, LeadType } from "@/types";
import { useDispatch } from "react-redux";
import { addLead } from "@/redux/actions";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CLEAR_ERROR } from "@/constants";
import { AirportSelector } from "@/app_components";
import { useNavigate } from "react-router-dom";

export const ClientFormPage = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (leadState.error?.message) {
      toast.error(leadState.error.message);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [leadState.error?.message, dispatch]);

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    await dispatch(addLead(data as LeadType));

    const queryParams = new URLSearchParams({
      title: "Lead Added Successfully",
      message: `Name: ${data.firstName} ${data.lastName}`,
      redirectLink: "/form",
    }).toString();

    navigate(`/lead-success?${queryParams}`);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="section">
        <h2 className="section-title">Passenger Details</h2>
        <div className="form-group">
          <label>
            Passenger Type <span className="required">*</span>
          </label>
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
            <option value="First Class">First Class</option>
          </select>
          {errors.passengerType && (
            <span className="error-message">
              {errors.passengerType.message as string}
            </span>
          )}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <span className="error-message">
                {errors.firstName.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <span className="error-message">
                {errors.lastName.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              {...register("phone", { required: "Phone Number is required" })}
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
            <label>Post Code</label>
            <input
              type="text"
              placeholder="Post code here"
              {...register("postCode")}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="section">
        <h2 className="section-title">Call Log Details</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Call Type</label>
            <select {...register("callType")}>
              <option value="">Select</option>
              <option value="Inbound">Inbound</option>
              <option value="Outbound">Outbound</option>
              <option value="Missed">Missed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input type="datetime-local" {...register("dateTime")} />
          </div>
          <div className="form-group">
            <label>Call For</label>
            <input type="text" {...register("callFor")} />
          </div>
        </div>
        <div className="form-row">
          <AirportSelector
            label="Departure"
            name="departure"
            register={register}
            errorMessage={errors.departure?.message as string}
            required
          />
          <AirportSelector
            label="Arrival"
            name="arrival"
            register={register}
            errorMessage={errors.arrival?.message as string}
            required
          />
          <div className="form-group">
            <label>
              Airlines Code <span className="required">*</span>
            </label>
            <input
              type="text"
              {...register("airlinesCode", {
                required: "Airlines Code is required",
              })}
            />
            {errors.airlinesCode && (
              <span className="error-message">
                {errors.airlinesCode.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>PNR</label>
            <input
              type="text"
              placeholder="PNR code here"
              {...register("pnr")}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Travel Date <span className="required">*</span>
            </label>
            <input
              type="date"
              {...register("travelDate", {
                required: "Travel Date is required",
              })}
            />
            {errors.travelDate && (
              <span className="error-message">
                {errors.travelDate.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Return Date</label>
            <input type="date" {...register("returnDate")} />
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
              {...register("infant", { required: "Infant is required" })}
            />
            {errors.infant && (
              <span className="error-message">
                {errors.infant.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Case Date <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              {...register("caseDate", { required: "Case Date is required" })}
            />
            {errors.caseDate && (
              <span className="error-message">
                {errors.caseDate.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Quoted</label>
            <input
              type="text"
              placeholder="Quoted here"
              {...register("quoted")}
            />
          </div>
          <div className="form-group">
            <label>
              Lead Type <span className="required">*</span>
            </label>
            <select
              {...register("leadType", { required: "Lead Type is required" })}
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
          <div className="form-group">
            <label>Next Follow-up Date</label>
            <input type="date" {...register("followUpDate")} />
          </div>
        </div>
        <div className="form-group">
          <label>Comments</label>
          <textarea placeholder="Comments" {...register("comments")} />
        </div>
      </div>
      <Button type="submit" style={{ width: "100%" }}>
        Submit
      </Button>
    </form>
  );
};
