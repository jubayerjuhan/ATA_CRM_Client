import React, { useState } from "react";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs"; // Import this for HTML to Draft.js conversion

import { Button } from "@/components/ui/button";
import { client } from "@/api/api";

import "./SendEmail.scss";
import toast from "react-hot-toast";
import { AppDispatch, LeadType } from "@/types";
import { useDispatch } from "react-redux";
import { getSingleLead } from "@/redux/actions";

interface SendEmailProps {
  defaultHtml: string;
  emailType: string;
  lead: LeadType;
}

const getEmailSubject = (emailType: string): string => {
  switch (emailType) {
    case "itinerary":
      return "Your Itinerary Details";
    case "ticket":
      return "Your Ticket Details";

    default:
      return "No Subject";
  }
};

export const SendEmail: React.FC<SendEmailProps> = ({
  defaultHtml,
  emailType,
  lead,
}) => {
  const leadId = lead._id;
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  // Convert HTML to Draft.js content state
  const contentBlock = htmlToDraft(defaultHtml);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      await client.post("/email/send-email", {
        htmlContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        subject: getEmailSubject(emailType),
        email: lead.email,
        name: lead.firstName,
        leadId: lead._id,
        emailType: emailType,
      });
      toast.success("Email sent successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
      dispatch(getSingleLead(leadId as string));
    }
  };

  return (
    <div className="">
      <Editor
        editorState={editorState} // Changed to editorState instead of defaultEditorState
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />

      <Button onClick={handleSendEmail} disabled={loading}>
        Send Email
      </Button>
    </div>
  );
};
