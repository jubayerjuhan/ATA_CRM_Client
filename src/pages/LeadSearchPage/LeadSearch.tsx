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
    } catch (error) {
      console.error("Failed to fetch search results", error);
      return toast.error("Failed to fetch search results");
    }
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // In a real application, you would fetch leads based on the email here
  //   console.log("Searching for:", email);
  // };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            All Leads Under The Email
          </h1>

          <Card className="overflow-hidden">
            {/* <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex space-x-4">
                <Input
                  type="email"
                  placeholder="Enter email to search leads"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </form>
            </CardContent> */}
          </Card>

          <div className="bg-white rounded-lg shadow-lg p-6">
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
              Total Leads: <span className="text-grey-600">{leads.length}</span>
            </h2>
            <div className="flex w-full justify-end">
              <Button
                variant={"outline"}
                className="my-4"
                onClick={() =>
                  navigate(`/form`, {
                    state: { leadData: leads[0] },
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
                          {lead.status}
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
