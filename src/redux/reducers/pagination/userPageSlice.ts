import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../utils/Typescript";

interface ICreateUsersPage {
  users: IUser[];
  totalCount: number;
}

interface ISearchUserPage extends ICreateUsersPage {}

const initialState = {
  users: [] as IUser[],
  totalCount: 0,
};

export const userPageSlice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    createUsersPage: (state, action: PayloadAction<ICreateUsersPage>) => {
      return action.payload;
    },

    searchUsersPage: (state, action: PayloadAction<ISearchUserPage>) => {
      return action.payload;
    },
  },
});
