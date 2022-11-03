import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStatusCountDown {
  status: boolean;
}

const initialState = {
  status: false,
};

export const countDownSlice = createSlice({
  name: "statusCountDown",
  initialState,
  reducers: {
    updateStatusCountDown: (state, action: PayloadAction<IStatusCountDown>) => {
      return { ...state, status: action.payload.status };
    },
  },
});
