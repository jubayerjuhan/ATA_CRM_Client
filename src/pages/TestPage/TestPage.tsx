import React from "react";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ItineraryEmail } from "@/app_components";

const resend = new Resend("re_PqyvLBVb_9r8ZKb6T164gJkyCNkDgJf76");

export const TestPage: React.FC = () => {
  const sendItineraryEmail = async (email: string, lead: any) => {
    email = "dropshipninja23@gmail.com";

    const htmlContent = await render(
      <ItineraryEmail
        name={lead.name}
        airline="Your Airline"
        confirmationNumber={lead.confirmationNumber}
        date={lead.date}
        flightNumber={lead.flightNumber}
        departureTime={lead.departureTime}
        departureCity={lead.departureCity}
        arrivalTime={lead.arrivalTime}
        arrivalCity={lead.arrivalCity}
        seatNumber={lead.seatNumber}
        duration={lead.duration}
        aircraftType={lead.aircraftType}
      />
    );

    try {
      const data = await resend.emails.send({
        from: "ATA CRM <onboarding@resend.dev>",
        to: [email],
        subject: "Flight Itinerary",
        html: htmlContent, // Rendered HTML
      });
      console.log(data, "Email sent successfully");
    } catch (error) {
      console.log(error, "Error sending email");
    }
  };

  const handleSendEmail = () => {
    const lead = {
      name: "John Doe",
      confirmationNumber: "ABC123",
      date: "2023-10-01",
      flightNumber: "XY123",
      departureTime: "10:00 AM",
      departureCity: "New York",
      arrivalTime: "1:00 PM",
      arrivalCity: "Los Angeles",
      seatNumber: "12A",
      duration: "3h",
      aircraftType: "Boeing 737",
    };
    sendItineraryEmail("dropshipninja23@gmail.com", lead);
  };

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={handleSendEmail}>Send Itinerary Email</button>
    </div>
  );
};
