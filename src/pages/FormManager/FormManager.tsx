import { DashboardLayout } from "@/app_components/DashboardLayout";
import { AddFormFieldModal, FormFieldsTable } from "@/app_components";
import { useEffect, useState } from "react";
import { getAllFormFields } from "@/services/formField/formField";
import { FormFieldType } from "@/types";

const FormManager = () => {
  const [formFields, setFormFields] = useState<FormFieldType[]>([]);

  useEffect(() => {
    fetchFormFields();
  }, []);

  const fetchFormFields = async () => {
    try {
      const allFormFieldData = await getAllFormFields();
      setFormFields(allFormFieldData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <AddFormFieldModal />
      <FormFieldsTable fields={formFields} loading={false} />
    </DashboardLayout>
  );
};

export default FormManager;
