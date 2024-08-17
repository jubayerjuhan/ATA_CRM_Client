import React from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { InputField, InputFormModalProps } from "./InputForm.types";

interface FormValues {
  [key: string]: string; // Dynamic form values
}

export const InputFormModal: React.FC<InputFormModalProps> = ({
  triggerBtnTitle,
  submitBtnTitle,
  modalTitle,
  description,
  fields,
  submitHandler,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (submitHandler) submitHandler(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerBtnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="grid grid-cols-4 items-center gap-x-4 gap-y-2"
            >
              <Label htmlFor={field.id} className="text-right">
                {field.label}
              </Label>
              <RenderInputField
                register={register}
                control={control}
                field={field}
                errors={errors}
              />
            </div>
          ))}
          <DialogFooter>
            <Button type="submit">{submitBtnTitle}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface RenderInputFieldProps {
  control: any;
  field: InputField;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}
const RenderInputField: React.FC<RenderInputFieldProps> = ({
  control,
  field,
  register,
  errors,
}) => {
  if (field.type === "select") {
    return (
      <Controller
        name={field.id}
        control={control}
        rules={{ required: true }}
        render={({ field: controllerField }) => (
          <Select
            onValueChange={(value) => controllerField.onChange(value)}
            value={controllerField.value}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{field.label}</SelectLabel>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id={field.id} {...register(field.id, { required: true })} />
      </div>
    );
  }

  return (
    <>
      <Input
        id={field.id}
        type={field.type}
        placeholder={field.placeholder}
        {...register(field.id, { required: true })}
        className="col-span-3"
      />
      {errors[field.id] && (
        <span className="text-xs text-right text-red-500 col-span-4 ml-1 mt-1">
          * This Field Is Required
        </span>
      )}
    </>
  );
};
