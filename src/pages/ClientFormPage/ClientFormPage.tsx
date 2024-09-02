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

export const ClientFormPage = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const dispatch = useDispatch<AppDispatch>();
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
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="section">
        <h2 className="section-title">Passenger Details</h2>
        <div className="form-group">
          <label>Passenger Type</label>
          <select {...register("passengerName")}>
            <option value="New">New</option>
            {/* Add other options */}
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
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
            <label>Last Name</label>
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
            <label>Phone Number</label>
            <input
              type="phone"
              placeholder="Enter Phone Number"
              {...register("phone", { required: "Phone Number Is Required" })}
            />
            {errors.phone && (
              <span className="error-message">
                {errors.phone.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
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
              {...register("postCode", { required: "Post Code is required" })}
            />
            {errors.postCode && (
              <span className="error-message">
                {errors.postCode.message as string}
              </span>
            )}
          </div>
        </div>
      </div>

      <hr />

      <div className="section">
        <h2 className="section-title">Call Log Details</h2>
        <div className="form-row">
          <div className="form-group">
            <label>
              Call Type <span>*</span>
            </label>
            <select
              {...register("callType", { required: "Call Type is required" })}
            >
              <option value="">Select</option>
              <option value="Inbound">Inbound</option>
              <option value="Outbound">Outbound</option>
              <option value="Missed">Missed</option>
            </select>
            {errors.callType && (
              <span className="error-message">
                {errors.callType.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input type="datetime-local" {...register("dateTime")} />
          </div>
          <div className="form-group">
            <label>
              Call For <span>*</span>
            </label>
            <select
              {...register("callFor", { required: "Call For is required" })}
            >
              <option value="">Select</option>
              <option value="Existing">Existing</option>
              <option value="Returning">Returning</option>
              <option value="VIP">VIP</option>
              {/* Add other options */}
            </select>
            {errors.callFor && (
              <span className="error-message">
                {errors.callFor.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Departure <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Departure City Name"
              {...register("departure", { required: "First Name is required" })}
            />
            {errors.departure && (
              <span className="error-message">
                {errors.departure.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Arrival <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Arrival City Name"
              {...register("arrival", { required: "First Name is required" })}
            />
            {errors.arrival && (
              <span className="error-message">
                {errors.arrival.message as string}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Airlines Code <span>*</span>
            </label>
            <select
              {...register("airlinesCode", {
                required: "Airlines Code is required",
              })}
            >
              <option value="">Select</option>
              <option value="AA">American Airlines</option>
              <option value="UA">United Airlines</option>
              <option value="DL">Delta Airlines</option>
            </select>
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
              Travel Date <span>*</span>
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
            <label>Adult</label>
            <input type="number" defaultValue={1} {...register("adult")} />
          </div>
          <div className="form-group">
            <label>Child</label>
            <input type="number" defaultValue={0} {...register("child")} />
          </div>
          <div className="form-group">
            <label>Infant</label>
            <input type="number" defaultValue={0} {...register("infant")} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Case Date</label>
            <input type="datetime-local" {...register("caseDate")} />
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
              Lead Type <span>*</span>
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
            <label>
              Next Follow-up Date <span>*</span>
            </label>
            <input
              type="date"
              {...register("followUpDate", {
                required: "Next Follow-up Date is required",
              })}
            />
            {errors.followUpDate && (
              <span className="error-message">
                {errors.followUpDate.message as string}
              </span>
            )}
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
