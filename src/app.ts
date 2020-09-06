import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Router } from "./_interface";
import { errorMiddleware } from "./_middleware";

dotenv.config();

class App {
  public app: express.Application;
  constructor(routes: Router[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initialMiddleware();
    this.initialController(routes);

    this.initializeErrorHandler();
  }

  private initialMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  private initialController(routes: Router[]) {
    routes.forEach((router: Router) => {
      this.app.use(router.router);
    })
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }

  private async connectToTheDatabase() {
    try {
      await mongoose.connect(
        `mongodb://${process.env.MONGO_URL}`,
        { useNewUrlParser: true, useUnifiedTopology: true },
      );
      console.log("Connect to the database successful!");
    } catch(error) {
      console.log("Cannot connect to the database");
    }
  }

  public listen() {
    this.app.listen({ port: process.env.PORT || 8000, host: "0.0.0.0" }, () => {
      console.log(`This app running at port ${process.env.PORT}`);
    })
  }
}

export default App;