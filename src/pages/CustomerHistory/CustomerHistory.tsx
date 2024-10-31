import { client } from "@/api/api";
import { CustomerHistoryTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { AppDispatch, AppState, LeadType } from "@/types";
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

  useEffect(() => {
    const fetchCustomerHistory = async () => {
      setLoading(true);
      try {
        const { data } = await client.get("/customers/unique-customers");
        setCustomers(data.customers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerHistory();
  }, [dispatch, auth.profile?._id]);

  return (
    <DashboardLayout>
      <CustomerHistoryTable
        customers={customers}
        loading={loading}
        title="Customer's Log"
      />
    </DashboardLayout>
  );
};
