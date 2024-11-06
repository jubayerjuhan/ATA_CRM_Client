import { useState } from "react";
import { useEffect } from "react";
import { CreditCard, Plane, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import logo from "../../assets/air_ticket_agency.png";
import { client } from "@/api/api";
import { LeadType } from "@/types";
import moment from "moment";
import toast from "react-hot-toast";

type PaymentFormData = {
  cardHolder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
};

export function MintpayPaymentPage() {
  const [lead, setLead] = useState<null | LeadType>(null);
  const { leadId } = useParams<{ leadId: string }>();
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<PaymentFormData>({
    mode: "onChange",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    setValue("cardNumber", formattedValue);
  };

  const onSubmit = async (data: PaymentFormData) => {
    setIsLoading(true);
    const cardDetails = {
      card_number: data.cardNumber.replace(/\s/g, ""),
      expiry_month: data.expiryMonth,
      expiry_year: data.expiryYear.slice(-2),
      cvc: data.cvv,
      cardholder_name: data.cardHolder,
    };
    const paymentData = {
      leadId,
      cardDetails,
    };

    try {
      const { data } = await client.post(
        `/payment/mint-pay/process-3ds`,
        paymentData
      );
      console.log("Payment processed successfully:", data);
      setIsLoading(false);

      // Redirect to the auth URL
      console.log(data, "data");
      // window.location.href = data.auth_url;
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const { data } = await client.get(`/leads/${leadId}`);
        setLead(data.lead);
      } catch (error) {
        console.error("Error fetching lead details:", error);
      }
    };

    fetchLeadDetails();
  }, [leadId]);

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <img
            src={logo}
            alt="Air Ticket Agency Logo"
            className="mx-auto w-32 h-auto mb-6"
          />
          <p className="text-xl text-gray-600">
            Please enter your payment details to complete the booking
          </p>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl mb-2">
                    Payment Details
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-md">
                    Enter your card information securely
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-6 gap-6"
                  >
                    <div className="col-span-6 sm:col-span-3">
                      <Label
                        htmlFor="cardHolder"
                        className="text-sm font-medium"
                      >
                        Card Holder Name
                      </Label>
                      <Input
                        id="cardHolder"
                        placeholder="John Doe"
                        className={`mt-1 transition-colors focus:ring-2 focus:ring-blue-500 ${
                          errors.cardHolder ? "border-red-500" : ""
                        }`}
                        {...register("cardHolder", {
                          required: "Card holder name is required",
                          pattern: {
                            value: /^[a-zA-Z\s]*$/,
                            message: "Please enter a valid name",
                          },
                        })}
                      />
                      {errors.cardHolder && (
                        <p className="text-red-500 mt-2 text-sm">
                          {errors.cardHolder.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Label
                        htmlFor="cardNumber"
                        className="text-sm font-medium"
                      >
                        Card Number
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          maxLength={19}
                          className={`pr-10 transition-colors focus:ring-2 focus:ring-blue-500 ${
                            errors.cardNumber ? "border-red-500" : ""
                          }`}
                          {...register("cardNumber", {
                            onChange: handleCardNumberChange,
                            required: "Card number is required",
                            pattern: {
                              value: /^[\d\s]{19}$/,
                              message:
                                "Please enter a valid 16-digit card number",
                            },
                          })}
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-500" />
                      </div>
                      {errors.cardNumber && (
                        <p className="text-red-500 mt-2 text-sm">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <Label
                        htmlFor="expiryMonth"
                        className="text-sm font-medium"
                      >
                        Expiry Month
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("expiryMonth", value)
                        }
                      >
                        <SelectTrigger
                          id="expiryMonth"
                          className={`mt-1 ${
                            errors.expiryMonth ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <SelectItem
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      {errors.expiryMonth && (
                        <p className="text-red-500 mt-2 text-sm">
                          {errors.expiryMonth.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <Label
                        htmlFor="expiryYear"
                        className="text-sm font-medium"
                      >
                        Expiry Year
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("expiryYear", value)}
                      >
                        <SelectTrigger
                          id="expiryYear"
                          className={`mt-1 ${
                            errors.expiryYear ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 10 },
                            (_, i) => new Date().getFullYear() + i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.expiryYear && (
                        <p className="text-red-500 mt-2 text-sm">
                          {errors.expiryYear.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <Label htmlFor="cvv" className="text-sm font-medium">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        className={`mt-1 transition-colors focus:ring-2 focus:ring-blue-500 ${
                          errors.cvv ? "border-red-500" : ""
                        }`}
                        type="password"
                        {...register("cvv", {
                          required: "CVV is required",
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: "Please enter a valid CVV",
                          },
                        })}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 mt-2 text-sm">
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6">
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                        disabled={isLoading || !isValid}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          `Pay $${lead?.quoted_amount.total}`
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-1">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-8 p-6">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-xl">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                          <Plane className="text-blue-600 w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">From</span>
                          <span className="font-medium">
                            {lead.departure?.city} ({lead.departure?.code})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                          <Plane className="text-blue-600 w-5 h-5 transform rotate-180" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">To</span>
                          <span className="font-medium">
                            {lead.arrival?.city} ({lead.arrival?.code})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors">
                          <Calendar className="text-gray-600 w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Date</span>
                          <span className="font-medium">
                            {moment(lead.travelDate).format("MMM DD, YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors">
                          <Users className="text-gray-600 w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">
                            Passengers
                          </span>
                          <div className="flex gap-4">
                            <span className="font-medium">
                              {lead.adult} Adult
                            </span>
                            <span className="font-medium ">
                              {lead.child} Child
                            </span>
                            <span className="font-medium ">
                              {lead.infant} Infant
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        $ {lead.quoted_amount.total}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
