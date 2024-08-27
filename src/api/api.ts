import axios from "axios";

const environment = import.meta.env.VITE_NODE_ENV;

export const base_url =
  environment === "development" || environment === undefined
    ? import.meta.env.VITE_SERVER_URL_DEVELOPMENT
    : import.meta.env.VITE_SERVER_URL_PRODUCTION;

export const client = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});
