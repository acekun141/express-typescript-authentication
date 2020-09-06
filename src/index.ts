import App from "./app";
import userRouter from "./user/user.router";
import authRouter from "./auth/auth.router";

const app = new App([
  new userRouter(),
  new authRouter()
]);

app.listen();