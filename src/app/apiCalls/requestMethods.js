import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
