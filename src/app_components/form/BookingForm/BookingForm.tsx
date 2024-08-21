import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/app_components/DatePicker/DatePicker";
import { FormFieldType } from "@/types";
import "./BookingForm.scss";
import toast from "react-hot-toast";
import { AppButton } from "@/app_components/AppButton";

interface BookingFormProps {
  fields: FormFieldType[];
  onSubmit: (data: any) => void;
}

interface FormValues {
  [key: string]: any; // Allow for dynamic field names
}

export const BookingForm: React.FC<BookingFormProps> = ({
  fields,
  onSubmit: handleAddLead,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let formValid = true;

    fields.forEach((field) => {
      if (field.type === "date") {
        if (!data[field.name]) {
          toast.error(`${field.label} is required`);
          formValid = false;
        }
      }
    });

    if (!formValid) {
      return;
    }

    handleAddLead(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="booking-form">
        {fields.map((field: FormFieldType) => {
          if (["text", "email", "password", "number"].includes(field.type)) {
            return (
              <div key={field.name} className="flex flex-col gap-4 w-full">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  type={field.type}
                  id={field.name}
                  placeholder={`Enter ${field.label}`}
                  {...register(field.name, {
                    required: `${field.label} is required`,
                    pattern:
                      field.type === "email"
                        ? {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email",
                          }
                        : undefined,
                  })}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]?.message as string}
                  </p>
                )}
              </div>
            );
          }

          if (field.type === "date") {
            return (
              <div key={field.name} className="flex flex-col gap-4 w-full">
                <DatePicker
                  name={field.name}
                  error={errors[field.name]?.message as string}
                  label={field.label}
                  onDateChange={(date) => {
                    setValue(field.name, date, { shouldValidate: true });
                  }}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
      <AppButton primary className="w-full mt-8">
        Submit
      </AppButton>
    </form>
  );
};
