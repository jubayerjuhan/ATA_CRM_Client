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
import { Input } from "@/components/ui/input";

interface SendEmailProps {
  selectedTab: string | null;
  defaultHtml: string;
  emailType: string;
  lead: LeadType;
  setSelectedTab: React.Dispatch<React.SetStateAction<string | null>>;
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
  selectedTab,
  defaultHtml,
  emailType,
  lead,
  setSelectedTab,
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

  const disabledFields =
    lead.status === "Sale Lost" || lead.status === "Ticket Sent";

  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append(
        "htmlContent",
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
      formData.append("subject", getEmailSubject(emailType));
      formData.append("email", lead.email);
      formData.append("name", lead.firstName);
      formData.append("leadId", lead._id as string);
      formData.append("emailType", emailType);

      pdfFields.forEach((file, index) => {
        formData.append(`ticket`, file);
      });

      await client.post("/email/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Email sent successfully");
      setSelectedTab(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
      dispatch(getSingleLead(leadId as string));
    }
  };

  const [pdfFields, setPdfFields] = useState<File[]>([]);
  const addPdfField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFields([...pdfFields, event.target.files[0]]);
    }
  };

  return (
    <div className="">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />

      {selectedTab === "ticket" && (
        <div className="pdf-selection">
          <div className="pdf-field flex items-center space-x-2">
            <Input
              className="border border-gray-300 rounded p-2 my-2 w-300"
              type="file"
              accept="application/pdf"
              onChange={addPdfField}
            />
            {/* <button
              className="add-pdf-button bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
              onClick={() => addPdfField}
            >
              +
            </button> */}
          </div>
          {pdfFields.map((file, index) => (
            <div key={index} className="pdf-field">
              <Input
                className="border border-gray-300 rounded p-2 my-2 w-300"
                type="file"
                accept="application/pdf"
                onChange={addPdfField}
              />
            </div>
          ))}
        </div>
      )}
      <Button onClick={handleSendEmail} disabled={loading || disabledFields}>
        Send Email
      </Button>
    </div>
  );
};
