import * as express from "express";
import { Router } from "../_interface";
import userModel from "./user.model";
import * as userController from "./user.controller";

class UserRouter implements Router {
  public path = "/user";
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get(`${this.path}`, userController.getUserInfo);
  }
}

export default UserRouter;