import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DashboardLayout } from "@/app_components/DashboardLayout";

import { getAllLeads } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";
import { AllLeadsTable } from "@/app_components";
import moment from "moment";
import { Button } from "@/components/ui/button";

export const Leads = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const { profile } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAllLeads = async () => {
      await dispatch(getAllLeads());
    };
    fetchAllLeads();
  }, [dispatch]);

  console.log("object");
  return (
    <DashboardLayout>
      {profile?.role === "admin" && (
        <div style={{ width: "100%" }}>
          <Button
            onClick={() => {
              downloadCSV(leadState.leads);
            }}
          >
            Download In CSV
          </Button>
        </div>
      )}
      <AllLeadsTable customers={leadState.leads} loading={leadState.loading} />
    </DashboardLayout>
  );
};

const downloadCSV = (data: any[]) => {
  const headers = [
    "Booking ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Lead Status",
    "Followup Date",
    "Profile Creation Date",
    "Departure",
    "Arrival",
    "Airline",
    "Payment Status",
    "Passenger Type",
    "Post Code",
    "Case Date",
    "Call For",
    "Travel Date",
    "Return Date",
    "Adult",
    "Child",
    "Infant",
    "Lead Origin",
    "Claimed By",
    "Quoted Amount",
    "Follow Up Date",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        row.booking_id,
        row.firstName,
        row.lastName,
        row.email,
        row.phone,
        row.status,
        row.follow_up_date
          ? moment(row.follow_up_date).format("DD-MM-YYYY")
          : "n/a",
        moment(row.createdAt).format("DD-MM-YYYY"),
        row.departure?.name,
        row.arrival?.name,
        row.airline?.name,
        row.payment.status,
        row.passengerType,
        row.postCode,
        moment(row.caseDate).format("DD-MM-YYYY"),
        row.callFor,
        moment(row.travelDate).format("DD-MM-YYYY"),
        moment(row.returnDate).format("DD-MM-YYYY"),
        row.adult,
        row.child,
        row.infant,
        row.leadOrigin,
        row.claimed_by?.name,
        row.quoted_amount.total,
        row.follow_up_date
          ? moment(row.follow_up_date).format("DD-MM-YYYY")
          : "n/a",
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "all_leads.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
