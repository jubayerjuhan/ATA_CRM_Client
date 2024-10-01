import React, { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

interface DateRangePickerProps {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  setDateRange: Dispatch<SetStateAction<{ startDate: any; endDate: any }>>;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  setDateRange,
}) => {
  const [tempRange, setTempRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [open, setOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setTempRange({ from: range.from, to: range.to });
    } else {
      setTempRange({ from: undefined, to: undefined });
    }
  };

  const handleComplete = () => {
    if (tempRange.from && tempRange.to) {
      setDateRange({ startDate: tempRange.from, endDate: tempRange.to });
      setOpen(false); // Close the popover
    }
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange.startDate &&
                !dateRange.endDate &&
                "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.startDate && dateRange.endDate ? (
              <>
                {moment(dateRange.startDate).format("MMM DD, YYYY")} -{" "}
                {moment(dateRange.endDate).format("MMM DD, YYYY")}
              </>
            ) : (
              <span>Pick both start and end dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.startDate || new Date()}
            selected={tempRange}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          <div className="p-3 border-t">
            <Button
              disabled={!tempRange.from || !tempRange.to}
              onClick={handleComplete}
              className="w-full"
            >
              Confirm Range
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
