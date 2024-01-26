import axios from "axios";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || undefined,
  withCredentials: true,
  headers: {
    accept: "application/json",
    "Content-type": "application/json",
    ver: "1",
  },
});
export const cancelToken = axios.CancelToken;
