import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/app_components/DashboardLayout";
import { client } from "@/api/api";
import toast from "react-hot-toast";
import { LeadType } from "@/types";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export function LeadSearch() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<null | string>(null);
  const [leads, setLeads] = useState<LeadType[]>([]);

  // logical state
  const [newLeadDisabled, setNewLeadDisabled] = useState<boolean>(false);

  //  get the email from url query params
  const searchParams = new URLSearchParams(location.search);
  const queryEmail = searchParams.get("email");
  const queryName = searchParams.get("name");
  console.log(queryEmail, queryName);

  useEffect(() => {
    queryEmail && setEmail(queryEmail);
    if (!email) return;
    searchLeadsWithEmail(queryEmail || "");
  }, [queryEmail, email]);

  const searchLeadsWithEmail = async (email: string) => {
    try {
      const { data } = await client.get(`/leads/lead-search/${email}`);
      setLeads(data.leads);
      data.leads.map((lead: LeadType) => {
        if (
          lead.status === "In Progress" ||
          lead.status === "Payment Link Sent" ||
          lead.status === "Itenary Email Sent" ||
          lead.status === "Payment Complete"
        ) {
          return setNewLeadDisabled(true);
        }
      });
    } catch (error) {
      console.error("Failed to fetch search results", error);
      return toast.error("Failed to fetch search results");
    }
  };

  const getOldestLead = () => {
    if (!leads.length) return null;
    return leads.reduce((oldest, current) =>
      new Date(current.createdAt) < new Date(oldest.createdAt)
        ? current
        : oldest
    );
  };

  const oldestLead: LeadType | null = getOldestLead();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Customer History
          </h1>

          <div className="shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07)] p-8 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Name: <span className="">{queryName}</span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Email: <span className="">{leads[0]?.email}</span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Phone: <span className="">{leads[0]?.phone}</span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              First Departure:{" "}
              <span className="">
                {oldestLead?.departure?.name}, {oldestLead?.departure?.city},{" "}
                {oldestLead?.departure?.country}
              </span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              First Destination:{" "}
              <span className="">
                {oldestLead?.arrival?.name}, {oldestLead?.arrival?.city},{" "}
                {oldestLead?.arrival?.country}
              </span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Profile Creation Date:{" "}
              <span className="">
                {moment(oldestLead?.createdAt).format("DD-MM-YYYY")}
              </span>
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Total Leads: <span className="text-grey-600">{leads.length}</span>
            </h2>
            <div className="flex w-full justify-end">
              <Button
                disabled={newLeadDisabled}
                variant={"outline"}
                className="my-4"
                onClick={() =>
                  navigate(`/form`, {
                    state: { leadData: leads[0], nonEditable: true },
                  })
                }
              >
                Add New Lead
              </Button>
            </div>
            <div className="space-y-4">
              {leads.map((lead, index) => (
                <motion.div
                  key={lead._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {lead.firstName} {lead.lastName}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Plane className="mr-2 h-4 w-4" />
                            <span>
                              {lead.departure?.city} to {lead.arrival?.city}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>
                              Travel:{" "}
                              {moment(lead.travelDate).format("DD-MM-YYYY")}
                            </span>
                            {lead.returnDate && (
                              <span className="ml-4">
                                Return: {lead.returnDate}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-gray-600 my-2">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>
                              Case Date:{" "}
                              {moment(lead.createdAt).format("DD-MM-YYYY")}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            lead.status === "Ticket Sent"
                              ? "default"
                              : "outline"
                          }
                        >
                          {lead.status === "Ticket Sent"
                            ? "Sale Converted"
                            : lead.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          className="mt-4"
                          onClick={() => {
                            location.href = `/dashboard/lead/${lead._id}`;
                          }}
                        >
                          View Lead
                        </Button>
                        <div>
                          <p>Managed By: {lead.claimed_by?.name as string}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
