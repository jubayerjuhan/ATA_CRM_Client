import { client } from "@/api/api";
import { CustomerHistoryTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { DateRangePicker } from "@/app_components/DateRangePicker/DateRangePicker";
import { Button } from "@/components/ui/button";
import { AppDispatch, AppState, LeadType } from "@/types";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const CustomerHistory = () => {
  const { auth } = useSelector((state: AppState) => state);
  const [customers, setCustomers] = useState<
    { firstLead: LeadType; latestLead: LeadType; totalLeads: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchCustomerHistory = async () => {
      setLoading(true);

      const url =
        dateRange.startDate && dateRange.endDate
          ? `/customers/unique-customers?startDate=${moment(
              dateRange.startDate
            ).toISOString()}&endDate=${moment(dateRange.endDate).toISOString()}`
          : `/customers/unique-customers`;
      try {
        const { data } = await client.get(url);
        setCustomers(data.customers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerHistory();
  }, [dispatch, auth.profile?._id, dateRange]);

  const handleClear = () => {
    setDateRange({
      startDate: null,
      endDate: null,
    });
  };

  return (
    <DashboardLayout>
      <Button
        onClick={() => {
          downloadCSV(customers);
        }}
      >
        Download In CSV
      </Button>
      <div className="mt-4 flex gap-2">
        <DateRangePicker
          dateRange={{
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          }}
          setDateRange={setDateRange}
        />
        <Button onClick={handleClear}>Clear</Button>
      </div>
      <CustomerHistoryTable
        customers={customers}
        loading={loading}
        title="Customer's Log"
      />
    </DashboardLayout>
  );
};

export const downloadCSV = (data: any[]) => {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Profile Creation Date",
    "First Departure",
    "First Destination",
    "Total Inquiries",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        `${row.latestLead.firstName} ${row.latestLead.lastName}`,
        row.latestLead.email,
        row.latestLead.phone,
        moment(row.firstLead.createdAt).format("DD-MM-YYYY"),
        row.firstLead.departure?.city,
        row.firstLead.arrival?.city,
        row.totalLeads,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "customer_history.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
