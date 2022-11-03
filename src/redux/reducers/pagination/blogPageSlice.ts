import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "../../../utils/Typescript";

interface IBlogPageType {
  blogs: IBlog[];
  totalCount: number;
}
interface IBlogUpdateType {
  blogs: IBlog[];
}

const initialState = {
  blogs: [] as IBlog[],
  totalCount: 0,
};

export const blogPageSlice = createSlice({
  name: "blogPage",
  initialState,
  reducers: {
    getBlogsPage: (state, action: PayloadAction<IBlogPageType>) => {
      return action.payload;
    },
    getBlogsPageSearch: (state, action: PayloadAction<IBlogPageType>) => {
      return action.payload;
    },
    updateBlogsPageSearch: (state, action: PayloadAction<IBlogUpdateType>) => {
      return {
        ...state,
        blogs: action.payload.blogs,
      };
    },
  },
});
