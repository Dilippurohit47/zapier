"use client";
import { createSlice } from "@reduxjs/toolkit";
export interface User {
  name: string;
  email: string;
  gitHubToken:string
}

interface UserState {
  isloggedIn: boolean;
  user: User | null;
}

const initialState: UserState = {
  isloggedIn: false,
  user: null,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    logout: (state) => {
      state.isloggedIn = false;
      state.user = null;
    },
    login: (state) => {
      state.isloggedIn = true;
    },
    saveUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
  },
});
export const { logout, login, saveUser } = userReducer.actions;
export default userReducer.reducer;
