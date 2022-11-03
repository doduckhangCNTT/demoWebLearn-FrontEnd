import { ICategory } from "../../utils/Typescript";

export interface ICreateCategoryType {
  payload: ICategory;
}
export interface IGetCategoryType {
  payload: ICategory[];
}
export interface IDeleteCategoryType {
  payload: string;
}
export interface IUpdateCategoryType {
  payload: ICategory;
}
export interface IPatchCategoryType {
  payload: ICategory;
}
