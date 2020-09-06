import * as express from "express";

export interface Router {
  router: express.Router;
  path: string;
}