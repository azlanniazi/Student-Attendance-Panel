import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setLogin(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
    },
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
  },
});

export const { setLogin, setLogout, setUser, setToken } = authSlice.actions;

export const getUser = (state) => state.authSlice.user;
export const getToken = (state) => state.authSlice.token;

export default authSlice.reducer;
