import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../utils/Typescript";
import {
  ICreateCategoryType,
  IDeleteCategoryType,
  IGetCategoryType,
  IPatchCategoryType,
  IUpdateCategoryType,
} from "../types/categoryType";

const initialState: ICategory[] = [];

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategory: (state, action: ICreateCategoryType) => {
      return [action.payload, ...state];
      // return action.payload;
    },

    getCategories: (state, action: IGetCategoryType) => {
      return action.payload;
    },

    deleteCategory: (state, action: IDeleteCategoryType) => {
      return state.filter((item) => item._id !== action.payload);
    },

    updateCategory: (state, action: IUpdateCategoryType) => {
      return state.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, name: action.payload.name };
        }
        return item;
      });
    },

    patchCategory: (state, action: IPatchCategoryType) => {
      return state.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quality: action.payload.quality };
        }
        return item;
      });
    },
  },
});
