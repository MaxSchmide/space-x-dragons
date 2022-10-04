import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: sessionStorage.getItem("dsx-access-token") || null,
    user: JSON.parse(sessionStorage.getItem("dsx-profile")) || null,
    loading: null,
  },
  reducers: {
    authRequest: (state) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.profile;
    },

    authFail: (state, action) => {
      state.loading = false;
      state.accessToken = null;
      state.error = action.payload;
    },
    LogOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});
export default authSlice.reducer;
export const {
  LogOut,

  addProfile,
  authFail,
  authRequest,
  authSuccess,
} = authSlice.actions;
