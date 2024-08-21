import { LeadsTable } from "@/app_components";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import React from "react";

export const Leads = () => {
  const leads = [
    {
      _id: "66c6350884c63cc57794f261",
      name: "Slade Curry",
      email: "qokudol@mailinator.com",
      phone: "213",
      from: "Libero nulla harum a",
      to: "Beatae et ipsam sed",
      passengers: "548",
      class: "Temporibus sint sunt",
      departure: new Date("2024-08-05T18:00:00.000Z"),
      createdAt: new Date("2024-08-21T18:42:16.132Z"),
    },
    {
      _id: "66c6350884c63cc57794f262",
      name: "Luna Hawkins",
      email: "lunahawk@mailinator.com",
      phone: "914",
      from: "Exercitationem incidunt",
      to: "Qui quia cumque",
      passengers: "3",
      class: "First Class",
      departure: new Date("2024-09-15T10:00:00.000Z"),
      createdAt: new Date("2024-08-21T19:15:00.000Z"),
    },
    {
      _id: "66c6350884c63cc57794f263",
      name: "Nathan Drake",
      email: "natedrake@mailinator.com",
      phone: "456",
      from: "Explicabo modi odio",
      to: "Aliquid commodi fugiat",
      passengers: "2",
      class: "Business Class",
      departure: new Date("2024-10-01T12:30:00.000Z"),
      createdAt: new Date("2024-08-21T20:00:00.000Z"),
    },
  ];
  return (
    <DashboardLayout>
      <LeadsTable leads={leads} loading={false} />
    </DashboardLayout>
  );
};
