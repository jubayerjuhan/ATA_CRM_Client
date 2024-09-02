import { DashboardLayout } from "@/app_components/DashboardLayout";
import { MyLeadsTable } from "@/app_components/leads/MyLeadsTable/MyLeadsTable";
import { getLeadsByUserId } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const MyLeads = () => {
  const { lead: leadState } = useSelector((state: AppState) => state);
  const { auth } = useSelector((state: AppState) => state);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchMyLeads = async () => {
      await dispatch(getLeadsByUserId(auth.profile?._id as string));
    };
    fetchMyLeads();
  }, [dispatch, auth.profile?._id]);

  return (
    <DashboardLayout>
      <MyLeadsTable leads={leadState.leads} loading={false} />
    </DashboardLayout>
  );
};
