import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/api/api";

export function MintpaymentPaymentConfirmation() {
  const [paymentStatus, setPaymentStatus] = useState<
    "loading" | "success" | "failed"
  >("loading");
  const [error, setError] = useState<string>("");
  const { leadId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const { data } = await client.post(
          `/payment/mint-pay/confirm-payment/${leadId}`
        );

        setPaymentStatus("success");

        if (data.payment_status !== "APPROVED") {
          // Dispatch an action to update the lead status
        }
      } catch (err) {
        setPaymentStatus("failed");
        setError("Payment  failed");
      }
      await client.post(`/email/send-payment-method-selection-email`, {
        leadId: leadId,
      });
    };

    checkPaymentStatus();
  }, [leadId]);

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Payment Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {paymentStatus === "loading" && (
            <div className="text-center">
              <div className="relative">
                <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
                <div className="mt-4 space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    Verifying your payment
                  </p>
                  <p className="text-sm text-gray-500">
                    Please wait while we confirm your transaction...
                  </p>
                </div>
              </div>
            </div>
          )}
          {paymentStatus === "success" && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-2">
                Your transaction has been completed successfully.
              </p>
              {/* <p className="text-sm text-gray-500">
                A confirmation email will be sent shortly.
              </p> */}
            </div>
          )}
          {paymentStatus === "failed" && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                Payment Failed
              </h2>
              <p className="text-gray-600 mb-2">
                {error || "We couldn't process your payment at this time."}
              </p>
              <p className="text-sm text-gray-500">
                Please try again or contact support for assistance.
              </p>
            </div>
          )}
        </CardContent>
        {/* <CardFooter className="flex justify-center gap-4">
          {paymentStatus === "success" && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleReturnHome}
            >
              Return to Homepage
            </Button>
          )}
          {paymentStatus === "failed" && (
            <div className="w-full space-y-2">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleTryAgain}
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleReturnHome}
              >
                Return to Homepage
              </Button>
            </div>
          )}
        </CardFooter> */}
      </Card>
    </div>
  );
}
