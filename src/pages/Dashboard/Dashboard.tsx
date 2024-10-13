import React, { useEffect } from "react";
import moment from "moment";

import { DashboardLayout } from "@/app_components/DashboardLayout";
import { client } from "@/api/api";
import { DateRangePicker } from "@/app_components/DateRangePicker/DateRangePicker";
import {
  DashboardCardsSection,
  SearchCustomers,
  UsersOverview,
} from "@/app_components";

interface CustomersDataType {
  leads: number;
  lostLeads: number;
  followUps: number;
  myFollowups: number;
  convertedLeads: number;
}

export const Dashboard = () => {
  const [usersOverviewData, setUsersOverviewData] = React.useState<any>([]);
  const [customersData, setCustomersData] = React.useState<CustomersDataType>({
    leads: 0,
    lostLeads: 0,
    followUps: 0,
    myFollowups: 0,
    convertedLeads: 0,
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
        const { data: usersOverviewData } = await client.get(
          `/user/overview-list?startDate=${moment(
            dateRange.startDate
          ).toISOString()}&endDate=${moment(dateRange.endDate).toISOString()}`
        );
        setCustomersData(data);
        setUsersOverviewData(usersOverviewData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomersByDate();
  }, [dateRange]);

  // const data = Array.from({ length: 7 })
  //   .map((_, index) => {
  //     const date = moment().subtract(index, "days").format("ddd");
  //     const value = customersData.leads
  //       .filter((lead) => moment(lead.payment.date).format("ddd") === date)
  //       .reduce((total, lead) => total + lead.quoted_amount.total, 0);
  //     return { name: date, value };
  //   })
  //   .reverse();

  console.log(dateRange, "dateRange");

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <SearchCustomers />
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

        <DashboardCardsSection customersData={customersData} />
        <UsersOverview data={usersOverviewData} />
      </div>
    </DashboardLayout>
  );
};
