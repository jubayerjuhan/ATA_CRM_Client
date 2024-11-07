import { FollowupTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { getMyFollowUps } from "@/redux/actions";
import { AppDispatch, AppState } from "@/types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const MyFollowUps = () => {
  const { followUp: followUpState } = useSelector((state: AppState) => state);
  const { auth } = useSelector((state: AppState) => state);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchMyFollowUps = async () => {
      await dispatch(getMyFollowUps());
    };
    fetchMyFollowUps();
  }, [dispatch, auth.profile?._id]);

  console.log(followUpState, "followUpState");
  return (
    <DashboardLayout>
      <FollowupTable
        title="My Follow Up's"
        customers={followUpState.myFollowUps}
        loading={followUpState.loading}
      />
    </DashboardLayout>
  );
};
