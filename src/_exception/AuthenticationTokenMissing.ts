import { HttpException } from "./HttpException";

export class AuthenticationTokenMissing extends HttpException {
  constructor() {
    super(401, "Authentication token missing");
  }
}