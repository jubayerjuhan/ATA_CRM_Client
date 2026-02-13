import { DashboardLayout } from "@/app_components/DashboardLayout";
import { AddFormFieldModal, FormFieldsTable } from "@/app_components";
import { Profiler, useEffect, useState } from "react";
import { getAllFormFields } from "@/services/formField/formField";
import { FormFieldType } from "@/types";
import {
  createTableProfilerCallback,
  useTableRenderTracker,
} from "@/utils/tablePerfProfiler";

const formFieldsTableProfiler = createTableProfilerCallback("FormFieldsTable");

const FormManager = () => {
  const [formFields, setFormFields] = useState<FormFieldType[]>([]);
  useTableRenderTracker("FormFieldsTable", {
    rows: formFields.length,
  });

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
      <Profiler id="FormFieldsTable" onRender={formFieldsTableProfiler}>
        <FormFieldsTable fields={formFields} loading={false} />
      </Profiler>
    </DashboardLayout>
  );
};

export default FormManager;
