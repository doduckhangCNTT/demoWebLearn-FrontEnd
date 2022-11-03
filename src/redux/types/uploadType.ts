import { IUser } from "../../utils/Typescript";

export interface IUploadImgUser extends IUser {
  account: string;
  rf_token: string;
}

export interface IUploadImg {
  payload: IUploadImgUser;
}
