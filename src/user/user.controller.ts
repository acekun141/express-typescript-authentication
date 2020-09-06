import { Request, Response, NextFunction } from "express";

export const getUserInfo = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "user info" })
}