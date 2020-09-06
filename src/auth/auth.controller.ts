import { Request, Response, NextFunction } from "express";
import AuthenticationService from "./auth.service";

class AuthenticationController {
  public service = new AuthenticationService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    try {
      const tokenData = await this.service.login(userData);
      res.json({ tokenData });
    } catch(error) {
      next(error);
    }

  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    try {
      const message = await this.service.register(userData);
      res.json({ message });
    } catch(error) {
      next(error);
    }

  };

  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken, user_id } = req.body;
      const accessToken = await this.service.refresh(refreshToken, user_id);

      res.json({ accessToken });
    } catch(error) {
      next(error);
    }
  }

  public logout = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "auth logout" });
  };
}

export default AuthenticationController;