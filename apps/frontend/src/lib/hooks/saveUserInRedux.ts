import { login, saveUser } from "../redux/reducers/userReducer";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchAndSaveUser = async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/v1/user`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      const user = res.data.user;
      console.log(user)
      dispatch(login());
      dispatch(saveUser(user));
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};
