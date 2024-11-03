import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./AcknowledgementPage.scss";
import toast from "react-hot-toast";
import { client } from "@/api/api";
import {
  Calendar,
  CreditCard,
  Landmark,
  MapPin,
  Plane,
  Users,
  Wallet,
} from "lucide-react";
import { AppDispatch, AppState } from "@/types";
import { useDispatch } from "react-redux";
import { getSingleLead } from "@/redux/actions";
import { useSelector } from "react-redux";
import { convertPNR } from "@/utils";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type PaymentMethod = "mintpay" | "bank" | "slicepay";

export const AcknowledgementPage: React.FC = () => {
  const { lead } = useSelector((state: AppState) => state.lead);
  const [flights, setFlights] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const leadId = queryParams.get("leadId");
  if (!leadId) {
    toast.error("Lead ID not found");
  }

  const sendPaymentMethodSelectionEmail = async (leadId: string | null) => {
    await client.post(`/payment/${leadId}/send-payment-email`);
  };

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
    if (lead && !lead.selectedPaymentMethod) {
      getFlightFromPNR(lead.pnr as string);
    }
  }, [lead]);

  const handlePayment = async (method: PaymentMethod) => {
    setDialogOpen(true);
    setSelectedPaymentMethod(method);
  };

  useEffect(() => {}, []);

  const updatePaymentMethod = async () => {
    if (!lead) return toast.error("Lead not found");
    // if (selectedPaymentMethod === "stripe" && lead) {
    //   // Redirect to Stripe payment page
    //   if (!lead.stripe_payment_link) {
    //     toast.error("Stripe payment link not found");
    //     return;
    //   }
    //   window.open(lead.stripe_payment_link as string);
    // } else {
    //   if (leadId && !lead?.selectedPaymentMethod) {
    //     sendPaymentMethodSelectionEmail(leadId);
    //   }
    //   await updateSelectedPaymentMethod(selectedPaymentMethod as string);
    // }

    switch (selectedPaymentMethod) {
      case "mintpay":
        window.open(`/mintpay-payment-page/${leadId}`);
        break;
      case "bank":
        if (leadId) {
          sendPaymentMethodSelectionEmail(leadId);
        }
        await updateSelectedPaymentMethod(selectedPaymentMethod as string);
        break;

      case "slicepay":
        if (!lead.stripe_payment_link) {
          toast.error("Slicepay payment link not found");
          return;
        }
        window.open(lead.stripe_payment_link as string);
        break;
      default:
        break;
    }
  };

  const updateSelectedPaymentMethod = async (method: string) => {
    try {
      await client.put(`/leads/${leadId}/select-payment-method`, {
        selectedPaymentMethod: method,
      });

      toast.success("Payment method selected successfully");
      dispatch(getSingleLead(leadId as string));
    } catch (error) {
      toast.error("Failed to update payment method");
    }
  };

  useEffect(() => {
    sendAcknowledgementEmail(leadId);
  }, [leadId]);

  const sendAcknowledgementEmail = async (leadId: string | null) => {
    await client.post(`/email/send-acknowledgement-email`, {
      leadId,
    });
  };

  if (lead?.selectedPaymentMethod || lead?.converted) {
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
          <h1 className="success-title">
            Your Payment Method Has Been Selected
          </h1>
          <p className="success-message">
            Thank you for selecting your payment method. Our agent will reach
            out with you shortly
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <AlertDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send response to the agent
            </AlertDialogDescription>
            {selectedPaymentMethod === "bank" && (
              <div className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-[0_0px_5px_0px_rgba(0,0,0,0.1),0_0px_1px_0px_rgba(0,0,0,0.1)]">
                <h3 className="text-xl font-semibold text-gray-800">
                  Bank Account Details
                </h3>
                <p className="text-sm text-gray-600 mt-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  Please transfer the amount to the following bank account and
                  press <span className="font-bold">Continue</span>:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <span className="font-semibold w-40">Bank Name:</span>
                    <span>Commonwealth Bank of Australia</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-40">Account Name:</span>
                    <span>ATA CRM Pty Ltd</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-40">BSB:</span>
                    <span>062-000</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-40">Account Number:</span>
                    <span>12345678</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold w-40">SWIFT Code:</span>
                    <span>CTBAAU2S</span>
                  </li>
                </ul>
              </div>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={updatePaymentMethod}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

        {!lead?.selectedPaymentMethod && lead?.quoted_amount.total && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Select Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handlePayment("slicepay")}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300"
              >
                <CreditCard size={20} />
                <span>Pay with SlicePay</span>
              </button>
              <button
                onClick={() => handlePayment("bank")}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
              >
                <Landmark size={20} />
                <span>Pay with Bank</span>
              </button>
              <button
                onClick={() => handlePayment("mintpay")}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
              >
                <Wallet size={20} />
                <span>Pay with MintPay</span>
              </button>
            </div>
          </div>
        )}
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
