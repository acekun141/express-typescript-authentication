import { HttpException } from "./HttpException";

export class NotAuthorized extends HttpException {
  constructor() {
    super(401, "You're not authorized");
  }
}