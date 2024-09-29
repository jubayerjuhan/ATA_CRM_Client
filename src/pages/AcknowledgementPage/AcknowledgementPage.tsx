import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import "./AcknowledgementPage.scss";
import toast from "react-hot-toast";
import { client } from "@/api/api";
import {
  Calendar,
  CreditCard,
  DollarSign,
  LocateIcon,
  MapPin,
  Plane,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { AppDispatch, AppState } from "@/types";
import { useDispatch } from "react-redux";
import { getSingleLead } from "@/redux/actions";
import { useSelector } from "react-redux";
import { convertPNR } from "@/utils";
import moment from "moment";

type FlightTicket = {
  id: string;
  from: string;
  to: string;
  date: string;
  passengerName: string;
  price: number;
  flightNumber: string;
};

type Invoice = {
  bookingReference: string;
  passengerName: string;
  tickets: FlightTicket[];
};

type PaymentMethod = "stripe" | "cash" | "slicepay";

export const AcknowledgementPage: React.FC = () => {
  const { lead } = useSelector((state: AppState) => state.lead);
  const [flights, setFlights] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const leadId = queryParams.get("leadId");
  if (!leadId) {
    toast.error("Lead ID not found");
  }

  const navigate = useNavigate();

  useEffect(() => {
    const sendPaymentMethodSelectionEmail = async (leadId: string | null) => {
      await client.post(`/payment/${leadId}/send-payment-email`);
    };

    if (leadId) {
      sendPaymentMethodSelectionEmail(leadId);
    }
  }, [leadId]);

  const getFlightFromPNR = async (pnr: string) => {
    const flights = await convertPNR(pnr);
    console.log(flights);

    setFlights(flights);
  };

  useEffect(() => {
    if (leadId) {
      dispatch(getSingleLead(leadId));
    }
  }, [dispatch, leadId]);

  useEffect(() => {
    if (lead) {
      getFlightFromPNR(lead.pnr as string);
    }
  }, [lead]);

  const [invoice] = useState<Invoice>({
    bookingReference: "BK123456",
    passengerName: "John Doe",
    tickets: [
      {
        id: "1",
        from: "New York (JFK)",
        to: "London (LHR)",
        date: "2024-10-15",
        passengerName: "John Doe",
        price: 599.99,
        flightNumber: "BA1234",
      },
      {
        id: "2",
        from: "London (LHR)",
        to: "Paris (CDG)",
        date: "2024-10-20",
        passengerName: "Jane Doe",
        price: 199.99,
        flightNumber: "AF5678",
      },
    ],
  });

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );

  const handlePayment = (method: PaymentMethod) => {
    setSelectedPayment(method);

    if (method === "stripe" && lead) {
      // Redirect to Stripe payment page
      window.open(lead.stripe_payment_link as string);
    }
  };

  const totalPrice = invoice.tickets.reduce(
    (sum, ticket) => sum + ticket.price,
    0
  );

  return (
    <div style={{ minWidth: "100vh" }}>
      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-2xl font-bold text-indigo-600">Invoice</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                ${lead?.quoted_amount.total.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Total Price</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 mr-2 text-indigo-500" />
              <p className="font-semibold">
                {lead?.firstName} {lead?.lastName}
              </p>
            </div>
            <p className="text-sm text-gray-500">Main Passenger</p>
          </div>

          {flights.map((flight, index) => (
            <div key={index} className="border-t border-gray-200 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-indigo-500" />
                  <div>
                    <p className="font-semibold">
                      {flight.flt.iatacode}
                      {flight.flt.flightNo}
                    </p>
                    <p className="text-sm text-gray-500">Flight Number</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                  <div>
                    <p className="font-semibold">{flight.dep.airportname}</p>
                    <p className="text-sm text-gray-500">From</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                  <div>
                    <p className="font-semibold">{flight.arr.airportname}</p>
                    <p className="text-sm text-gray-500">To</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                  <div>
                    <p className="font-semibold">
                      {moment(
                        flight.flt.departure.string,
                        "YYYY-MM-DD HH:mm"
                      ).format("DD-MM-YYYY HH:mm")}
                    </p>
                    <p className="text-sm text-gray-500">Date</p>
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-500" />
                  <div>
                    <p className="font-semibold">{ticket.passengerName}</p>
                    <p className="text-sm text-gray-500">Passenger</p>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Select Payment Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handlePayment("stripe")}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300"
            >
              <CreditCard size={20} />
              <span>Pay with Stripe</span>
            </button>
            <button
              onClick={() => handlePayment("cash")}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
            >
              <DollarSign size={20} />
              <span>Pay with Cash</span>
            </button>
            <button
              onClick={() => handlePayment("slicepay")}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
            >
              <Wallet size={20} />
              <span>Pay with SlicePay</span>
            </button>
          </div>
        </div>

        {/* {selectedPayment && (
        <Alert className="mt-6 bg-indigo-100 border-indigo-200">
          <AlertTitle className="text-indigo-800">Payment Initiated</AlertTitle>
          <AlertDescription className="text-indigo-700">
            You have selected to pay ${totalPrice.toFixed(2)} with{" "}
            {selectedPayment}. Please proceed with the payment process.
          </AlertDescription>
        </Alert>
      )} */}
      </div>
    </div>
  );
};
