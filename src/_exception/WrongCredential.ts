import { HttpException } from "./HttpException";

export class WrongCredential extends HttpException {
  constructor() {
    super(401, "Wrong credential provided");
  }
}