import { publicRequest, userRequest } from "./requestMethods";
import { useStore } from "../store/store";
import Cookies from "js-cookie";

export const registerUser = async (user) => {
  try {
    const res = await publicRequest.post("auth/users/", user);
    re;
    const responseData = JSON.stringify(res.data).replace(/[{}[\]]/g, ""); // Remove {} and [] from response
    useStore.getState().setRegisterResponse(responseData); // Store data in zustand store
    return res.data;
  } catch (error) {
    if (error.response.data) {
      const errorData = JSON.stringify(error.response.data).replace(
        /[{}[\]]/g,
        ""
      ); // Remove {} and [] from error response
      useStore.getState().setRegisterResponse(error.response.data); // Store error in zustand store
      console.log(error.response.data);
    }

    return error;
  }
};

export const loginUser = async (user) => {
  try {
    // Clear the login response before making the API call
    useStore.getState().setLoginResponse({});
    const res = await publicRequest.post("api/token/", user);
    if (res.data) {
      try {
        const profileData = await userRequest(res.data.access).get(
          `magnum/profile/me/`
        );
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours (in milliseconds)
        const userCookie = {
          accessToken: res.data.access,
          expiredAt: expirationTime.toISOString(),
        };
        Cookies.set("currentUser", JSON.stringify(userCookie));
        useStore.getState().setauthUser(profileData.data); // Store profile data in zustand store
        useStore.getState().setLoginResponse("Successful");
      } catch (error) {
        console.log(error);
        useStore
          .getState()
          .setLoginResponse(
            "There seems to be an error, please try again later!"
          ); // Store error in zustand store
      }
    }
    return res.data;
  } catch (error) {
    if (error.response.data) {
      const errorData = JSON.stringify(error.response.data).replace(
        /[{}[\]]/g,
        ""
      ); // Remove {} and [] from error response
      useStore
        .getState()
        .setLoginResponse(
          "There seems to be an error, please try again later!"
        ); // Store error in zustand store
      console.log(error.response.data);
    }

    return error;
  }
};

export const logoutUser = () => {
  useStore.getState().setauthUser({}); // this will clear user data from zustand store
  Cookies.remove("currentUser"); // clear user cookie
};

///--------------Application submission Calls

export const expressentrySubmit = async (form) => {
  try {
    const currentUserCookie = Cookies.get("currentUser");
    const userCookie = JSON.parse(currentUserCookie);
    const accessToken = userCookie.accessToken;
    const response = await userRequest(accessToken).post(
      `magnum/expressentry/`,
      form
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
