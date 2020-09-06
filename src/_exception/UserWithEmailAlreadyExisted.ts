import { HttpException } from "./HttpException";

export class UserWithEmailAlreadyExisted extends HttpException {
  constructor(email: string) {
    super(400, `User with email ${email} already existed`);
  }
}