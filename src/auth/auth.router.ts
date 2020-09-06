import * as express from "express";
import { LoginDto, LogoutDto, RegisterDto, RefreshDto } from "./auth.dto";
import AuthenticationController from "./auth.controller";
import { Router } from "../_interface";
import { validation } from "../_middleware";

class AuthRouter implements Router {
  public path = "/auth";
  public router = express.Router();
  private controller = new AuthenticationController();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post(`${this.path}/login`, validation(LoginDto), this.controller.login);
    this.router.post(`${this.path}/register`, validation(RegisterDto), this.controller.register);
    this.router.post(`${this.path}/logout`, validation(LogoutDto), this.controller.logout);
    this.router.post(`${this.path}/refresh`, validation(RefreshDto), this.controller.refresh);
  }
}

export default AuthRouter;