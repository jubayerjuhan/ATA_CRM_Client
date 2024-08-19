import toast from "react-hot-toast";

import { InputFormModal } from "@/app_components";

import { InputField } from "@/app_components/InputFormModal/InputForm.types";
import { addFormField } from "@/services/formField/formField";
import { useState } from "react";

interface FormValues {
  [key: string]: string | boolean;
}

export const AddFormFieldModal = () => {
  const triggerBtnTitle = "Add Form Field";
  const submitBtnTitle = "Add Form Field";
  const modalTitle = "Add Form Field";
  const description = "Add a new form field to the form.";

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const fields: InputField[] = [
    {
      type: "text",
      id: "name",
      label: "Name",
      placeholder: "Enter The Field Name",
    },
    {
      type: "select",
      id: "type",
      label: "Field Type",
      placeholder: "Select The Field Type",
      options: [
        { value: "text", label: "Text" },
        { value: "number", label: "Text" },
      ],
    },
    {
      type: "label",
      id: "label",
      label: "Field Label",
      placeholder: "Enter The Field label",
    },
    {
      type: "select",
      id: "required",
      label: "Required",
      placeholder: "Select Field Required Or Not",
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ],
    },
  ];

  const handleAddNewField = async (data: FormValues) => {
    const fieldDetails = {
      ...data,
      required: data.required === "true" ? true : false,
    };

    try {
      await addFormField(fieldDetails);
      toast.success("New form field added successfully.");
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add new form field.");
    }
  };

  return (
    <div>
      <InputFormModal
        triggerBtnTitle={triggerBtnTitle}
        submitBtnTitle={submitBtnTitle}
        modalTitle={modalTitle}
        description={description}
        fields={fields}
        submitHandler={handleAddNewField}
        dialogOpen={dialogOpen}
      />
    </div>
  );
};
