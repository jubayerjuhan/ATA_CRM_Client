import { client } from "@/api/api";

export const getAllFormFields = async () => {
  try {
    const { data } = await client.get("/form");
    return data;
  } catch (error) {
    return error;
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
