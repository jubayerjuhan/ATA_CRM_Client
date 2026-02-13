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

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers?.Authorization) {
    delete (config.headers as any).Authorization;
  }
  return config;
});
