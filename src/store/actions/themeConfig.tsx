/* eslint-disable object-shorthand */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// data
import themeCon from "../../configs/them.config"; // Corrected the import path

// Define the initial state type
interface ThemeState {
  themeColor: string | undefined;
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  themeColor: themeCon?.themeColor,
  mode: 'dark',
};

const themeConfig = createSlice({
  name: "themeConfig",
  initialState,
  reducers: {
    changeMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
    },
    changeThemColor(state, action: PayloadAction<string>) {
      state.themeColor = action.payload;
    },
  },
});

export const { changeMode, changeThemColor } = themeConfig.actions;
export default themeConfig.reducer;
