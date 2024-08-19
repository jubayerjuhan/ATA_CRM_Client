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
