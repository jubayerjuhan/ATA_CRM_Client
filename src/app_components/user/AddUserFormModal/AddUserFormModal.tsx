import { InputFormModal } from "@/app_components";

import { InputField } from "@/app_components/InputFormModal/InputForm.types";

interface FormValues {
  [key: string]: string; // Dynamic form values
}

export const AddUserFormModal = () => {
  const triggerBtnTitle = "Add User";
  const submitBtnTitle = "Add User";
  const modalTitle = "Add User";
  const description = "Fill in the form below to add a new user.";

  const fields: InputField[] = [
    {
      type: "text",
      id: "name",
      label: "Name",
      placeholder: "Enter The User's Name",
    },
    {
      type: "email",
      id: "email",
      label: "Email",
      placeholder: "Enter The User's Email",
    },
    {
      type: "password",
      id: "password",
      label: "Password",
      placeholder: "Enter The User's Password",
    },
    {
      type: "password",
      id: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Re-enter The User's Password",
    },
    {
      type: "select",
      id: "role",
      label: "Role",
      placeholder: "Select The User's Role",
      options: [
        { value: "admin", label: "Admin" },
        { value: "agent", label: "Agent" },
      ],
    },
  ];

  const handleAddUser = (data: FormValues) => {
    console.log(data, "data");
  };

  return (
    <div>
      <InputFormModal
        triggerBtnTitle={triggerBtnTitle}
        submitBtnTitle={submitBtnTitle}
        modalTitle={modalTitle}
        description={description}
        fields={fields}
        submitHandler={handleAddUser}
      />
    </div>
  );
};
