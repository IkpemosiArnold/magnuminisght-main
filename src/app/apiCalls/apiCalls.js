import { publicRequest } from "./requestMethods";
import { useStore } from "../store/store";

export const registerUser = async (user) => {
  try {
    const res = await publicRequest.post("auth/users/", user);
    re;
    const responseData = JSON.stringify(res.data).replace(/[{}[\]]/g, ""); // Remove {} and [] from response
    useStore.getState().setRegisterResponse(responseData); // Store data in zustand store
    return res.data;
  } catch (error) {
    const errorData = JSON.stringify(error.response.data).replace(
      /[{}[\]]/g,
      ""
    ); // Remove {} and [] from error response
    useStore.getState().setRegisterResponse(errorData); // Store error in zustand store
    console.log(error.response.data);
    return error.response.data;
  }
};
