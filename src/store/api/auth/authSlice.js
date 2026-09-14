import { isJson } from "@/utils/isJson";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const user = localStorage.getItem("user");
const storedUser = isJson(user) ? JSON.parse(user) : null;

const accessToken = Cookies.get("accessToken");
const refreshToken = Cookies.get("refreshToken");

const initialStateSchema = {
  auth: {
    accessToken: null,
    refreshToken: null,
    user: {
      user_type: null,
      user_info: {},
    },
  },
  isAuth: false,
  permissions: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState:
    accessToken && refreshToken
      ? { ...initialStateSchema, auth: storedUser?.auth, isAuth: true }
      : initialStateSchema,
  reducers: {
    setUser: (state, action) => {
      Cookies.set("accessToken", action.payload?.accessToken, {
        expires: 1 / 2,
      });
      Cookies.set("refreshToken", action.payload?.refreshToken, {
        expires: 365,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          auth: action.payload,
        })
      );

      const newState = {};
      newState.auth = action.payload;
      newState.isAuth = true;

      state.auth = action.payload;
      state.isAuth = true;
    },
    logOut: (state, action) => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("user");

      state.auth = initialStateSchema.auth;
      state.isAuth = false;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
