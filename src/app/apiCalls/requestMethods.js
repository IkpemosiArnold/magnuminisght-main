import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = (userToken) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
