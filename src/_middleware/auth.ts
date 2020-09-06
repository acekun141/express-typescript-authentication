import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { WrongAuthenticationToken, AuthenticationTokenMissing } from "../_exception";
import { DataStoredInToken, RequestWithUser } from "../_interface";
import UserModel from "../user/user.model";

export async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const headers = req.headers;
  if (headers && headers.authorization) {
    const secret = process.env.SECRET_KEY; 
    try {
      const verifyToken = jwt.verify(headers.authorization.split(" ")[1], secret) as DataStoredInToken;
      const id = verifyToken._id;
      const user = await UserModel.findById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationToken())
      }
    } catch(error) {
      next(new WrongAuthenticationToken())
    }
  } else {
    next(new AuthenticationTokenMissing());
  }
}