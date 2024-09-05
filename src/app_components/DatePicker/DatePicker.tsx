import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
  name: string;
  label: string;
  required?: boolean;
  value?: Date;
  error?: string;
  style?: object;
  onDateChange: (value: Date | undefined) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  value,
  error,
  onDateChange,
  style,
  required,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  return (
    <div key={name} className="flex flex-col gap-4 w-full">
      <Label htmlFor={name} className="text-md">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild style={style}>
          <Button
            variant={"outline"}
            className={cn(
              "w-[100] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
