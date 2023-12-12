import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    uiSlice: uiSlice,
  },
});

export default store;
