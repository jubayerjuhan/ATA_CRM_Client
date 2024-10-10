import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { client } from "@/api/api";
import { AppState, LeadType } from "@/types";
import moment from "moment";
import { DateRangePicker } from "@/app_components/DateRangePicker/DateRangePicker";
import { MyFollowUpsURL } from "@/routes/routeConstant";
import { useSelector } from "react-redux";

interface CustomersDataType {
  leads: LeadType[];
  totalAmount: number;
  cancelledLeads: LeadType[];
  followups: number;
  myFollowups: number;
}

export const Dashboard = () => {
  const { auth: authState } = useSelector((state: AppState) => state);
  const [customersData, setCustomersData] = React.useState<CustomersDataType>({
    leads: [],
    totalAmount: 0,
    cancelledLeads: [],
    followups: 0,
    myFollowups: 0,
  });

  const [dateRange, setDateRange] = React.useState({
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
  });

  console.log(dateRange);

  useEffect(() => {
    const fetchCustomersByDate = async () => {
      try {
        const { data } = await client.get(
          `/customers/filter/converted?startDate=${moment(
            dateRange.startDate
          ).toISOString()}&endDate=${moment(dateRange.endDate).toISOString()}`
        );
        setCustomersData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomersByDate();
  }, [dateRange]);

  const data = Array.from({ length: 7 })
    .map((_, index) => {
      const date = moment().subtract(index, "days").format("ddd");
      const value = customersData.leads
        .filter((lead) => moment(lead.payment.date).format("ddd") === date)
        .reduce((total, lead) => total + lead.quoted_amount.total, 0);
      return { name: date, value };
    })
    .reverse();

  console.log(dateRange, "dateRange");

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <DateRangePicker
            dateRange={{
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
            }}
            setDateRange={setDateRange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gross Revenue
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${customersData.totalAmount}
              </div>
              <p className="text-xs mt-2 text-muted-foreground">
                Revenue generated from customers
              </p>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Converted Customers
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customersData.leads.length}
              </div>
              <p className="text-xs mt-2 text-muted-foreground">
                Customers who purchased
              </p>
            </CardContent>
          </Card>
          {authState.profile?.role === "admin" && (
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
                <div className="text-2xl font-bold">
                  {customersData.followups}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Follow up required
                </p>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                My Follow Up's
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
              <a href={MyFollowUpsURL} className="text-2xl font-bold">
                {customersData.myFollowups}
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                Follow up required
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cancelled Customers
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
              <div className="text-2xl font-bold">
                {customersData.cancelledLeads.length}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Cancelled customers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#000000" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <p className="text-sm text-muted-foreground">
                You made {customersData.leads.length} sales
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {customersData.leads.map((lead, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`/api/placeholder/32/32`}
                        alt={lead.firstName}
                      />
                      <AvatarFallback>
                        {lead.firstName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lead.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      ${lead.quoted_amount.total}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
