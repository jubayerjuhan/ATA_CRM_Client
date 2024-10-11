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

interface SendEmailProps {
  defaultHtml: string;
}

export const SendEmail: React.FC<SendEmailProps> = ({ defaultHtml }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // Convert HTML to Draft.js content state
  const contentBlock = htmlToDraft(defaultHtml);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      await client.post("/email/send-email", {
        htmlContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      });
      toast.success("Email sent successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
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
