import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusNavbar: false,
};

export const toggleNavbarSlice = createSlice({
  name: "toggleNavbar",
  initialState,
  reducers: {
    changeToggleNavbar: (state, action: any) => {
      return { ...state, statusNavbar: action.payload.statusNavbar };
    },
  },
});
