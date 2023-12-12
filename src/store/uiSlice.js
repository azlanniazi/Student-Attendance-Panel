import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    darkMode: false,
  },
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload.darkMode;
    },
  },
});

export const getDarkMode = (state) => state.uiSlice.darkMode;
export const { setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
