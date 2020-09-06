import { Request } from "express";
import IUser from "../user/user.interface";

export interface RequestWithUser extends Request {
  user: IUser;
}