import { HttpException } from "./HttpException";

export class WrongAuthenticationToken extends HttpException {
  constructor() {
    super(401, "Wrong authentication token");
  }
}