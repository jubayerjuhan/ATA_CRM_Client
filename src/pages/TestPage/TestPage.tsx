import React from "react";

import "./TestPage.css";

export const TestPage = () => {
  return (
    <div className="itinerary-email">
      <div className="header">
        <div className="logo">AIRLINE</div>
        <div>Flight Itinerary for [Passenger Name]</div>
      </div>
      <div className="confirmation">
        <h2>Thank you for choosing [Airline Name].</h2>
        <p>Your reservation is confirmed.</p>
        <p>Confirmation Number: [Confirmation Number]</p>
      </div>
      <div className="flight">
        <div className="flight-header">
          <div className="date">[Date]</div>
          <div>Flight: [Flight Number]</div>
        </div>
        <div className="flight-details">
          <div className="departure">
            <div className="time">[Departure Time]</div>
            <div>[Departure City (Code)]</div>
          </div>
          <div className="arrival">
            <div className="time">[Arrival Time]</div>
            <div>[Arrival City (Code)]</div>
          </div>
        </div>
        <div>
          <p>Seat Assignment: [Seat Number]</p>
          <p>Travel Time: [Duration]</p>
          <p>Aircraft: [Aircraft Type]</p>
        </div>
      </div>
      <button className="button">I Acknowledge This Booking</button>
      <p>
        Please do not reply to this e-mail, as it cannot be answered from this
        address.
      </p>
      <p>
        For changes (which may result in a change fee) or questions about your
        reservation, you may contact [Airline] Support via telephone at [Phone
        Number].
      </p>
    </div>
  );
};
