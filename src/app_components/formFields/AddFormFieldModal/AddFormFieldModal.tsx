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

export const AddFormFieldModa = () => {
  const triggerBtnTitle = "Add User";
  const submitBtnTitle = "Add User";
  const modalTitle = "Add User";
  const description = "Fill in the form below to add a new user.";

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
      placeholder: "Enter The Field abel",
    },
    {
      type: "checkbox",
      id: "required",
      label: "Required",
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
