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

export const CustomerHistory: React.FC = () => {
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
      const url = `/customers/unique-customers`;
      try {
        const { data } = await client.get(url);

        if (dateRange.startDate && dateRange.endDate) {
          const filteredCustomer = filterDateRange(data.customers);
          setCustomers(filteredCustomer);
        } else {
          setCustomers(data.customers);
        }
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

  const filterDateRange = (fetchedCustomers: any) => {
    if (dateRange.startDate && dateRange.endDate) {
      const filteredCustomers = fetchedCustomers.filter((customer: any) => {
        const firstLeadDate = moment(customer.firstLead.createdAt);
        const endDate = moment(dateRange.endDate).endOf("day");
        return (
          firstLeadDate.isSameOrAfter(dateRange.startDate) &&
          firstLeadDate.isSameOrBefore(endDate)
        );
      });
      console.log(
        filteredCustomers,
        filteredCustomers.length,
        "filtered customers"
      );

      return filteredCustomers;
    }
  };

  const handleDownloadCSV = () => {
    downloadCSV(customers);
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <Button onClick={handleDownloadCSV}>Download as CSV</Button>
      </div>
      <div className="flex gap-2 mb-4">
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

const downloadCSV = (data: any[]) => {
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

export default CustomerHistory;
