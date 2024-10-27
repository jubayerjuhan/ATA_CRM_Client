import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment";
import TimePicker from "react-time-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { client } from "@/api/api";
import { AppDispatch, LeadType } from "@/types";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getSingleLead } from "@/redux/actions";

interface FollowupDatePickerProps {
  lead: LeadType;
}

export const FollowUpDatePicker: React.FC<FollowupDatePickerProps> = ({
  lead,
}) => {
  const [date, setDate] = useState<moment.Moment | null>(null); // Use moment.Moment type
  const [time, setTime] = useState<string | null>(null); // Use string for time
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate ? moment(selectedDate) : null); // Convert to moment object
  };

  const handleTimeChange = (selectedTime: string) => {
    setTime(selectedTime);
  };

  const submitFollowUpDate = async () => {
    if (!date || !time) {
      toast.error("Please select a date and time");
      return;
    }

    const dateTime = moment(date).set({
      hour: parseInt(time.split(":")[0], 10),
      minute: parseInt(time.split(":")[1], 10),
    });

    setIsSubmitting(true);
    try {
      await client.put(`/leads/${lead._id}`, {
        follow_up_date: dateTime.toISOString(), // Convert to ISO string
      });

      toast.success("Follow up date added");
      dispatch(getSingleLead(lead._id as string));
    } catch (error) {
      toast.error("Failed to cancel the booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? date.format("MMM DD, YYYY") : <span>Pick a date</span>}{" "}
            {/* Use moment for formatting */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date ? date.toDate() : undefined} // Convert moment to Date for Calendar component
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <TimePicker
        // onChange={handleTimeChange}
        value={time}
        disableClock={true}
      />
      <Button
        onClick={submitFollowUpDate}
        disabled={!date || !time || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Follow-up Date"}
      </Button>
    </div>
  );
};
