import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { client } from "@/api/api";

export function PaymentProcessing() {
  const [isLoading, setIsLoading] = useState(true);

  // catch the leadId from the URL
  const { leadId } = useParams<{ leadId: string }>();

  useEffect(() => {
    const processPayment = async () => {
      setIsLoading(true);
      try {
        await client.post(`/leads/${leadId}/process-payment`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    processPayment();
  }, [leadId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            {isLoading ? "Processing Payment" : "Payment Successful!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {isLoading ? (
            <div className="w-24 h-24 relative mb-4">
              <Loader2 className="w-full h-full animate-spin text-primary" />
            </div>
          ) : (
            <div className="w-24 h-24 relative mb-4">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="text-primary/20"
                  stroke="currentColor"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="46"
                />
                <path
                  className="text-primary animate-draw-check"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M28 50L42 64L72 36"
                />
              </svg>
            </div>
          )}
          <p className="text-muted-foreground text-center mb-4">
            {isLoading
              ? "Please wait while we process your payment..."
              : "Your payment has been processed successfully. Thank you for your purchase!"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue Shopping"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
