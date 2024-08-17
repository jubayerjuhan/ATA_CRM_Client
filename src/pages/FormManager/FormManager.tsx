import { DashboardLayout } from "@/app_components/DashboardLayout";
import { FormFieldsTable } from "@/app_components";

const FormManager = () => {
  return (
    <DashboardLayout>
      <FormFieldsTable
        fields={[
          {
            _id: "123",
            name: "Name 123",
            type: "Type",
            label: "Label",
            required: true,
          },
          {
            _id: "123",
            name: "Name 123",
            type: "Type",
            label: "Label",
            required: false,
          },
        ]}
        loading={false}
      />
    </DashboardLayout>
  );
};

export default FormManager;
