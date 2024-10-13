import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Phone, User } from "lucide-react";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import toast from "react-hot-toast";
import { client } from "@/api/api";

interface FormValues {
  name: string;
  phone: string;
  description: string;
}

export const WhatsAppLeadPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await client.post("/whatsapp-leads", data);
      toast.success("Lead submitted successfully!");
      console.log("Submitted lead:", response.data);
    } catch (error) {
      toast.error("Failed to submit lead. Please try again.");
      console.error("Error submitting lead:", error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <DashboardLayout noPadding>
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 flex flex-col justify-between">
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-green-700">
                Add Your WhatsApp Lead Here
              </CardTitle>
              <CardDescription className="text-center p-2">
                Adding a WhatsApp lead helps us to connect quickly and
                efficiently. Please ensure that your contact details are
                accurate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Your full name"
                      {...register("name", { required: "Name is required" })}
                      className="pl-9"
                    />
                    {errors.name && (
                      <p className="text-red-500 mt-2 text-[12px]">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your WhatsApp number"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      className="pl-9"
                    />
                    {errors.phone && (
                      <p className="text-red-500 mt-2 text-[12px]">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">How can we help?</Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe your inquiry..."
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-red-500 mt-2 text-[12px]">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </DashboardLayout>
  );
};
