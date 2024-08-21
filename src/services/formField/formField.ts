import { client } from "@/api/api";

export const getAllFormFields = async (): Promise<any> => {
  try {
    const { data } = await client.get("/form");
    return data.formFields;
  } catch (error) {
    throw {
      error: {
        message: "Failed to fetch form fields",
        data: error,
      },
    };
  }
};

export const addFormField = async (data: object) => {
  try {
    const response = await client.post("/form", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateFormField = async (data: object) => {
  try {
    const response = await client.put("/form", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteFormField = async (id: string | undefined) => {
  if (!id) {
    throw {
      message: "ID is required",
    };
  }
  try {
    const response = await client.delete(`/form/${id}`);
    return response;
  } catch (error) {
    throw {
      message: "Failed to delete form field",
      data: error,
    };
  }
};
