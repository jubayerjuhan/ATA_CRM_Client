import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { client } from "@/api/api";
import { AppDispatch, LeadType } from "@/types";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getSingleLead } from "@/redux/actions";

interface FollowUpDatePickerProps {
  lead: LeadType;
}

export function FollowUpDatePicker({ lead }: FollowUpDatePickerProps) {
  const [date, setDate] = React.useState<moment.Moment | null>(null);
  const [hours, setHours] = React.useState<string>("12");
  const [minutes, setMinutes] = React.useState<string>("00");
  const [ampm, setAmpm] = React.useState<string>("AM");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate ? moment(selectedDate) : null);
  };

  const formatDateTime = () => {
    if (!date) return "Pick a date and time";
    return date.format("MMM DD, YYYY") + ` at ${hours}:${minutes} ${ampm}`;
  };

  const submitFollowUpDate = async () => {
    if (!date) {
      toast.error("Please select a date and time");
      return;
    }

    let hour = parseInt(hours);
    if (ampm === "PM" && hour !== 12) {
      hour += 12;
    } else if (ampm === "AM" && hour === 12) {
      hour = 0; // Midnight case
    }

    const dateTime = date.set({
      hour,
      minute: parseInt(minutes),
    });

    setIsSubmitting(true);
    try {
      await client.put(`/leads/${lead._id}`, {
        follow_up_date: dateTime.toISOString(),
      });

      toast.success("Follow up date added");
      dispatch(getSingleLead(lead._id as string));
    } catch (error) {
      toast.error("Failed to add follow up date");
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
            {formatDateTime()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date?.toDate()}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex items-center justify-between p-3 border-t border-border">
            <Select value={hours} onValueChange={setHours}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem
                    key={i}
                    value={(i + 1).toString().padStart(2, "0")}
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">:</span>
            <Select value={minutes} onValueChange={setMinutes}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={ampm} onValueChange={setAmpm}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
      <Button onClick={submitFollowUpDate} disabled={!date || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Follow-up Date"}
      </Button>
    </div>
  );
}
