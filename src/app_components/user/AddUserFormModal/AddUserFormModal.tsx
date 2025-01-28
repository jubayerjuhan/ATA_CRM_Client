import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { InputFormModal } from "@/app_components";

import { InputField } from "@/app_components/InputFormModal/InputForm.types";
import {
  CLEAR_MESSAGE,
  CREATE_USER_ERROR,
  CREATE_USER_PENDING,
} from "@/constants";
import { addUser } from "@/redux/actions/userActions";
import { AppDispatch } from "@/types";

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
        { value: "leader", label: "Team Leader" },
      ],
    },
  ];

  const dispatch = useDispatch<AppDispatch>();

  const handleAddUser = async (data: FormValues) => {
    try {
      dispatch({ type: CREATE_USER_PENDING });
      await dispatch(addUser(data));
      toast.success("User added successfully!");
      dispatch({ type: CLEAR_MESSAGE });
    } catch (error) {
      dispatch({ type: CREATE_USER_ERROR, payload: error });
      toast.error("Failed to add user!");
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
        submitHandler={handleAddUser}
      />
    </div>
  );
};
