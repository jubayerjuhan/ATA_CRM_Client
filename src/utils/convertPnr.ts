import axios from "axios";

export const convertPNR = async (pnr: string) => {
  const PNR_CONVERTER_API_URL = "https://api.pnrconverter.com/api";
  try {
    const formData = new FormData();
    formData.append("pnr", pnr);

    const response = await axios({
      method: "post",
      url: PNR_CONVERTER_API_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        PUBLIC_APP_KEY: import.meta.env.VITE_PNR_CONVERTER_PUBLIC_APP_KEY,
        PRIVATE_APP_KEY: import.meta.env.VITE_PNR_CONVERTER_PRIVATE_APP_KEY,
      },
      data: formData,
    });

    return response.data.flightData.flights;
  } catch (error) {
    console.error("Error converting PNR:", error);
    throw error;
  }
};
