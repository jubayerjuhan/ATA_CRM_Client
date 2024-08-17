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
  [key: string]: string | boolean;
}

export const AddFormFieldModal = () => {
  const triggerBtnTitle = "Add Form Field";
  const submitBtnTitle = "Add Form Field";
  const modalTitle = "Add Form Field";
  const description = "Add a new form field to the form.";

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

  const dispatch = useDispatch<AppDispatch>();

  const handleAddNewField = async (data: FormValues) => {
    data = { ...data, required: data.required === "true" ? true : false };

    console.log(data, "data");
    // try {
    //   dispatch({ type: CREATE_USER_PENDING });
    //   await dispatch(addUser(data));
    //   toast.success("User added successfully!");
    //   dispatch({ type: CLEAR_MESSAGE });
    // } catch (error) {
    //   dispatch({ type: CREATE_USER_ERROR, payload: error });
    //   toast.error("Failed to add user!");
    // }
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
      />
    </div>
  );
};
