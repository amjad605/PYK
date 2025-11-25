import { Types } from "mongoose";
export type userType = {
  userName: string;
  email: string;
  password: string;
};
export interface UserReturnType extends userType {
  _id: string;

  createdAt?: Date;
  updatedAt?: Date;
}
