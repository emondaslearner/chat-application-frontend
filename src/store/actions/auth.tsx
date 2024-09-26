/* eslint-disable  object-shorthand */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
export interface AuthStoreInitialState {
  name: string;
  email: string;
  profile_picture: string;
  date_of_birth: string;
  bio: string;
  cover_picture: string;
  country: string;
  city: string;
  id: string;
  status: string;
}

// Define the payload type for the setData action
const initialState: AuthStoreInitialState = {
  name: "",
  email: "",
  profile_picture: "",
  date_of_birth: "",
  bio: "",
  cover_picture: "",
  city: "",
  country: "",
  id: "",
  status: "offline"
};

const siteConfig = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<AuthStoreInitialState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_picture = action.payload.profile_picture;
      state.date_of_birth = action.payload.date_of_birth;
      state.bio = action.payload.bio;
      state.cover_picture = action.payload.cover_picture;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.status = action.payload.status;
    },
  },
});

export const { setUserData } = siteConfig.actions;
export default siteConfig.reducer;
