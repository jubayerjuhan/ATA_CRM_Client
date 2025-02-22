import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MyFollowUpsURL, TotalFollowUpsURL } from "@/routes/routeConstant";
import { AppState } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

interface CustomersDataType {
  // leads: LeadType[];
  // totalAmount: number;
  leads: number;
  lostLeads: number;
  followUps: number;
  myFollowups: number;
  convertedLeads: number;
  monthlyConvertedLeads: number;
  totalConvertedLeadsByUser: number;
  inProgressLeads: number;
}

interface DashboardCardSectionProps {
  customersData: CustomersDataType;
}

export const DashboardCardsSection: React.FC<DashboardCardSectionProps> = ({
  customersData,
}) => {
  console.log(customersData, "customersData");
  const { auth: authState } = useSelector((state: AppState) => state);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${
          ["admin", "leader"].includes(authState.profile?.role || "") ? 6 : 5
        }, 1fr)`,
        gap: "16px",
      }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-8 w-8 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customersData.leads}</div>
          <p className="text-xs mt-2 text-muted-foreground">
            Total leads in that period
          </p>
        </CardContent>
      </Card>
      {["admin", "leader"].includes(authState.profile?.role || "") && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Follow Up's
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-8 w-8 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <a href={TotalFollowUpsURL} className="text-2xl font-bold">
              {customersData.followUps}
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              Follow up required
            </p>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Follow Up's</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-8 w-8 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <a href={MyFollowUpsURL} className="text-2xl font-bold">
            {customersData.myFollowups}
          </a>
          <p className="mt-2 text-xs text-muted-foreground">
            Follow up required
          </p>
        </CardContent>
      </Card>
      {["admin", "leader"].includes(authState.profile?.role || "") && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {" "}
              Converted Leads
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-8 w-8 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{customersData.convertedLeads}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Leads converted to customers
            </p>
          </CardContent>
        </Card>
      )}
      {authState.profile?.role === "agent" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {" "}
              Converted Leads
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-8 w-8 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {customersData.totalConvertedLeadsByUser}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Leads converted to customers
            </p>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sale Lost</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-8 w-8 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customersData.lostLeads}</div>
          <p className="mt-2 text-xs text-muted-foreground">
            Cancelled customers
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            In Progress Leads
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-8 w-8 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{customersData.inProgressLeads}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Leads in progress (In Progress, Itinerary Sent, Payment Made)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
