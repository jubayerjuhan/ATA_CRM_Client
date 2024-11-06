import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

// Note: In a real-world scenario, you'd need to install and import moment-timezone
// For this example, we'll simulate it with a placeholder function
const moment = {
  tz: (zone: string) => ({
    format: (format: string) =>
      new Date().toLocaleTimeString("en-US", { timeZone: zone, hour12: true }),
  }),
};

const timeZones = [
  {
    city: "New Delhi",
    zone: "Asia/Kolkata",
    gradient: "from-orange-500 to-red-500",
  },
  {
    city: "Hobart",
    zone: "Australia/Hobart",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    city: "Brisbane",
    zone: "Australia/Brisbane",
    gradient: "from-green-500 to-blue-500",
  },
  {
    city: "Sydney",
    zone: "Australia/Sydney",
    gradient: "from-blue-500 to-indigo-500",
  },
];

export function WorldClock() {
  const [times, setTimes] = useState(() => {
    return timeZones.map(({ zone }) => moment.tz(zone).format("HH:mm:ss"));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(timeZones.map(({ zone }) => moment.tz(zone).format("HH:mm:ss")));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">World Clock</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {timeZones.map((tz, index) => (
          <Card key={tz.zone} className={`overflow-hidden`}>
            {/* <div className={`h-2`} /> */}
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{tz.city}</h3>
                <Clock className="text-gray-500" />
              </div>
              <p className="text-3xl font-bold text-center">{times[index]}</p>
              {/* <p className="text-sm text-gray-500 text-center mt-2">
                {tz.zone}
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
