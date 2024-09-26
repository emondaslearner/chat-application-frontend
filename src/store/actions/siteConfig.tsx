/* eslint-disable  object-shorthand */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface SiteConfigState {
  chatOpened: boolean;
  loader: boolean;
}

const initialState: SiteConfigState = {
  chatOpened: false,
  loader: false,
};

const siteConfig = createSlice({
  name: "siteConfig",
  initialState,
  reducers: {
    changeChatOpenedVar(state, action: PayloadAction<boolean>) {
      state.chatOpened = action.payload;
    },
    changeLoaderValue(state, action: PayloadAction<boolean>) {
      state.loader = action.payload;
    },
  },
});

export const { changeChatOpenedVar, changeLoaderValue } = siteConfig.actions;
export default siteConfig.reducer;
