import { getToken } from "./auth";

const BASE_URL = "http://192.168.18.9:8000/api";

export const apiFetch = async (url: string, options: any = {}) => {
  const token = await getToken();

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...options.headers,
    },
  });
};