import { useEffect, useState } from "react";

import { DashboardLayout } from "@/app_components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Phone, FileText, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { User } from "@/types";
import { client } from "@/api/api";
import moment from "moment";
import { AddWhatsappNote } from "@/app_components";

interface Note {
  text: string;
  added_by: User;
  addedAt: string;
}

interface WhatsappLeadDetailProps {
  _id: string;
  name: string;
  phone: string;
  description: string;
  notes: Note[];
}

export const WhatsappLeadDetail = () => {
  const { leadId } = useParams<{ leadId: string }>();

  const [lead, setLead] = useState<WhatsappLeadDetailProps | null>(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const { data } = await client.get(`/whatsapp-leads/single/${leadId}`);
        setLead(data);
      } catch (error) {
        console.error("Failed to fetch lead:", error);
      }
    };

    if (leadId) {
      fetchLead();
    }
  }, [leadId]);

  if (!lead) {
    return <div>Loading...</div>;
  }

  const { name, phone, description, notes } = lead;
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Lead Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                      name
                    )}`}
                  />
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {phone}
                  </div>
                </div>
              </div>

              <Separator />
              <div>
                <div className="flex justify-between mb-4">
                  <h3 className=" text-lg font-semibold mb-2 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Notes
                  </h3>
                  <AddWhatsappNote lead={lead} />
                </div>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  {notes.map((note, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6 mr-2">
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                                note.added_by.name
                              )}`}
                            />
                            <AvatarFallback>
                              {note.added_by.name.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {note.added_by.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {moment(note.addedAt).format("DD-MM-YYYY hh:mm a")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {note.text}
                      </p>
                      {index < notes.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
